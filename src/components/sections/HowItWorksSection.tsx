'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, ClipboardCheck, FileText, CheckCircle2 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function HowItWorksSection() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: t('step1.title'),
      description: t('step1.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: ClipboardCheck,
      number: '02',
      title: t('step2.title'),
      description: t('step2.description'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: FileText,
      number: '03',
      title: t('step3.title'),
      description: t('step3.description'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: CheckCircle2,
      number: '04',
      title: t('step4.title'),
      description: t('step4.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Connecting Line (hidden on mobile) */}
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-20 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="relative p-6">
                    {/* Step Number */}
                    <div className="absolute right-4 top-4 text-6xl font-bold opacity-5">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`relative z-10 mb-4 inline-block rounded-full ${step.bgColor} p-4`}>
                      <Icon className={`h-8 w-8 ${step.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>

                    {/* Step Indicator */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {step.number}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
