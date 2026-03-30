'use client';

import { motion } from 'framer-motion';
import { Search, LayoutList, Rocket, CheckCircle2 } from 'lucide-react';
import { staggerContainer } from '@/lib/animations';

const steps = [
  { number: '01', icon: Search, title: 'Análisis y Diagnóstico', description: 'Estudio el destino, el mercado objetivo y las oportunidades únicas para diseñar una estrategia a medida.' },
  { number: '02', icon: LayoutList, title: 'Planificación Estratégica', description: 'Desarrollo el plan de acción con cronogramas, KPIs y todos los recursos necesarios para el éxito.' },
  { number: '03', icon: Rocket, title: 'Ejecución y Gestión', description: 'Coordinación de equipos, proveedores y operaciones para asegurar la calidad en cada detalle.' },
  { number: '04', icon: CheckCircle2, title: 'Evaluación y Mejora', description: 'Medición de resultados, análisis de satisfacción del viajero y ajuste continuo del modelo.' },
];

export function Process() {
  return (
    <section id="process" className="py-32 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">Metodología</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Mi Proceso de Trabajo</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Un enfoque estructurado que garantiza resultados excepcionales en cada proyecto turístico.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 blur-3xl opacity-50" 
            style={{ 
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)' 
            }} 
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="relative z-10 flex flex-col items-center text-center group cursor-default"
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 rounded-full bg-background border-2 border-border group-hover:border-primary/50 flex items-center justify-center mb-6 transition-all duration-400 shadow-xl group-hover:shadow-primary/20 relative"
                >
                  <div className="absolute inset-2 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="w-10 h-10 text-primary/40 group-hover:text-primary transition-colors duration-300 relative z-10" />
                </motion.div>

                <span className="text-xs font-black text-secondary/70 tracking-[0.3em] uppercase mb-2">Paso {step.number}</span>
                <h3 className="text-xl font-black mb-3 tracking-tighter group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
