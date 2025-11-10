'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  FileText,
  MessageSquare,
  Home,
  Scale,
  Compass,
} from 'lucide-react';

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

export default function ServicesPage() {
  const t = useTranslations('services');

  const mainServices = [
    {
      icon: Briefcase,
      title: t('workVisa.title'),
      description: t('workVisa.description'),
      details: t('workVisa.details'),
    },
    {
      icon: GraduationCap,
      title: t('studyAbroad.title'),
      description: t('studyAbroad.description'),
      details: t('studyAbroad.details'),
    },
    {
      icon: Users,
      title: t('familyMigration.title'),
      description: t('familyMigration.description'),
      details: t('familyMigration.details'),
    },
    {
      icon: Building2,
      title: t('businessImmigration.title'),
      description: t('businessImmigration.description'),
      details: t('businessImmigration.details'),
    },
    {
      icon: FileText,
      title: t('documentProcessing.title'),
      description: t('documentProcessing.description'),
      details: t('documentProcessing.details'),
    },
    {
      icon: MessageSquare,
      title: t('interviewPrep.title'),
      description: t('interviewPrep.description'),
      details: t('interviewPrep.details'),
    },
  ];

  const additionalServices = [
    {
      icon: Home,
      title: t('additionalServices.settlement.title'),
      description: t('additionalServices.settlement.description'),
    },
    {
      icon: Scale,
      title: t('additionalServices.legal.title'),
      description: t('additionalServices.legal.description'),
    },
    {
      icon: Compass,
      title: t('additionalServices.career.title'),
      description: t('additionalServices.career.description'),
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {t('title')}
              </h1>
              <p className="mb-6 text-xl text-muted-foreground">
                {t('subtitle')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('intro')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Main Services */}
        <section className="py-20">
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {mainServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="group h-full transition-all hover:shadow-lg">
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold">
                          {service.title}
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                        <div className="mt-auto">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {service.details}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        {/* Additional Services */}
        <section className="bg-muted/30 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t('additionalServices.title')}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3"
            >
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full transition-shadow hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Take the first step towards your migration journey. Our experts are ready to guide you.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/apply">Apply Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
