'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Clock, Shield, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const trustBadges = [
  { icon: Shield,        text: 'Garantía de satisfacción' },
  { icon: Clock,         text: 'Respuesta en menos de 24h' },
  { icon: Sparkles,      text: 'Resultados medibles' },
  { icon: MessageCircle, text: 'Consulta inicial gratuita' },
];

function MagnetButton({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.x + rect.width / 2;
    const cy = rect.y + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative inline-block"
    >
      <Link href={href}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="relative group h-16 px-10 sm:px-14 text-lg sm:text-xl rounded-2xl font-black text-foreground overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(171 90% 44%), hsl(38 95% 55%))',
            boxShadow: '0 0 40px hsl(171 90% 44% / 0.5), 0 20px 50px hsl(0 0% 0% / 0.3)',
          }}
        >
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            className="absolute inset-0 w-1/2 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.25), transparent)',
              transform: 'skewX(-20deg)',
            }}
          />
          <span className="relative z-10 flex items-center gap-3">
            {children}
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
}

export function CTA() {
  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(175 80% 18%) 0%, hsl(210 40% 8%) 50%, hsl(38 60% 10%) 100%)',
            boxShadow: '0 40px 120px hsl(171 90% 44% / 0.15)',
          }}
        >
          {/* Background orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'hsl(171 90% 44% / 0.3)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 3 }}
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            style={{ background: 'hsl(38 95% 55% / 0.2)' }}
          />

          {/* Floating emojis */}
          {['🌴', '✈️', '🌊', '🏨'].map((emoji, i) => (
            <motion.div
              key={emoji}
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
              className="absolute text-3xl sm:text-4xl opacity-15 hidden sm:block pointer-events-none select-none"
              style={{
                top: `${15 + i * 20}%`,
                right: `${5 + (i % 2) * 8}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}

          <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Cupos disponibles este mes
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tighter"
            >
              Tu próximo proyecto turístico
              <br className="hidden sm:block" />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(90deg, hsl(171 90% 60%), hsl(38 95% 65%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                merece una experta.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Cada semana trabajo con un número limitado de clientes para garantizar 
              resultados de calidad. Reserva tu consulta gratuita hoy — sin compromiso.
            </motion.p>

            {/* MAIN CTA — Magnet button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <MagnetButton href="#contact">
                Sí, quiero trabajar contigo
              </MagnetButton>

              <Link href="/proyectos">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="h-16 px-8 text-base rounded-2xl font-bold border border-white/20 text-white/80 hover:bg-white/5 transition-all"
                >
                  Ver casos de éxito →
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-8"
            >
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
                  <Icon className="w-4 h-4 text-primary/70" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
