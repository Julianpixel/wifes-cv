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
  { id: 'corporate', name: 'Brisa Mediterránea', colors: ['#003366', '#0056b3', '#ffffff'] },
  { id: 'creative', name: 'Tierra Safari', colors: ['#1a3a14', '#2d5a27', '#bc6c25'] },
  { id: 'dark-minimal', name: 'Lujo Alpino', colors: ['#1e293b', '#475569', '#d4af37'] },
  { id: 'light-elegant', name: 'Alma Volcánica', colors: ['#171717', '#ef4444', '#404040'] },
];

export default function AppearancePage({ initialData }: { initialData: SiteData }) {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = React.useState(false);

  const updateAppearance = async (newTheme?: Theme) => {
    const t = newTheme || theme;
    
    // Update local context
    if (newTheme) setTheme(newTheme);
    
    setIsSaving(true);
    await updateSiteAction({ theme: t });
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase">Identidad Visual</h1>
        <p className="text-muted-foreground mt-2">Selecciona la atmósfera que mejor represente tu marca turística.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-xl bg-background/50 backdrop-blur-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Paletas de Destinos</CardTitle>
            <CardDescription>Colores vivos y llamativos inspirados en el sector turístico global.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateAppearance(t.id)}
                  className={cn(
                    "relative flex flex-col items-start gap-4 p-6 rounded-[2rem] border-2 text-left transition-all hover:scale-[1.03] active:scale-95",
                    theme === t.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/40"
                  )}
                >
                  <div className="flex gap-2">
                    {t.colors.map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg font-black tracking-tighter block">{t.name}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Atmósfera {t.id}</span>
                  </div>
                  {theme === t.id && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1 shadow-lg ring-4 ring-primary/20">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
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
