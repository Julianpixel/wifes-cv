'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

interface PortfolioProps {
  projects: Project[];
}

const getCategoryColors = () => [
  'bg-primary/15 text-primary',
  'bg-secondary/15 text-secondary',
  'bg-accent/15 text-accent',
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  
  const colors = getCategoryColors();
  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <Link href={project.link ?? `/proyectos/${project.id}`} className="group block">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
          {/* Image */}
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${colorClass}`}>
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              Ver proyecto <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Portfolio({ projects }: PortfolioProps) {
  // Show only first 4 on home
  const preview = projects.slice(0, 4);

  return (
    <section id="portfolio" className="py-24 sm:py-32 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">Proyectos</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
              Resultados que{' '}
              <span className="gradient-text">hablan solos.</span>
            </h2>
          </div>

          {/* Animated "Ver todos" button */}
          <Link href="/proyectos">
            <motion.div
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-sm transition-all duration-300 whitespace-nowrap"
            >
              Ver todos los proyectos
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {preview.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/proyectos">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm border border-border/60 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              Ver los {projects.length} proyectos completos
              <span className="text-base">→</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
