'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Shield, TrendingUp, Users } from 'lucide-react';
import { Container } from '../layout/Container';
import { AnimatedBackground } from '../animations/AnimatedBackground';

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

export function CalculatorHeroSection() {
  const t = useTranslations('visaCalculator.hero');

  const trustIndicators = [
    { icon: Users, text: t('trustIndicators.assessments') },
    { icon: TrendingUp, text: t('trustIndicators.accuracy') },
    { icon: CheckCircle, text: t('trustIndicators.expert') },
    { icon: Shield, text: t('trustIndicators.confidential') },
  ];

  return (
    <section className="relative min-h-[50vh] w-full overflow-hidden py-16 md:py-24">
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
          <motion.div variants={itemVariants} className="relative mb-6 inline-flex">
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
                {t('badge')}
              </span>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {t('title')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-base text-muted-foreground/90 sm:text-lg md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex flex-col items-center gap-2 rounded-lg border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <indicator.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-center font-medium">{indicator.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
