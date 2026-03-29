'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

export function Navbar({ name }: { name: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { isDark, toggleDark } = useTheme();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parts = name.split(' ');
  const firstName = parts[0];
  const lastInitial = parts[2]?.[0] ?? parts[1]?.[0] ?? '';

  const navLinks = [
    { name: 'Inicio',     href: '#hero' },
    { name: 'Sobre Mí',  href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Proyectos', href: '#portfolio' },
    { name: 'Contacto',  href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-border/40 bg-background/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Plane className="w-4 h-4 text-primary" />
          </div>
          <span className="text-base sm:text-lg font-black tracking-tight">
            {firstName}<span className="text-primary">.</span>{lastInitial}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Dark / Light toggle */}
          <motion.button
            onClick={toggleDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 flex items-center justify-center transition-colors"
            aria-label="Cambiar modo claro/oscuro"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                {isDark
                  ? <Sun className="w-4 h-4 text-primary" />
                  : <Moon className="w-4 h-4 text-primary" />
                }
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* CTA button (desktop) */}
          <Link href="#contact" className="hidden md:inline-flex">
            <Button variant="default" size="sm" className="rounded-full px-5 font-bold">
              Contratar
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-muted/30 border border-border"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/30 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="#contact" onClick={() => setIsOpen(false)} className="mt-3">
                <Button variant="default" className="w-full rounded-xl font-bold">
                  Contratar
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
