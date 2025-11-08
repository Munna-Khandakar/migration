import * as z from 'zod';

export const applicationFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  currentLocation: z.string().min(1, 'Current location is required'),

  // Professional Information
  education: z.string().min(1, 'Education level is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  experience: z.string().min(0, 'Years of experience is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  skills: z.string().min(1, 'Skills are required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),

  // Migration Details
  destination: z.string().min(1, 'Destination is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  additionalInfo: z.string().optional(),

  // Consent
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the privacy policy',
  }),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
