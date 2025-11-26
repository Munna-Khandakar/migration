'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Calendar,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircularProgress } from './CircularProgress';
import type { ScoringResult } from '@/lib/calculator/scoring';
import type { Recommendation } from '@/lib/calculator/recommendations';
import { cn } from '@/lib/utils';

interface ResultsDisplayProps {
  result: ScoringResult;
  recommendations: Recommendation[];
  targetCountry: string;
  onStartOver: () => void;
}

export function ResultsDisplay({
  result,
  recommendations,
  targetCountry,
  onStartOver,
}: ResultsDisplayProps) {
  const t = useTranslations('visaCalculator.results');
  const tButtons = useTranslations('visaCalculator.buttons');
  const { totalScore, probability, strengths, weaknesses } = result;

  // Get result title and description based on probability
  const getResultTitle = () => {
    return t(`${probability}.title`);
  };

  const getResultDescription = () => {
    return t(`${probability}.description`, { country: targetCountry });
  };

  // Get probability badge variant
  const getProbabilityVariant = () => {
    switch (probability) {
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Score Card */}
      <Card className="overflow-hidden relative border-2">
        {/* Background gradient based on probability */}
        <div
          className={cn(
            'absolute inset-0 opacity-5',
            probability === 'high' && 'bg-gradient-to-br from-green-500 to-emerald-500',
            probability === 'medium' && 'bg-gradient-to-br from-yellow-500 to-orange-500',
            probability === 'low' && 'bg-gradient-to-br from-red-500 to-rose-500'
          )}
        />

        <CardContent className="relative z-10 p-8 md:p-12 text-center">
          {/* Circular Progress */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 1 }}
          >
            <CircularProgress value={totalScore} size={200} />
          </motion.div>

          {/* Probability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <Badge
              variant={getProbabilityVariant()}
              className="text-sm px-4 py-1.5"
            >
              {probability === 'high' && <TrendingUp className="mr-2 h-4 w-4" />}
              {probability === 'medium' && <Minus className="mr-2 h-4 w-4" />}
              {probability === 'low' && <TrendingDown className="mr-2 h-4 w-4" />}
              {probability.toUpperCase()} PROBABILITY
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold mt-4"
          >
            {getResultTitle()}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto"
          >
            {getResultDescription()}
          </motion.p>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {t('strengths')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <ul className="space-y-3">
                {strengths.map((strength, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Complete the assessment to see your strengths.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              {t('weaknesses')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weaknesses.length > 0 ? (
              <ul className="space-y-3">
                {weaknesses.map((weakness, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{weakness}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Great! No major weaknesses identified.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            {t('recommendations')}
          </CardTitle>
          <CardDescription>{t('recommendationsSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-4 rounded-lg bg-muted/50 border"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    {rec.action && (
                      <Button
                        variant="link"
                        size="sm"
                        className="mt-2 p-0 h-auto"
                        asChild
                      >
                        <Link href="/contact">
                          {rec.action}
                          <TrendingUp className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps CTA */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">{t('nextSteps')}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('nextStepsDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                {tButtons('bookConsultation')}
              </Link>
            </Button>

            <Button size="lg" variant="outline" onClick={onStartOver}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {tButtons('startOver')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed">
        {t('../disclaimer')}
      </p>
    </div>
  );
}
