'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '../layout/Container';
import { AnimatedBackground } from '../animations/AnimatedBackground';
import { useRef, useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden py-20 md:py-32">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 inline-flex"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 0 10px rgba(59, 130, 246, 0)',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm backdrop-blur-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text font-medium text-transparent">
                Your trusted migration partner
              </span>
            </motion.div>
          </motion.div>

          {/* Title with Moving Gradient Animation */}
          <motion.h1
            variants={itemVariants}
            className="relative mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="relative inline-block">
              <motion.span
                className="relative bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: '100% 50%' }}
                transition={{
                  duration: 2,
                  delay: 1,
                  ease: 'easeInOut',
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              >
                {t('title')}
              </motion.span>
              {/* Enhanced Highlight Wave that moves through the text once */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2.5,
                  delay: 0,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2.5,
                  delay: 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-lg text-muted-foreground/90 sm:text-xl md:text-2xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" className="group relative overflow-hidden text-base shadow-xl shadow-primary/25">
                <Link href="/apply">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="relative z-10">{t('cta')}</span>
                  <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" variant="outline" className="text-base backdrop-blur-sm">
                <Link href="/services">{t('learnMore')}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with Counter Animation */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '10K+', label: 'Clients Served' },
              { value: '50+', label: 'Countries' },
              { value: '98%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group relative space-y-2"
              >
                <motion.div
                  className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% auto',
                  }}
                />
                <div className="relative text-3xl font-bold text-primary sm:text-4xl">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
