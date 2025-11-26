import * as z from 'zod';

// Step 1: Personal Background
export const step1Schema = z.object({
  currentCountry: z.string().min(1, 'Current country is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  targetCountry: z.string().min(1, 'Target country is required'),
  age: z.coerce.number().min(18, 'Must be at least 18').max(99, 'Invalid age'),
  maritalStatus: z.enum(['single', 'married', 'common-law']),
  hasDependents: z.boolean(),
  dependentsCount: z.coerce.number().optional(),
});

// Step 2: Education & Work
export const step2Schema = z.object({
  educationLevel: z.enum(['highSchool', 'bachelor', 'master', 'phd', 'other']),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  yearsOfExperience: z.coerce.number().min(0, 'Invalid experience'),
  workDomain: z.string().min(1, 'Work domain is required'),
  employmentStatus: z.enum(['employed', 'self-employed', 'student', 'unemployed']),
  annualIncome: z.string().min(1, 'Income range is required'),
});

// Step 3: Qualifications
export const step3Schema = z.object({
  englishTest: z.enum(['ielts', 'toefl', 'pte', 'none']),
  englishScore: z.coerce.number().optional(),
  otherLanguages: z.array(z.string()).optional().default([]),
  visaType: z.enum(['work', 'study', 'family', 'business', 'skilled']),
  previousVisaApplications: z.boolean(),
  previousApprovals: z.coerce.number().optional(),
  previousRefusals: z.coerce.number().optional(),
  hasJobOffer: z.enum(['yes', 'no', 'not-yet']),
});

// Step 4: Financial & Timeline
export const step4Schema = z.object({
  financialResources: z.enum(['<5k', '5k-15k', '15k-30k', '30k-50k', '50k+']),
  timeline: z.enum(['immediate', '3-6months', '6-12months', '1-2years', 'flexible']),
  hasFamilyInTarget: z.boolean(),
  additionalInfo: z.string().optional(),
});

// Complete form schema
export const calculatorFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
});

// Type exports
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;
