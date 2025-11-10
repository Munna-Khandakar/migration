'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Eye, Heart } from 'lucide-react';

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

export default function AboutPage() {
  const t = useTranslations('about');

  const values = [
    {
      icon: Shield,
      title: t('values.integrity.title'),
      description: t('values.integrity.description'),
    },
    {
      icon: Target,
      title: t('values.excellence.title'),
      description: t('values.excellence.description'),
    },
    {
      icon: Eye,
      title: t('values.transparency.title'),
      description: t('values.transparency.description'),
    },
    {
      icon: Heart,
      title: t('values.dedication.title'),
      description: t('values.dedication.description'),
    },
  ];

  const stats = [
    { value: t('experience.value'), label: t('experience.title') },
    { value: t('successRate.value'), label: t('successRate.title') },
    { value: t('clientsServed.value'), label: t('clientsServed.title') },
    { value: t('countries.value'), label: t('countries.title') },
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
              <p className="text-xl text-muted-foreground">
                {t('subtitle')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12">
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Description Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t('description')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/30 py-20">
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold">
                      {t('mission.title')}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {t('mission.description')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold">
                      {t('vision.title')}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {t('vision.description')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Core Values */}
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
                {t('values.title')}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full transition-shadow hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold">
                          {value.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="bg-muted/30 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t('team.title')}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t('team.description')}
              </p>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
