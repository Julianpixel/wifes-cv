'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollRevealLeft, scrollRevealRight, staggerContainer } from '@/lib/animations';
import { Award, BookOpen, Users, Globe } from 'lucide-react';
import Image from 'next/image';

interface AboutProps {
  name: string;
  role: string;
  bio: string;
  location: string;
}

const highlights = [
  { icon: Award,    label: 'Graduada UCE',         sub: 'Adm. Empresas Turísticas' },
  { icon: Globe,    label: 'Enfoque Caribe',        sub: 'Turismo internacional'    },
  { icon: Users,    label: 'Orientada al cliente',  sub: 'Experiencias memorables'  },
  { icon: BookOpen, label: 'Formación integral',    sub: 'Gestión y sostenibilidad' },
];

/**
 * About photo animation: slow "breathing frame" — 
 * - Outer frame slowly rotates (like a compass)
 * - Inner border breathes/pulses color
 * - Diagonal gradient overlay drifts
 * - Two accent corner lines animate in from outside
 */
function BreathingPhotoFrame({ name }: { name: string }) {
  return (
    <div className="relative w-full max-w-[320px] mx-auto select-none">

      {/* Outer spinning compass ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-8 rounded-[2.5rem] pointer-events-none"
        style={{
          border: '1px dashed hsl(var(--primary) / 0.25)',
        }}
      />

      {/* Inner pulsing color border */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 2px hsl(var(--primary) / 0.2), 0 0 30px hsl(var(--primary) / 0.05)',
            '0 0 0 2px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.15)',
            '0 0 0 2px hsl(var(--secondary) / 0.4), 0 0 35px hsl(var(--secondary) / 0.1)',
            '0 0 0 2px hsl(var(--primary) / 0.2), 0 0 30px hsl(var(--primary) / 0.05)',
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-[2rem] overflow-hidden z-10"
        style={{ aspectRatio: '3/4' }}
      >
        <Image
          src="/about-img.jpg"
          alt={name}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Drifting diagonal gradient */}
        <motion.div
          animate={{ x: ['-30%', '130%'] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)',
          }}
        />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </motion.div>

      {/* Accent dot top-left */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-primary z-20"
      />
      {/* Accent dot bottom-right gold */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-accent z-20"
      />

      {/* Floating badge bottom-left */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          opacity: { delay: 0.5, duration: 0.5 },
          x: { delay: 0.5, duration: 0.5 }
        }}
        className="absolute -bottom-5 -left-5 glass-card rounded-2xl px-3 py-2.5 shadow-xl flex items-center gap-2 z-30"
      >
        <span className="text-lg">🌴</span>
        <div>
          <p className="text-[11px] font-bold leading-tight">Turismo · RD</p>
          <p className="text-[10px] opacity-70">Caribe &amp; Mundo</p>
        </div>
      </motion.div>

      {/* Floating badge top-right */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="absolute -top-5 -right-5 glass-card rounded-2xl px-3 py-2.5 shadow-xl flex items-center gap-2 z-30"
      >
        <span className="text-lg">✈️</span>
        <div>
          <p className="text-[11px] font-bold leading-tight">Disponible</p>
          <p className="text-[10px] opacity-70">SPM · Nacional</p>
        </div>
      </motion.div>
    </div>
  );
}

export function About({ name, role, bio, location }: AboutProps) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center"
        >
          {/* PHOTO LEFT */}
          <motion.div
            variants={scrollRevealLeft}
            style={{ y }}
            className="order-2 lg:order-1 flex items-center justify-center py-12"
          >
            <BreathingPhotoFrame name={name} />
          </motion.div>

          {/* TEXT RIGHT */}
          <motion.div variants={scrollRevealRight} className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-4"
            >
              Sobre Mí • {role}
            </motion.p>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
              Apasionada por el turismo,{' '}
              <span className="gradient-text">comprometida con el Caribe.</span>
            </h3>

            <p className="text-base text-muted-foreground mb-5 leading-relaxed">{bio}</p>
            <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
              Mi formación en la{' '}
              <strong className="text-foreground font-semibold">Universidad Central del Este</strong>{' '}
              me dotó de herramientas para planificar, gestionar y promover destinos turísticos con enfoque
              en la sostenibilidad y la innovación. Creo firmemente en el turismo como motor de desarrollo
              para la República Dominicana.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-muted/30 border border-border/50 transition-all duration-300 cursor-default hover:border-primary/30"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <h.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{h.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{h.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span className="text-base">📍</span>
              <span>{location}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
