'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '../layout/Container';

const iconMap = {
  workVisa: Briefcase,
  studyAbroad: GraduationCap,
  familyMigration: Users,
  businessImmigration: Building2,
  documentProcessing: FileText,
  interviewPrep: MessageSquare,
};

export function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    'workVisa',
    'studyAbroad',
    'familyMigration',
    'businessImmigration',
    'documentProcessing',
    'interviewPrep',
  ] as const;

  return (
    <section className="w-full py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service];
            return (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{t(`${service}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(`${service}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
