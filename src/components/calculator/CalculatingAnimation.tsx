'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { useTranslations } from 'next-intl';

const messages = [
  { key: 'message1', duration: 800 },
  { key: 'message2', duration: 900 },
  { key: 'message3', duration: 700 },
  { key: 'message4', duration: 600 },
];

export function CalculatingAnimation() {
  const t = useTranslations('visaCalculator.results.calculating');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, messages[currentMessageIndex].duration);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="text-center py-20">
      {/* Rotating Calculator Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="inline-block mb-6"
      >
        <Calculator className="h-16 w-16 text-primary" />
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('title')}</h2>

      {/* Cycling Messages */}
      <div className="min-h-[2rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            {t(messages[currentMessageIndex].key)}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {messages.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: index <= currentMessageIndex ? 1 : 0.3,
              scale: index === currentMessageIndex ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
