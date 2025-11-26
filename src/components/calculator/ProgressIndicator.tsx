'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  title: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Desktop Stepper */}
      <div className="hidden lg:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center mx-auto font-semibold text-sm transition-all duration-300',
                  currentStep === index &&
                    'bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse',
                  currentStep > index && 'bg-primary text-primary-foreground',
                  currentStep < index && 'bg-muted text-muted-foreground border-2 border-border'
                )}
              >
                {currentStep > index ? <Check className="h-5 w-5" /> : index + 1}
              </div>

              {/* Step Label */}
              <p
                className={cn(
                  'text-xs mt-2 text-center font-medium transition-colors',
                  currentStep >= index ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </p>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-[60%] w-full h-0.5 bg-border -z-10">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: currentStep > index ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Progress Bar */}
      <div className="lg:hidden">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-muted-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-center mt-3 text-muted-foreground font-medium">
          {steps[currentStep].label}
        </p>
      </div>
    </div>
  );
}
