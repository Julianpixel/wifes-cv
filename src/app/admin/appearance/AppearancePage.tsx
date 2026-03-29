'use client';

import * as React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { SiteData, Theme, Typography } from '@/lib/types';
import { updateSiteAction } from '@/lib/actions';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const themes: { id: Theme; name: string; colors: string[] }[] = [
  { id: 'tropical', name: 'Tropical Caribe', colors: ['#04080b', '#26e2c3', '#f59e0b'] },
  { id: 'dark-minimal', name: 'Oscuro Minimalista', colors: ['#09090b', '#fafafa', '#27272a'] },
  { id: 'light-elegant', name: 'Claro Elegante', colors: ['#ffffff', '#09090b', '#7c2d12'] },
  { id: 'creative', name: 'Vibrante Creativo', colors: ['#0f0720', '#7c3aed', '#c026d3'] },
  { id: 'corporate', name: 'Corporativo', colors: ['#f8fafc', '#2563eb', '#1e40af'] },
];

const fonts: Typography[] = ['Plus Jakarta Sans', 'Outfit', 'Instrument Serif', 'Inter'];

export default function AppearancePage({ initialData }: { initialData: SiteData }) {
  const { theme, setTheme, typography, setTypography } = useTheme();
  const [isSaving, setIsSaving] = React.useState(false);

  const updateAppearance = async (newTheme?: Theme, newTypography?: Typography) => {
    const t = newTheme || theme;
    const ty = newTypography || typography;
    
    // Update local context
    if (newTheme) setTheme(newTheme);
    if (newTypography) setTypography(newTypography);
    
    setIsSaving(true);
    await updateSiteAction({ theme: t, typography: ty });
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Personalización Visual</h1>
        <p className="text-muted-foreground mt-2">Personaliza los colores y la tipografía de tu portafolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Temas</CardTitle>
            <CardDescription>Selecciona una paleta de colores predefinida.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateAppearance(t.id, undefined)}
                  className={cn(
                    "relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                    theme === t.id ? "border-primary" : "border-transparent bg-muted/50"
                  )}
                >
                  <div className="flex gap-1">
                    {t.colors.map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-sm font-bold">{t.name}</span>
                  {theme === t.id && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Tipografía</CardTitle>
            <CardDescription>Cambia la fuente global del sitio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {fonts.map((f) => (
                <button
                  key={f}
                  onClick={() => updateAppearance(undefined, f)}
                  className={cn(
                    "flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all hover:bg-muted/50",
                    typography === f ? "border-primary" : "border-transparent bg-muted/50"
                  )}
                >
                  <span 
                    className="text-lg" 
                    style={{ 
                      fontFamily: f === 'Plus Jakarta Sans' ? 'var(--font-jakarta)' : 
                                  f === 'Instrument Serif' ? 'var(--font-instrument)' : 
                                  `var(--font-${f.toLowerCase()})` 
                    }}
                  >
                    {f}
                  </span>
                  {typography === f && <Check className="w-5 h-5 text-primary" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isSaving && (
        <div className="fixed bottom-8 right-8 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          Guardado automático
        </div>
      )}
    </div>
  );
}
