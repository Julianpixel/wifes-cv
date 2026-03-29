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
  'dark-minimal': {
    light: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      primary: '240 5.9% 10%',
      primaryForeground: '0 0% 98%',
      secondary: '240 4.8% 95.9%',
      secondaryForeground: '240 5.9% 10%',
      muted: '240 4.8% 95.9%',
      mutedForeground: '240 3.8% 46.1%',
      accent: '240 4.8% 95.9%',
      accentForeground: '240 5.9% 10%',
      card: '0 0% 100%',
      cardForeground: '240 10% 3.9%',
      border: '240 5.9% 90%',
      input: '240 5.9% 90%',
      ring: '240 5.9% 10%',
      gradient: 'linear-gradient(135deg, hsl(240 5.9% 10%), hsl(240 5.9% 40%))',
      shadow: '0 10px 30px -10px hsl(240 5.9% 10% / 0.15)',
    },
    dark: {
      background: '240 10% 4%',
      foreground: '0 0% 98%',
      primary: '0 0% 98%',
      primaryForeground: '240 5.9% 10%',
      secondary: '240 3.7% 15.9%',
      secondaryForeground: '0 0% 98%',
      muted: '240 3.7% 12%',
      mutedForeground: '240 5% 65%',
      accent: '240 3.7% 20%',
      accentForeground: '0 0% 98%',
      card: '240 10% 4%',
      cardForeground: '0 0% 98%',
      border: '240 3.7% 18%',
      input: '240 3.7% 18%',
      ring: '240 5% 84%',
      gradient: 'linear-gradient(135deg, hsl(0 0% 98%), hsl(0 0% 60%))',
      shadow: '0 20px 50px -15px hsl(0 0% 0% / 0.7)',
    }
  },
  'light-elegant': {
    light: {
      background: '30 20% 98%',
      foreground: '25 30% 15%',
      primary: '25 30% 15%',
      primaryForeground: '30 20% 98%',
      secondary: '30 20% 92%',
      secondaryForeground: '25 30% 15%',
      muted: '30 10% 94%',
      mutedForeground: '25 15% 45%',
      accent: '25 40% 50%',
      accentForeground: '30 20% 98%',
      card: '30 20% 98%',
      cardForeground: '25 30% 15%',
      border: '25 20% 90%',
      input: '25 20% 90%',
      ring: '25 30% 15%',
      gradient: 'linear-gradient(135deg, hsl(25 30% 15%), hsl(25 40% 50%))',
      shadow: '0 15px 40px -12px hsl(25 30% 15% / 0.1)',
    },
    dark: {
      background: '25 30% 5%',
      foreground: '30 20% 96%',
      primary: '25 30% 85%',
      primaryForeground: '25 30% 5%',
      secondary: '25 20% 15%',
      secondaryForeground: '30 20% 96%',
      muted: '25 20% 12%',
      mutedForeground: '30 15% 65%',
      accent: '25 40% 60%',
      accentForeground: '25 30% 5%',
      card: '25 30% 7%',
      cardForeground: '30 20% 96%',
      border: '25 20% 20%',
      input: '25 20% 20%',
      ring: '25 30% 85%',
      gradient: 'linear-gradient(135deg, hsl(25 30% 85%), hsl(25 40% 60%))',
      shadow: '0 20px 60px -15px hsl(0 0% 0% / 0.8)',
    }
  },
  'creative': {
    light: {
      background: '280 40% 98%',
      foreground: '262 80% 5%',
      primary: '265 85% 55%',
      primaryForeground: '280 40% 98%',
      secondary: '220 80% 55%',
      secondaryForeground: '280 40% 98%',
      muted: '262 30% 94%',
      mutedForeground: '262 30% 40%',
      accent: '320 90% 55%',
      accentForeground: '280 40% 98%',
      card: '0 0% 100%',
      cardForeground: '262 80% 5%',
      border: '262 30% 90%',
      input: '262 30% 90%',
      ring: '265 85% 55%',
      gradient: 'linear-gradient(135deg, hsl(265 85% 55%), hsl(220 80% 55%), hsl(320 90% 55%))',
      shadow: '0 15px 35px -10px hsl(265 85% 55% / 0.25)',
    },
    dark: {
      background: '262 80% 4%',
      foreground: '280 40% 98%',
      primary: '265 90% 60%',
      primaryForeground: '262 80% 4%',
      secondary: '190 95% 45%',
      secondaryForeground: '262 80% 4%',
      muted: '262 40% 10%',
      mutedForeground: '262 20% 65%',
      accent: '320 95% 65%',
      accentForeground: '262 80% 4%',
      card: '262 80% 6%',
      cardForeground: '280 40% 98%',
      border: '262 40% 15%',
      input: '262 40% 15%',
      ring: '265 90% 60%',
      gradient: 'linear-gradient(135deg, hsl(265 90% 60%), hsl(190 95% 45%), hsl(320 95% 65%))',
      shadow: '0 25px 60px -15px hsl(265 90% 60% / 0.4)',
    }
  },
  'corporate': {
    light: {
      background: '220 30% 98%',
      foreground: '222 60% 10%',
      primary: '220 90% 45%',
      primaryForeground: '220 30% 98%',
      secondary: '215 25% 25%',
      secondaryForeground: '220 30% 98%',
      muted: '220 20% 94%',
      mutedForeground: '220 15% 45%',
      accent: '210 20% 45%',
      accentForeground: '220 30% 98%',
      card: '0 0% 100%',
      cardForeground: '222 60% 10%',
      border: '220 20% 90%',
      input: '220 20% 90%',
      ring: '220 90% 45%',
      gradient: 'linear-gradient(135deg, hsl(220 90% 45%), hsl(215 25% 25%))',
      shadow: '0 10px 30px -8px hsl(220 90% 45% / 0.12)',
    },
    dark: {
      background: '222 47% 6%',
      foreground: '210 40% 98%',
      primary: '217 90% 60%',
      primaryForeground: '222 47% 6%',
      secondary: '215 30% 20%',
      secondaryForeground: '210 40% 98%',
      muted: '222 30% 12%',
      mutedForeground: '215 20% 65%',
      accent: '222 25% 35%',
      accentForeground: '210 40% 98%',
      card: '222 47% 8%',
      cardForeground: '210 40% 98%',
      border: '222 30% 18%',
      input: '222 30% 18%',
      ring: '217 90% 60%',
      gradient: 'linear-gradient(135deg, hsl(217 90% 60%), hsl(222 25% 35%))',
      shadow: '0 20px 50px -15px hsl(0 0% 0% / 0.6)',
    }
  },
  'tropical': {
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
