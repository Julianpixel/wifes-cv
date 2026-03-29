'use client';

import * as React from 'react';
import { Theme, Typography } from '@/lib/types';
import { THEMES } from '@/config/theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  typography: Typography;
  setTypography: (typography: Typography) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'tropical',
  setTheme: () => {},
  typography: 'Inter',
  setTypography: () => {},
  isDark: true,
  toggleDark: () => {},
});

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const stored = localStorage.getItem('leandri-dark-mode');
    return stored !== null ? stored === 'true' : true;
  } catch { return true; }
}

export function ThemeProvider({
  children,
  initialTheme,
  initialTypography,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
  initialTypography: Typography;
}) {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  const [typography, setTypography] = React.useState<Typography>(initialTypography);
  const [isDark, setIsDark] = React.useState<boolean>(true); 
  const [mounted, setMounted] = React.useState(false);

  // Sync state with props when data changes on server
  React.useEffect(() => { setTheme(initialTheme); }, [initialTheme]);
  React.useEffect(() => { setTypography(initialTypography); }, [initialTypography]);

  // Read localStorage ONLY on mount to avoid hydration mismatch
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('leandri-dark-mode');
      if (stored !== null) {
        setIsDark(stored === 'true');
      }
    } catch (e) { console.warn('LocalStorage not available'); }
    setMounted(true);
  }, []);

  const currentThemeConfig = React.useMemo(() => {
    return THEMES[theme][isDark ? 'dark' : 'light'];
  }, [theme, isDark]);

  const typographyVar = React.useMemo(() => {
    switch (typography) {
      case 'Plus Jakarta Sans': return 'var(--font-jakarta)';
      case 'Outfit': return 'var(--font-outfit)';
      case 'Instrument Serif': return 'var(--font-instrument)';
      case 'Inter': return 'var(--font-inter)';
      default: return 'var(--font-jakarta)';
    }
  }, [typography]);

  const toggleDark = React.useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem('leandri-dark-mode', String(next)); } catch (e) {}
      return next;
    });
  }, []);

  // MASTER SYNC EFFECT (Style Tag Injection for total dominance)
  React.useEffect(() => {
    if (!mounted) return;

    const scheme = isDark ? 'dark' : 'light';
    const root = document.documentElement;
    const body = document.body;

    // 1. Sync attributes and fonts
    root.setAttribute('data-scheme', scheme);
    body.setAttribute('data-scheme', scheme);
    root.style.setProperty('--font-heading', typographyVar);
    root.style.setProperty('--font-sans', typographyVar);

    // 2. Aggressive Style Injection via <style> tag
    let styleTag = document.getElementById('leandri-theme-engine');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'leandri-theme-engine';
      document.head.appendChild(styleTag);
    }

    const varLines = Object.entries(currentThemeConfig).map(([key, value]) => {
      const varName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return `${varName}: ${value} !important;`;
    }).join('\n');

    styleTag.innerHTML = `
      :root, [data-scheme] {
        ${varLines}
      }
      body {
        background-color: hsl(${currentThemeConfig.background}) !important;
        color: hsl(${currentThemeConfig.foreground}) !important;
        transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
    `;

    return () => {
      // Cleanup if needed (optional)
    };
  }, [mounted, typographyVar, currentThemeConfig, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, typography, setTypography, isDark, toggleDark }}>
      <div
        data-scheme={mounted ? (isDark ? 'dark' : 'light') : 'dark'}
        data-theme={theme}
        className="min-h-screen flex flex-col"
        style={{ fontFamily: typographyVar }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
