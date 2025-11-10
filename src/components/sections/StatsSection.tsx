'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function StatsSection() {
  const t = useTranslations('about');

  const stats = [
    {
      icon: Award,
      value: t('experience.value'),
      label: t('experience.title'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: TrendingUp,
      value: t('successRate.value'),
      label: t('successRate.title'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Users,
      value: t('clientsServed.value'),
      label: t('clientsServed.title'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Globe,
      value: t('countries.value'),
      label: t('countries.title'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <section className="border-y bg-muted/30 py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t('whyChoose')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className={`mb-4 rounded-full ${stat.bgColor} p-4`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className={`mb-2 text-4xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {stat.label}
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
