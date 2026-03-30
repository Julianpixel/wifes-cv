import { Theme } from '@/lib/types';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
  // Dynamic properties for sync
  gradient: string;
  shadow: string;
}

export type ModeColors = {
  light: ThemeColors;
  dark: ThemeColors;
};

export const THEMES: Record<Theme, ModeColors> = {
  'dark-minimal': { // Lujo Alpino
    light: {
      background: '215 25% 98%',
      foreground: '215 25% 10%',
      primary: '215 25% 25%',
      primaryForeground: '215 25% 98%',
      secondary: '45 61% 52%',
      secondaryForeground: '215 25% 10%',
      muted: '215 25% 94%',
      mutedForeground: '215 15% 45%',
      accent: '45 61% 52%',
      accentForeground: '215 25% 98%',
      card: '215 25% 100%',
      cardForeground: '215 25% 10%',
      border: '215 25% 90%',
      input: '215 25% 90%',
      ring: '215 25% 25%',
      gradient: 'linear-gradient(135deg, hsl(215 25% 25%), hsl(45 61% 52%))',
      shadow: '0 10px 30px -8px hsl(215 25% 25% / 0.15)',
    },
    dark: {
      background: '215 25% 6%',
      foreground: '215 25% 96%',
      primary: '215 25% 85%',
      primaryForeground: '215 25% 6%',
      secondary: '45 61% 52%',
      secondaryForeground: '215 25% 6%',
      muted: '215 25% 12%',
      mutedForeground: '215 15% 65%',
      accent: '215 25% 35%',
      accentForeground: '215 25% 96%',
      card: '215 25% 8%',
      cardForeground: '215 25% 96%',
      border: '215 25% 18%',
      input: '215 25% 18%',
      ring: '215 25% 85%',
      gradient: 'linear-gradient(135deg, hsl(215 25% 85%), hsl(45 61% 52%))',
      shadow: '0 20px 50px -15px hsl(0 0% 0% / 0.7)',
    }
  },
  'light-elegant': { // Alma Volcánica
    light: {
      background: '0 0% 98%',
      foreground: '0 0% 10%',
      primary: '0 84% 45%',
      primaryForeground: '0 0% 98%',
      secondary: '0 0% 25%',
      secondaryForeground: '0 0% 98%',
      muted: '0 0% 94%',
      mutedForeground: '0 0% 45%',
      accent: '0 84% 60%',
      accentForeground: '0 0% 98%',
      card: '0 0% 100%',
      cardForeground: '0 0% 10%',
      border: '0 0% 90%',
      input: '0 0% 90%',
      ring: '0 84% 45%',
      gradient: 'linear-gradient(135deg, hsl(0 84% 45%), hsl(0 0% 25%))',
      shadow: '0 15px 40px -12px hsl(0 84% 45% / 0.1)',
    },
    dark: {
      background: '0 0% 6%',
      foreground: '0 0% 96%',
      primary: '0 84% 60%',
      primaryForeground: '0 0% 6%',
      secondary: '0 0% 20%',
      secondaryForeground: '0 0% 96%',
      muted: '0 0% 12%',
      mutedForeground: '0 0% 65%',
      accent: '0 84% 70%',
      accentForeground: '0 0% 6%',
      card: '0 0% 8%',
      cardForeground: '0 0% 96%',
      border: '0 0% 18%',
      input: '0 0% 18%',
      ring: '0 84% 60%',
      gradient: 'linear-gradient(135deg, hsl(0 84% 60%), hsl(0 0% 40%))',
      shadow: '0 25px 60px -15px hsl(0 0% 0% / 0.8)',
    }
  },
  'creative': { // Tierra Safari
    light: {
      background: '109 40% 98%',
      foreground: '109 48% 5%',
      primary: '113 39% 25%',
      primaryForeground: '109 40% 98%',
      secondary: '35 60% 45%',
      secondaryForeground: '109 40% 98%',
      muted: '109 30% 94%',
      mutedForeground: '109 30% 40%',
      accent: '35 70% 55%',
      accentForeground: '109 40% 98%',
      card: '109 40% 100%',
      cardForeground: '109 48% 5%',
      border: '109 30% 90%',
      input: '109 30% 90%',
      ring: '113 45% 35%',
      gradient: 'linear-gradient(135deg, hsl(113 39% 25%), hsl(35 60% 45%))',
      shadow: '0 15px 35px -10px hsl(113 45% 35% / 0.2)',
    },
    dark: {
      background: '109 48% 4%',
      foreground: '109 40% 98%',
      primary: '113 39% 45%',
      primaryForeground: '109 48% 4%',
      secondary: '35 70% 55%',
      secondaryForeground: '109 48% 4%',
      muted: '109 40% 10%',
      mutedForeground: '109 20% 65%',
      accent: '35 80% 65%',
      accentForeground: '109 48% 4%',
      card: '109 48% 6%',
      cardForeground: '109 40% 98%',
      border: '109 40% 15%',
      input: '109 40% 15%',
      ring: '113 39% 45%',
      gradient: 'linear-gradient(135deg, hsl(113 39% 45%), hsl(35 70% 55%))',
      shadow: '0 25px 60px -15px hsl(0 0% 0% / 0.6)',
    }
  },
  'corporate': { // Brisa Mediterránea
    light: {
      background: '210 30% 98%',
      foreground: '210 60% 10%',
      primary: '210 100% 21%',
      primaryForeground: '210 30% 98%',
      secondary: '211 100% 35%',
      secondaryForeground: '210 30% 98%',
      muted: '210 20% 94%',
      mutedForeground: '210 15% 45%',
      accent: '211 70% 50%',
      accentForeground: '210 30% 98%',
      card: '210 30% 100%',
      cardForeground: '210 60% 10%',
      border: '210 20% 90%',
      input: '210 20% 90%',
      ring: '210 100% 21%',
      gradient: 'linear-gradient(135deg, hsl(210 100% 21%), hsl(211 100% 35%))',
      shadow: '0 10px 30px -8px hsl(210 100% 21% / 0.2)',
    },
    dark: {
      background: '210 60% 6%',
      foreground: '210 40% 98%',
      primary: '211 100% 35%',
      primaryForeground: '210 60% 6%',
      secondary: '211 100% 50%',
      secondaryForeground: '210 60% 6%',
      muted: '210 30% 12%',
      mutedForeground: '210 20% 65%',
      accent: '211 40% 55%',
      accentForeground: '210 40% 98%',
      card: '210 60% 8%',
      cardForeground: '210 40% 98%',
      border: '210 30% 18%',
      input: '210 30% 18%',
      ring: '211 100% 35%',
      gradient: 'linear-gradient(135deg, hsl(211 100% 35%), hsl(211 100% 50%))',
      shadow: '0 20px 50px -15px hsl(0 0% 0% / 0.7)',
    }
  },
  'tropical': { // Tropical Caribe
    light: {
      background: '185 30% 97%',
      foreground: '210 40% 8%',
      primary: '171 75% 36%',
      primaryForeground: '0 0% 100%',
      secondary: '38 90% 48%',
      secondaryForeground: '0 0% 100%',
      muted: '185 20% 93%',
      mutedForeground: '210 20% 42%',
      accent: '22 90% 55%',
      accentForeground: '0 0% 100%',
      card: '0 0% 100%',
      cardForeground: '210 40% 8%',
      border: '185 20% 85%',
      input: '185 20% 88%',
      ring: '171 75% 36%',
      gradient: 'linear-gradient(135deg, hsl(171 75% 36%), hsl(38 90% 48%), hsl(22 90% 55%))',
      shadow: '0 15px 35px -10px hsl(171 75% 36% / 0.25)',
    },
    dark: {
      background: '210 35% 5%',
      foreground: '45 30% 96%',
      primary: '171 90% 44%',
      primaryForeground: '210 35% 5%',
      secondary: '38 95% 55%',
      secondaryForeground: '210 35% 5%',
      muted: '210 25% 12%',
      mutedForeground: '210 15% 62%',
      accent: '22 95% 60%',
      accentForeground: '210 35% 5%',
      card: '210 30% 8%',
      cardForeground: '45 30% 96%',
      border: '210 25% 18%',
      input: '210 25% 18%',
      ring: '171 90% 44%',
      gradient: 'linear-gradient(135deg, hsl(171 90% 44%), hsl(38 95% 55%), hsl(22 95% 60%))',
      shadow: '0 25px 60px -15px hsl(171 90% 44% / 0.5)',
    }
  },
};
