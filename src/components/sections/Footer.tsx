'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plane, Mail, ExternalLink, ArrowUp } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const quickLinks = [
  { label: 'Sobre Mí',   href: '#about' },
  { label: 'Servicios',  href: '#services' },
  { label: 'Proyectos',  href: '#portfolio' },
  { label: 'Testimonios',href: '#testimonials' },
  { label: 'Contacto',   href: '#contact' },
];

const legalLinks = [
  { label: 'Admin', href: '/admin' },
];

interface FooterProps { name: string; }

export function Footer({ name }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const firstName = name.split(' ')[0];
  const lastInitial = name.split(' ')[2]?.[0] ?? name.split(' ')[1]?.[0] ?? '';
  const { isDark } = useTheme();

  return (
    <footer className="relative border-t border-border/40 pt-16 pb-8 overflow-hidden">
      {/* BG glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-0 left-1/4 w-[600px] h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'hsl(171 90% 44%)' }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                <Plane className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                {firstName}<span className="text-primary">.</span>{lastInitial}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Licenciada en Administración de Empresas Turísticas — UCE San Pedro de Macorís.
              Impulsando el turismo dominicano con visión, estrategia y pasión.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { label: 'Email',     href: 'mailto:leandri.ramirez@gmail.com',       emoji: '✉️' },
                { label: 'LinkedIn',  href: 'https://linkedin.com/in/leandri-ramirez', emoji: '💼' },
                { label: 'Instagram', href: 'https://instagram.com/leandri.ramirez',   emoji: '📸' },
                { label: 'Twitter',   href: 'https://twitter.com/leandri',             emoji: '🐦' },
              ].map(({ emoji, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}

                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-muted/40 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all text-sm"
                >
                  {emoji}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-5">Navegación</p>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-5">Contacto</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>📍 San Pedro de Macorís, RD</li>
              <li>
                <a href="mailto:leandri.ramirez@gmail.com" className="hover:text-primary transition-colors">
                  ✉️ leandri.ramirez@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/18095550000" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  💬 WhatsApp disponible
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/80">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  Disponible para nuevos proyectos
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {name} · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map(l => (
              <Link key={l.label} href={l.href} className="text-xs text-muted-foreground/40 hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
            <span className="text-xs text-muted-foreground/30">·</span>
            <span className="text-xs text-muted-foreground/40">Hecho con 🌴 en RD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
