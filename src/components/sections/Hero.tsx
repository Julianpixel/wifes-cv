import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, GraduationCap, Plane } from 'lucide-react';
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/animations';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  image?: string;
}

// 3D Tilt — only active on devices with mouse (hover: hover media)
function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export function Hero({ name, title, description, image }: HeroProps) {
  const firstName = name.split(' ')[0];
  const finalImage = image && image !== '' ? image : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-[70%] h-[70%] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 -left-1/4 w-[55%] h-[55%] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.12), transparent 70%)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.8) 1.5px, transparent 1.5px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── MOBILE: full-bg photo (editorial style) — hidden on lg ── */}
      <div className="absolute inset-0 lg:hidden overflow-hidden">
        <Image
          src={finalImage}
          alt={name}
          fill
          priority
          className="object-cover object-top"
          unoptimized={finalImage.startsWith('/')}
        />
        {/* Refined overlay for mobile: subtler in light mode, deeper in dark mode */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to right, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.4) 50%, transparent 100%)',
          }}
        />
        {/* Subtle vignette/bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-[1]" />
      </div>

      {/* ── Layout ── */}
      <div className="relative w-full pt-20 sm:pt-24 pb-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 xl:gap-20 items-center min-h-[calc(100vh-5rem)]">

            {/* ── TEXT COLUMN ── */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col justify-center py-8 sm:py-12 relative z-10"
            >
              {/* Status + location badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold uppercase tracking-widest">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  Disponible para nuevas oportunidades
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-semibold">
                  <MapPin className="w-2.5 h-2.5" />
                  San Pedro de Macorís, RD
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1 variants={fadeInUp} className="font-black tracking-tighter leading-[0.88] mb-4">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl gradient-text">
                  {firstName}
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-foreground/90 mt-1">
                  Karolina
                </span>
              </motion.h1>

              {/* Credential */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                <span className="text-[11px] font-bold text-primary/70 uppercase tracking-[0.18em]">
                  UCE · Adm. Empresas Turísticas
                </span>
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeInUp} className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                {description}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8 sm:mb-12">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="sm"
                    className="h-11 px-7 rounded-xl text-sm font-bold group transition-all duration-300"
                    style={{ boxShadow: 'var(--theme-shadow)' }}
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Hablemos <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 px-7 rounded-xl text-sm font-bold border-border/60 hover:border-primary/40 hover:bg-primary/5"
                    onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Plane className="mr-1.5 w-3.5 h-3.5" /> Proyectos
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-8">
                {[
                  { value: '🎓', sub: 'UCE Graduada' },
                  { value: '6+', sub: 'Proyectos' },
                  { value: '🌴', sub: 'Turismo RD' },
                ].map((s) => (
                  <div key={s.sub} className="text-left">
                    <div className="text-xl font-black text-primary mb-0.5">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{s.sub}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── PHOTO COLUMN: Desktop only (lg+) ── */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              className="hidden lg:flex items-center justify-center relative"
            >
              <TiltCard>
                {/* Rotating orbit rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-6 rounded-[3.5rem] border border-dashed border-primary/15 z-0 pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-12 rounded-[4rem] border border-dashed border-secondary/15 z-0 pointer-events-none"
                />

                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] blur-3xl -z-10"
                  style={{ background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.35), transparent 75%)' }}
                />

                {/* Photo */}
                <div
                  className="relative rounded-[2.5rem] overflow-hidden border border-primary/20 shadow-2xl z-10 aspect-[3/4]"
                  style={{ boxShadow: 'var(--theme-shadow)' }}
                >
                  <Image 
                    src={finalImage} 
                    alt={name} 
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-700" 
                    unoptimized={finalImage.startsWith('/')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>

                {/* Floating cards — only desktop */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute -left-8 bottom-20 glass-card rounded-2xl p-3 shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">Licenciada</p>
                    <p className="text-[9px] text-muted-foreground">Adm. Empresas Turísticas</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="absolute -right-8 top-20 glass-card rounded-2xl p-3 shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-base">🌴</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">Rep. Dominicana</p>
                    <p className="text-[9px] text-muted-foreground">Caribe · SPM</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary z-20"
                />
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
