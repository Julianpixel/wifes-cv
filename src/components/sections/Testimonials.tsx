'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const total = testimonials.length;

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent(prev => (prev + dir + total) % total);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">Testimonios</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
            Lo que dicen <span className="gradient-text">de mí.</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full rounded-3xl border border-border/50 bg-card p-8 sm:p-10 relative overflow-hidden">
                  {/* BG glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-10"
                    style={{ background: 'hsl(var(--primary))' }}
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Star className="w-4 h-4 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-primary/25 mb-4" />

                  {/* Content */}
                  <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {testimonials[current].avatar && (
                      <img
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                      />
                    )}
                    <div>
                      <p className="font-bold text-foreground">{testimonials[current].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                    </div>
                    {/* Counter */}
                    <div className="ml-auto text-sm text-muted-foreground font-mono">
                      {current + 1} / {total}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => go(-1)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      width: i === current ? 24 : 8,
                      backgroundColor: i === current ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.3)',
                    }}
                    className="h-2 rounded-full"
                  />
                </button>
              ))}
            </div>

            <motion.button
              onClick={() => go(1)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
