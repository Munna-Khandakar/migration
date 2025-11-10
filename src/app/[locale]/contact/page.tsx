'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
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

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(t('form.success'));
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('info.address'),
      value: t('info.addressValue'),
    },
    {
      icon: Phone,
      label: t('info.phone'),
      value: t('info.phoneValue'),
    },
    {
      icon: Mail,
      label: t('info.email'),
      value: t('info.emailValue'),
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const offices = [
    {
      title: t('offices.main.title'),
      location: t('offices.main.location'),
    },
    {
      title: t('offices.branch.title'),
      location: t('offices.branch.location'),
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

        {/* Contact Info & Form */}
        <section className="py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h2 className="mb-6 text-2xl font-bold">
                      {t('info.title')}
                    </h2>
                    <div className="space-y-6">
                      {contactInfo.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-start gap-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold">{item.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.value}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Business Hours */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{t('info.hours')}</h3>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>{t('info.hoursValue')}</div>
                        <div>{t('info.saturday')}</div>
                        <div>{t('info.sunday')}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Media */}
                  <div>
                    <h3 className="mb-4 font-semibold">{t('social.title')}</h3>
                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            className="rounded-lg bg-primary/10 p-3 transition-colors hover:bg-primary/20"
                            aria-label={social.label}
                          >
                            <Icon className="h-5 w-5 text-primary" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="mb-2 text-2xl font-bold">
                      {t('form.title')}
                    </h2>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {t('form.subtitle')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('form.name')}</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder={t('form.namePlaceholder')}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('form.email')}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t('form.emailPlaceholder')}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('form.phone')}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder={t('form.phonePlaceholder')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">{t('form.subject')}</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder={t('form.subjectPlaceholder')}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t('form.message')}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t('form.messagePlaceholder')}
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('form.sending') : t('form.send')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Office Locations */}
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
                {t('offices.title')}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2"
            >
              {offices.map((office, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full">
                    <CardContent className="p-8 text-center">
                      <div className="mb-4 inline-block rounded-lg bg-primary/10 p-4">
                        <MapPin className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        {office.title}
                      </h3>
                      <p className="text-muted-foreground">{office.location}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
