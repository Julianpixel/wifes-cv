'use client';

import { motion } from 'framer-motion';
import { Service } from '@/lib/types';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import Link from 'next/link';

interface ServicesProps { services: Service[]; }

const getCardAccents = () => [
  { from: 'from-primary/10',    border: 'border-primary/20',    hover: 'hover:border-primary/50',    glow: 'hsl(var(--primary) / 0.15)' },
  { from: 'from-secondary/10',  border: 'border-secondary/20',  hover: 'hover:border-secondary/50',  glow: 'hsl(var(--secondary) / 0.15)' },
  { from: 'from-accent/10',     border: 'border-accent/20',     hover: 'hover:border-accent/50',     glow: 'hsl(var(--accent) / 0.15)' },
];

export function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-24 sm:py-32 scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20 -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">Mis Competencias</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Servicios Especializados</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Soluciones turísticas diseñadas para potenciar destinos, hoteles y experiencias del Caribe.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service, index) => {
            const Icon = (Icons as any)[service.icon] || Icons.Star;
            const accents = getCardAccents();
            const accent = accents[index % accents.length];
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={`/servicios/${service.id}`} className="block group h-full">
                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className={`group h-full p-8 rounded-[2rem] bg-gradient-to-br ${accent.from} to-transparent border ${accent.border} ${accent.hover} transition-all duration-400 cursor-pointer relative overflow-hidden`}
                  >
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${accent.glow}, transparent 70%)` }}
                    />

                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-12 h-12 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center mb-6 border border-border/30 z-10"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>

                    <h3 className="text-lg font-bold mb-3 text-foreground relative z-10 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm relative z-10 mb-4">{service.description}</p>

                    <div className="flex items-center gap-1 text-xs font-bold text-primary relative z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      Ver detalles <ChevronRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
