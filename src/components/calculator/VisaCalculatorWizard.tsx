'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type CalculatorFormData } from '@/lib/validations/calculator';
import { calculateVisaProbability } from '@/lib/calculator/scoring';
import { generateRecommendations } from '@/lib/calculator/recommendations';
import { ProgressIndicator } from './ProgressIndicator';
import { CalculatingAnimation } from './CalculatingAnimation';
import { ResultsDisplay } from './ResultsDisplay';

type FormStep = 0 | 1 | 2 | 3;

interface StepFieldsProps {
  form: ReturnType<typeof useForm<Partial<CalculatorFormData>>>;
  t: ReturnType<typeof useTranslations<'visaCalculator'>>;
}

export function VisaCalculatorWizard() {
  const t = useTranslations('visaCalculator');
  const [currentStep, setCurrentStep] = useState<FormStep>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateVisaProbability> | null>(null);
  const [recommendations, setRecommendations] = useState<
    ReturnType<typeof generateRecommendations>
  >([]);

  // Define steps
  const steps = [
    { label: t('steps.personal.label'), title: t('steps.personal.title'), description: t('steps.personal.description') },
    { label: t('steps.education.label'), title: t('steps.education.title'), description: t('steps.education.description') },
    { label: t('steps.qualifications.label'), title: t('steps.qualifications.title'), description: t('steps.qualifications.description') },
    { label: t('steps.financial.label'), title: t('steps.financial.title'), description: t('steps.financial.description') },
  ];

  // Form setup without resolver - we'll validate manually per step
  const form = useForm<Partial<CalculatorFormData>>({
    mode: 'onChange',
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('visaCalculatorData');
    if (saved) {
      try {
        const { formData, currentStep: savedStep, timestamp } = JSON.parse(saved);
        // Only restore if less than 7 days old
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          form.reset(formData);
          // Use setTimeout to avoid setState warning
          setTimeout(() => {
            setCurrentStep(savedStep);
            toast.info('We restored your previous progress!');
          }, 0);
        }
      } catch (error) {
        console.error('Failed to restore saved data:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const formData = form.getValues();
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(
        'visaCalculatorData',
        JSON.stringify({
          formData,
          currentStep,
          timestamp: Date.now(),
        })
      );
    }
  }, [currentStep, form]);

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const handleCalculate = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsCalculating(true);

    // Simulate calculation time (3 seconds)
    setTimeout(() => {
      const formData = form.getValues() as CalculatorFormData;
      const scoringResult = calculateVisaProbability(formData);
      const recs = generateRecommendations(formData, scoringResult);

      setResult(scoringResult);
      setRecommendations(recs);
      setIsCalculating(false);

      // Clear localStorage after calculation
      localStorage.removeItem('visaCalculatorData');
    }, 3000);
  };

  const handleStartOver = () => {
    form.reset();
    setCurrentStep(0);
    setResult(null);
    setRecommendations([]);
    localStorage.removeItem('visaCalculatorData');
    toast.success('Starting a new assessment');
  };

  // If calculating, show animation
  if (isCalculating) {
    return <CalculatingAnimation />;
  }

  // If results available, show results
  if (result) {
    return (
      <ResultsDisplay
        result={result}
        recommendations={recommendations}
        targetCountry={form.getValues('targetCountry') || 'your target country'}
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <Card className="relative overflow-hidden">
          {/* Progress Indicator */}
          <CardHeader className="border-b bg-muted/30">
            <ProgressIndicator currentStep={currentStep} steps={steps} />
          </CardHeader>

          {/* Form Content with AnimatePresence */}
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Title */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
                  <p className="text-muted-foreground">{steps[currentStep].description}</p>
                </div>

                {/* Step Fields */}
                <div className="space-y-6">
                  {currentStep === 0 && <Step1Fields form={form} t={t} />}
                  {currentStep === 1 && <Step2Fields form={form} t={t} />}
                  {currentStep === 2 && <Step3Fields form={form} t={t} />}
                  {currentStep === 3 && <Step4Fields form={form} t={t} />}
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>

          {/* Navigation */}
          <CardFooter className="flex justify-between border-t pt-6">
            {currentStep > 0 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('buttons.back')}
              </Button>
            ) : (
              <div />
            )}

            <Button
              type="button"
              onClick={currentStep === 3 ? handleCalculate : handleNext}
            >
              {currentStep === 3 ? (
                <>
                  {t('buttons.calculate')}
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  {t('buttons.continue')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

// Step 1 Fields
function Step1Fields({ form, t }: StepFieldsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="currentCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.currentCountry')}</FormLabel>
            <FormControl>
              <Input placeholder={t('placeholders.selectCountry')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="citizenship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.citizenship')}</FormLabel>
            <FormControl>
              <Input placeholder={t('placeholders.selectCountry')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.targetCountry')}</FormLabel>
            <FormControl>
              <Input placeholder={t('placeholders.selectCountry')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.age')}</FormLabel>
            <FormControl>
              <Input type="number" min="18" max="99" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maritalStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.maritalStatus')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="common-law">Common-law</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hasDependents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.hasDependents')}</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === 'true')}
              defaultValue={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('hasDependents') && (
        <FormField
          control={form.control}
          name="dependentsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.dependentsCount')}</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

// Step 2 Fields
function Step2Fields({ form, t }: StepFieldsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="educationLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.educationLevel')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeholders.selectEducation')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="highSchool">High School</SelectItem>
                <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                <SelectItem value="master">Master&apos;s Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fieldOfStudy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.fieldOfStudy')}</FormLabel>
            <FormControl>
              <Input placeholder={t('placeholders.enterField')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.yearsOfExperience')}</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="workDomain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.workDomain')}</FormLabel>
            <FormControl>
              <Input placeholder={t('placeholders.selectDomain')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employmentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.employmentStatus')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="annualIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.annualIncome')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="<20k">&lt;$20,000</SelectItem>
                <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                <SelectItem value="40k-70k">$40,000 - $70,000</SelectItem>
                <SelectItem value="70k-100k">$70,000 - $100,000</SelectItem>
                <SelectItem value="100k+">$100,000+</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// Step 3 Fields
function Step3Fields({ form, t }: StepFieldsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="englishTest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.englishTest')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeholders.selectTest')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ielts">IELTS</SelectItem>
                <SelectItem value="toefl">TOEFL</SelectItem>
                <SelectItem value="pte">PTE</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('englishTest') !== 'none' && form.watch('englishTest') && (
        <FormField
          control={form.control}
          name="englishScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.englishScore')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9"
                  placeholder={t('placeholders.enterScore')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="visaType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.visaType')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('placeholders.selectVisa')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="work">Work Visa</SelectItem>
                <SelectItem value="study">Study Visa</SelectItem>
                <SelectItem value="family">Family Reunion</SelectItem>
                <SelectItem value="business">Business Visa</SelectItem>
                <SelectItem value="skilled">Skilled Migration</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="previousVisaApplications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.previousApplications')}</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === 'true')}
              defaultValue={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch('previousVisaApplications') && (
        <>
          <FormField
            control={form.control}
            name="previousApprovals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Approvals</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousRefusals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Refusals</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="hasJobOffer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.hasJobOffer')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="not-yet">Not Yet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// Step 4 Fields
function Step4Fields({ form, t }: StepFieldsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="financialResources"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.financialResources')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="<5k">&lt;$5,000</SelectItem>
                <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                <SelectItem value="50k+">$50,000+</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timeline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.timeline')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                <SelectItem value="3-6months">3-6 months</SelectItem>
                <SelectItem value="6-12months">6-12 months</SelectItem>
                <SelectItem value="1-2years">1-2 years</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hasFamilyInTarget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fields.hasFamilyInTarget')}</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === 'true')}
              defaultValue={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t('fields.additionalInfo')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('placeholders.additionalInfo')}
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
