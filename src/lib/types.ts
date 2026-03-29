export type Theme = 'dark-minimal' | 'light-elegant' | 'creative' | 'corporate' | 'tropical';
export type Typography = 'Plus Jakarta Sans' | 'Outfit' | 'Instrument Serif' | 'Inter';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface SiteData {
  theme: Theme;
  typography: Typography;
  profile: {
    name: string;
    role: string;
    bio: string;
    image: string;
    email: string;
    location: string;
    socials: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
  sections: {
    hero: boolean;
    about: boolean;
    services: boolean;
    portfolio: boolean;
    testimonials: boolean;
    process: boolean;
    cta: boolean;
    contact: boolean;
  };
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  appearance: {
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
    primaryColor: string;
  };
}
