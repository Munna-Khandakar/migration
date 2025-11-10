'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle, HelpCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function FAQPage() {
  const t = useTranslations('faq');

  const faqItems = [
    { id: 'q1', question: t('questions.q1.question'), answer: t('questions.q1.answer') },
    { id: 'q2', question: t('questions.q2.question'), answer: t('questions.q2.answer') },
    { id: 'q3', question: t('questions.q3.question'), answer: t('questions.q3.answer') },
    { id: 'q4', question: t('questions.q4.question'), answer: t('questions.q4.answer') },
    { id: 'q5', question: t('questions.q5.question'), answer: t('questions.q5.answer') },
    { id: 'q6', question: t('questions.q6.question'), answer: t('questions.q6.answer') },
    { id: 'q7', question: t('questions.q7.question'), answer: t('questions.q7.answer') },
    { id: 'q8', question: t('questions.q8.question'), answer: t('questions.q8.answer') },
    { id: 'q9', question: t('questions.q9.question'), answer: t('questions.q9.answer') },
    { id: 'q10', question: t('questions.q10.question'), answer: t('questions.q10.answer') },
    { id: 'q11', question: t('questions.q11.question'), answer: t('questions.q11.answer') },
    { id: 'q12', question: t('questions.q12.question'), answer: t('questions.q12.answer') },
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
              <div className="mb-6 inline-block rounded-full bg-primary/10 p-4">
                <HelpCircle className="h-12 w-12 text-primary" />
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {t('title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('subtitle')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl"
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <AccordionItem
                      value={item.id}
                      className="rounded-lg border bg-card px-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="text-base font-semibold">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-6 inline-block rounded-full bg-primary/10 p-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Still Have Questions?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Can't find the answer you're looking for? Our expert team is here to help you with any questions about your migration journey.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/apply">Apply Now</Link>
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
