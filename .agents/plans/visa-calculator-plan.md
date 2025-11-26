# Visa Probability Calculator - Implementation Plan

## Overview
Add an interactive visa probability calculator feature to the migration consultancy website that helps users assess their visa eligibility through a 4-step wizard form with frontend-only scoring and personalized recommendations.

**User Preferences:**
- ✅ Frontend-only calculation (mock/static scoring)
- ✅ Multi-step wizard with progress bar
- ✅ Lead generation focused (consultation booking)

---

## 1. Homepage CTA Integration

### 1.1 Add CTA to HeroSection
**File:** `src/components/sections/HeroSection.tsx`

**Location:** After the existing "Apply Now" and "Learn More" buttons (line 207)

**Button Design:**
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  <Button
    asChild
    size="lg"
    variant="outline"
    className="relative text-base backdrop-blur-sm border-2 border-primary/50 hover:border-primary group"
  >
    <Link href="/visa-calculator">
      <Calculator className="mr-2 h-4 w-4" />
      <span className="relative z-10">{t('visaCalculatorCta')}</span>
      <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
    </Link>
  </Button>
</motion.div>
```

**New Badge:** Add above button group
```tsx
<motion.div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs backdrop-blur-xl">
  <Sparkles className="h-3 w-3 text-blue-500" />
  <span>New: Free Visa Assessment Tool</span>
</motion.div>
```

### 1.2 Add Secondary CTA to CTASection
**File:** `src/components/sections/CTASection.tsx`

**Approach:** Add third button or replace "Contact Us" with calculator option

**Copy:**
- Title: "Not Sure If You Qualify?"
- Subtitle: "Take our 5-minute assessment and get personalized recommendations"
- Button: "Calculate My Chances"

---

## 2. Create New Page Route

### 2.1 Page Structure
**New File:** `src/app/[locale]/visa-calculator/page.tsx`

**Layout:**
```tsx
export default async function VisaCalculatorPage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      {/* Compact Hero Section */}
      <CalculatorHeroSection />

      {/* Calculator Wizard */}
      <section className="py-12 md:py-16">
        <Container>
          <VisaCalculatorWizard />
        </Container>
      </section>

      {/* Why Use Tool */}
      <BenefitsSection />

      {/* FAQ */}
      <CalculatorFAQ />
    </main>
  );
}
```

### 2.2 Hero Section Component
**New File:** `src/components/calculator/CalculatorHeroSection.tsx`

**Design:** Similar to existing HeroSection but:
- Height: `min-h-[50vh]` instead of `calc(100vh-4rem)`
- Reuse `<AnimatedBackground />` component
- Trust indicators: "50,000+ assessments", "98% accuracy", "Expert-backed", "100% confidential"

---

## 3. Multi-Step Wizard Form

### 3.1 Main Wizard Component
**New File:** `src/components/calculator/VisaCalculatorWizard.tsx`

**State Management:**
```typescript
interface CalculatorFormData {
  // Step 1: Personal Background
  currentCountry: string;
  citizenship: string;
  targetCountry: string;
  age: number;
  maritalStatus: 'single' | 'married' | 'common-law';
  hasDependents: boolean;
  dependentsCount?: number;

  // Step 2: Education & Work
  educationLevel: 'highSchool' | 'bachelor' | 'master' | 'phd' | 'other';
  fieldOfStudy: string;
  yearsOfExperience: number;
  workDomain: string;
  employmentStatus: 'employed' | 'self-employed' | 'student' | 'unemployed';
  annualIncome: string;

  // Step 3: Qualifications
  englishTest: 'ielts' | 'toefl' | 'pte' | 'none';
  englishScore?: number;
  otherLanguages: string[];
  visaType: 'work' | 'study' | 'family' | 'business' | 'skilled';
  previousVisaApplications: boolean;
  previousApprovals?: number;
  previousRefusals?: number;
  hasJobOffer: 'yes' | 'no' | 'not-yet';

  // Step 4: Financial & Timeline
  financialResources: string;
  timeline: 'immediate' | '3-6months' | '6-12months' | '1-2years' | 'flexible';
  hasFamilyInTarget: boolean;
  additionalInfo?: string;
}
```

**Form Pattern:** Follow existing ApplicationForm.tsx structure:
- React Hook Form with Zod validation
- Card-based layout with CardHeader/CardContent
- Form components from shadcn/ui
- Toast notifications for feedback

### 3.2 Progress Indicator Component
**New File:** `src/components/calculator/ProgressIndicator.tsx`

**Design:**
```tsx
// Desktop: Horizontal stepper with 4 circles
// Mobile: Linear progress bar with percentage

<div className="mb-8">
  {/* Desktop Stepper */}
  <div className="hidden lg:flex items-center justify-between">
    {steps.map((step, index) => (
      <div key={index} className="flex-1 relative">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mx-auto",
          currentStep === index && "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse",
          currentStep > index && "bg-primary text-primary-foreground",
          currentStep < index && "bg-muted text-muted-foreground border-2"
        )}>
          {currentStep > index ? <Check /> : index + 1}
        </div>
        {/* Connecting line */}
        {index < steps.length - 1 && (
          <div className="absolute top-5 left-[60%] w-full h-0.5 bg-border -z-10">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: currentStep > index ? '100%' : '0%' }}
            />
          </div>
        )}
        <p className="text-xs mt-2 text-center font-medium">{step.label}</p>
      </div>
    ))}
  </div>

  {/* Mobile Progress Bar */}
  <div className="lg:hidden">
    <div className="flex justify-between text-sm mb-2">
      <span>Step {currentStep + 1} of 4</span>
      <span>{Math.round(((currentStep + 1) / 4) * 100)}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </div>
</div>
```

### 3.3 Step Configuration

**Step 1: Personal Background (30% weight)**
- Title: "Tell Us About Yourself"
- Description: "Let's start with your background and where you're planning to go"
- Fields: currentCountry, citizenship, targetCountry, age, maritalStatus, dependents

**Step 2: Education & Work (35% weight)**
- Title: "Your Education & Career"
- Description: "Share your professional journey and qualifications"
- Fields: educationLevel, fieldOfStudy, yearsOfExperience, workDomain, employmentStatus, annualIncome

**Step 3: Qualifications (25% weight)**
- Title: "Tests & Certifications"
- Description: "Tell us about your language tests and credentials"
- Fields: englishTest, englishScore (conditional), otherLanguages, visaType, previousApplications, jobOffer

**Step 4: Financial & Timeline (10% weight)**
- Title: "Financial Readiness"
- Description: "Almost there! Final details about your resources"
- Fields: financialResources, timeline, hasFamilyInTarget, additionalInfo

### 3.4 Form Navigation
**Pattern from ApplicationForm:**
```tsx
<CardFooter className="flex justify-between border-t pt-6">
  {currentStep > 0 && (
    <Button
      variant="outline"
      onClick={handleBack}
      disabled={isCalculating}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  )}

  {currentStep === 0 && <div />}

  <Button
    onClick={currentStep === 3 ? handleCalculate : handleNext}
    disabled={!isStepValid || isCalculating}
  >
    {isCalculating ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Calculating...
      </>
    ) : currentStep === 3 ? (
      <>
        Calculate My Chances
        <Sparkles className="ml-2 h-4 w-4" />
      </>
    ) : (
      <>
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </>
    )}
  </Button>
</CardFooter>
```

### 3.5 Form Validation
**New File:** `src/lib/validations/calculator.ts`

**Pattern:** Similar to `src/lib/validations/application.ts`

```typescript
import * as z from 'zod';

export const step1Schema = z.object({
  currentCountry: z.string().min(1, 'Current country is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  targetCountry: z.string().min(1, 'Target country is required'),
  age: z.number().min(18, 'Must be at least 18').max(99, 'Invalid age'),
  maritalStatus: z.enum(['single', 'married', 'common-law']),
  hasDependents: z.boolean(),
  dependentsCount: z.number().optional(),
});

export const step2Schema = z.object({
  educationLevel: z.enum(['highSchool', 'bachelor', 'master', 'phd', 'other']),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  yearsOfExperience: z.number().min(0, 'Invalid experience'),
  workDomain: z.string().min(1, 'Work domain is required'),
  employmentStatus: z.enum(['employed', 'self-employed', 'student', 'unemployed']),
  annualIncome: z.string().min(1, 'Income range is required'),
});

// ... step3Schema, step4Schema

export const calculatorFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
});

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;
```

---

## 4. Scoring Algorithm (Frontend)

### 4.1 Scoring Logic
**New File:** `src/lib/calculator/scoring.ts`

**Algorithm:**
```typescript
interface ScoringResult {
  totalScore: number; // 0-100
  probability: 'high' | 'medium' | 'low';
  categoryScores: {
    personal: number;
    education: number;
    qualifications: number;
    financial: number;
  };
  strengths: string[];
  weaknesses: string[];
}

export function calculateVisaProbability(data: CalculatorFormData): ScoringResult {
  let personalScore = 0;
  let educationScore = 0;
  let qualificationScore = 0;
  let financialScore = 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Personal Background (30 points max)
  // Age scoring
  if (data.age >= 25 && data.age <= 35) {
    personalScore += 10;
    strengths.push('Optimal age range for visa applications');
  } else if (data.age >= 18 && data.age <= 24) {
    personalScore += 8;
  } else if (data.age >= 36 && data.age <= 45) {
    personalScore += 6;
  } else {
    personalScore += 3;
    weaknesses.push('Age may impact certain visa categories');
  }

  // Target country (10 points)
  const highDemandCountries = ['canada', 'australia', 'newzealand', 'germany'];
  if (highDemandCountries.includes(data.targetCountry.toLowerCase())) {
    personalScore += 10;
  } else {
    personalScore += 7;
  }

  // Dependents (5 points)
  if (!data.hasDependents || (data.dependentsCount && data.dependentsCount <= 2)) {
    personalScore += 5;
  } else {
    personalScore += 2;
    weaknesses.push('Multiple dependents may complicate application');
  }

  // Current location (5 points)
  personalScore += 5; // Base points

  // Education & Work (35 points max)
  // Education level (15 points)
  const educationPoints = {
    'phd': 15,
    'master': 12,
    'bachelor': 9,
    'highSchool': 5,
    'other': 3
  };
  educationScore += educationPoints[data.educationLevel];
  if (data.educationLevel === 'phd' || data.educationLevel === 'master') {
    strengths.push('Strong educational background');
  }

  // Field of study (10 points)
  const stemFields = ['computer science', 'engineering', 'medicine', 'healthcare', 'it', 'technology'];
  const isStem = stemFields.some(field => data.fieldOfStudy.toLowerCase().includes(field));
  if (isStem) {
    educationScore += 10;
    strengths.push('In-demand field of study');
  } else {
    educationScore += 6;
  }

  // Work experience (10 points)
  if (data.yearsOfExperience >= 5) {
    educationScore += 10;
    strengths.push('Extensive work experience');
  } else if (data.yearsOfExperience >= 3) {
    educationScore += 7;
  } else if (data.yearsOfExperience >= 1) {
    educationScore += 4;
  } else {
    educationScore += 2;
    weaknesses.push('Limited work experience');
  }

  // Qualifications (25 points max)
  // English test (15 points)
  if (data.englishTest !== 'none') {
    if (data.englishScore && data.englishScore >= 7) {
      qualificationScore += 15;
      strengths.push('Excellent English proficiency');
    } else if (data.englishScore && data.englishScore >= 6) {
      qualificationScore += 10;
      strengths.push('Good English proficiency');
    } else {
      qualificationScore += 5;
    }
  } else {
    qualificationScore += 0;
    weaknesses.push('English language test required for most visas');
  }

  // Job offer (10 points)
  if (data.hasJobOffer === 'yes') {
    qualificationScore += 10;
    strengths.push('Job offer significantly boosts chances');
  } else if (data.hasJobOffer === 'not-yet') {
    qualificationScore += 5;
  } else {
    weaknesses.push('Job offer would strengthen application');
  }

  // Financial (10 points max)
  const financialRanges = {
    '50k+': 6,
    '30k-50k': 4,
    '15k-30k': 3,
    '5k-15k': 2,
    '<5k': 1
  };
  financialScore += financialRanges[data.financialResources as keyof typeof financialRanges] || 3;
  financialScore += 4; // Timeline flexibility

  if (data.financialResources === '50k+') {
    strengths.push('Strong financial position');
  } else if (data.financialResources === '<5k' || data.financialResources === '5k-15k') {
    weaknesses.push('Financial resources may need improvement');
  }

  // Calculate total
  const totalScore = personalScore + educationScore + qualificationScore + financialScore;

  // Determine probability
  let probability: 'high' | 'medium' | 'low';
  if (totalScore >= 85) probability = 'high';
  else if (totalScore >= 60) probability = 'medium';
  else probability = 'low';

  return {
    totalScore,
    probability,
    categoryScores: {
      personal: personalScore,
      education: educationScore,
      qualifications: qualificationScore,
      financial: financialScore,
    },
    strengths,
    weaknesses,
  };
}
```

### 4.2 Recommendations Generator
**New File:** `src/lib/calculator/recommendations.ts`

```typescript
interface Recommendation {
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export function generateRecommendations(
  data: CalculatorFormData,
  result: ScoringResult
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // English test recommendation
  if (data.englishTest === 'none') {
    recommendations.push({
      title: 'Take an English Proficiency Test',
      description: 'IELTS, TOEFL, or PTE scores are mandatory for most visa applications. Aim for IELTS 7+ for the best chances.',
      action: 'Book IELTS test',
      priority: 'high'
    });
  }

  // Job offer recommendation
  if (data.hasJobOffer === 'no') {
    recommendations.push({
      title: 'Secure a Job Offer',
      description: 'A valid job offer from an employer in your target country can significantly improve your visa chances and may open up employer-sponsored visa pathways.',
      action: 'Explore job opportunities',
      priority: 'high'
    });
  }

  // Education recommendation
  if (data.educationLevel === 'highSchool' || data.educationLevel === 'other') {
    recommendations.push({
      title: 'Consider Further Education',
      description: 'Higher education qualifications (Bachelor\'s, Master\'s, or PhD) substantially increase your visa eligibility for most countries.',
      action: 'View study programs',
      priority: 'medium'
    });
  }

  // Work experience recommendation
  if (data.yearsOfExperience < 3) {
    recommendations.push({
      title: 'Gain More Work Experience',
      description: 'Most countries prefer applicants with 3-5+ years of relevant work experience. Continue building your career in your field.',
      priority: 'medium'
    });
  }

  // Financial recommendation
  if (result.categoryScores.financial < 5) {
    recommendations.push({
      title: 'Improve Financial Position',
      description: 'Build up your savings and financial resources. Most visa applications require proof of funds ranging from $15,000 to $50,000 depending on the country.',
      priority: 'high'
    });
  }

  // Always add consultation recommendation
  recommendations.push({
    title: 'Book a Professional Consultation',
    description: 'Our expert advisors can provide personalized guidance, identify the best visa pathway for your profile, and help you prepare a strong application.',
    action: 'Book free consultation',
    priority: 'high'
  });

  // Sort by priority and return top 5
  return recommendations
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 5);
}
```

---

## 5. Result Display

### 5.1 Calculating Animation
**New File:** `src/components/calculator/CalculatingAnimation.tsx`

**Design:** 3-second animation with progressive messages
```tsx
const messages = [
  { text: "Analyzing your profile...", duration: 800 },
  { text: "Comparing with 10,000+ successful cases...", duration: 900 },
  { text: "Consulting immigration requirements...", duration: 700 },
  { text: "Generating personalized recommendations...", duration: 600 }
];

return (
  <div className="text-center py-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="inline-block mb-6"
    >
      <Calculator className="h-16 w-16 text-primary" />
    </motion.div>

    <AnimatePresence mode="wait">
      {/* Cycle through messages */}
    </AnimatePresence>
  </div>
);
```

### 5.2 Results Display Component
**New File:** `src/components/calculator/ResultsDisplay.tsx`

**Layout:**
```tsx
return (
  <div className="space-y-8">
    {/* Main Score Card */}
    <Card className="overflow-hidden relative">
      <div className={cn(
        "absolute inset-0 opacity-10",
        probability === 'high' && "bg-gradient-to-br from-green-500 to-emerald-500",
        probability === 'medium' && "bg-gradient-to-br from-yellow-500 to-orange-500",
        probability === 'low' && "bg-gradient-to-br from-red-500 to-rose-500"
      )} />

      <CardContent className="relative z-10 p-8 md:p-12 text-center">
        {/* Circular Progress */}
        <CircularProgress value={score} size={200} />

        {/* Probability Badge */}
        <Badge size="lg" className="mt-6">
          {probability === 'high' && <TrendingUp className="mr-2" />}
          {probability.toUpperCase()} PROBABILITY
        </Badge>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          {getResultTitle(probability)}
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground mt-2">
          {getResultDescription(probability, targetCountry)}
        </p>
      </CardContent>
    </Card>

    {/* Strengths & Weaknesses Grid */}
    <div className="grid md:grid-cols-2 gap-6">
      <StrengthsCard strengths={strengths} />
      <WeaknessesCard weaknesses={weaknesses} />
    </div>

    {/* Recommendations Card */}
    <RecommendationsCard recommendations={recommendations} />

    {/* CTA Card */}
    <CTACard probability={probability} />
  </div>
);
```

### 5.3 Circular Progress Component
**New File:** `src/components/calculator/CircularProgress.tsx`

**Implementation:**
```tsx
export function CircularProgress({ value, size = 200 }: Props) {
  const radius = (size - 24) / 2; // 24 = strokeWidth * 2
  const circumference = 2 * Math.PI * radius;

  const color = value >= 85 ? 'text-green-500' :
                value >= 60 ? 'text-yellow-500' :
                'text-red-500';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-muted"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * value / 100) }}
          transition={{ duration: 2, ease: "easeOut" }}
          className={color}
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-bold">
          <AnimatedCounter value={value} />
        </span>
      </div>
    </div>
  );
}
```

### 5.4 Result Copy by Probability

**High (85-100):**
- Title: "Excellent News! You're a Strong Candidate"
- Description: "Based on your profile, you have a high probability of visa approval for {country}. Your education, experience, and qualifications align well with immigration requirements."
- Celebration: Confetti animation (use `canvas-confetti` package)

**Medium (60-84):**
- Title: "Good Potential with Room for Improvement"
- Description: "You have a decent chance of visa approval for {country}, but strengthening certain areas could significantly improve your application success rate."
- Visual: Sparkle animation

**Low (0-59):**
- Title: "Let's Work Together to Strengthen Your Profile"
- Description: "While your current profile needs development, don't be discouraged! With strategic improvements and expert guidance, you can significantly enhance your visa chances."
- Visual: Supportive, calm animations

---

## 6. Copywriting & Translations

### 6.1 Add to `messages/en.json`

**Location:** After line 356 (end of file)

```json
{
  "visaCalculator": {
    "hero": {
      "badge": "Free Visa Assessment Tool",
      "title": "Discover Your Visa Probability in 5 Minutes",
      "subtitle": "Answer a few questions about your background and get personalized insights into your visa eligibility with expert recommendations",
      "trustIndicators": {
        "assessments": "50,000+ assessments completed",
        "accuracy": "98% accuracy rate",
        "expert": "Backed by immigration experts",
        "confidential": "100% confidential"
      }
    },
    "steps": {
      "personal": {
        "title": "Tell Us About Yourself",
        "description": "Let's start with your background and where you're planning to go",
        "label": "Personal"
      },
      "education": {
        "title": "Your Education & Career",
        "description": "Share your professional journey and qualifications",
        "label": "Education"
      },
      "qualifications": {
        "title": "Tests & Certifications",
        "description": "Tell us about your language tests and credentials",
        "label": "Tests"
      },
      "financial": {
        "title": "Financial Readiness",
        "description": "Almost there! Final details about your resources",
        "label": "Financial"
      }
    },
    "fields": {
      "currentCountry": "What's your current country of residence?",
      "citizenship": "What's your citizenship/nationality?",
      "targetCountry": "Which country are you planning to move to?",
      "age": "How old are you?",
      "maritalStatus": "What's your marital status?",
      "hasDependents": "Do you have dependents?",
      "dependentsCount": "How many dependents?",
      "educationLevel": "What's your highest level of education?",
      "fieldOfStudy": "What's your field of study?",
      "yearsOfExperience": "How many years of work experience do you have?",
      "workDomain": "What's your work domain/industry?",
      "employmentStatus": "What's your current employment status?",
      "annualIncome": "What's your annual income range?",
      "englishTest": "Have you taken an English proficiency test?",
      "englishScore": "What was your score?",
      "visaType": "What type of visa are you applying for?",
      "previousApplications": "Have you applied for a visa before?",
      "hasJobOffer": "Do you have a job offer in the target country?",
      "financialResources": "What are your available financial resources?",
      "timeline": "What's your expected timeline?",
      "hasFamilyInTarget": "Do you have family or friends in the target country?",
      "additionalInfo": "Any additional information? (optional)"
    },
    "placeholders": {
      "selectCountry": "Select your country...",
      "selectEducation": "Select education level...",
      "enterField": "e.g., Computer Science",
      "selectDomain": "Select your domain...",
      "selectTest": "IELTS, TOEFL, PTE, or None",
      "enterScore": "e.g., 7.5",
      "selectVisa": "Work, Study, Family, etc.",
      "additionalInfo": "Tell us anything else that might be relevant..."
    },
    "buttons": {
      "continue": "Continue",
      "back": "Back",
      "calculate": "Calculate My Chances",
      "calculating": "Calculating...",
      "startOver": "Start New Assessment",
      "downloadReport": "Download Full Report",
      "bookConsultation": "Book Free Consultation",
      "shareResults": "Share Results"
    },
    "results": {
      "calculating": {
        "title": "Calculating Your Results",
        "message1": "Analyzing your profile...",
        "message2": "Comparing with 10,000+ successful cases...",
        "message3": "Consulting immigration requirements...",
        "message4": "Generating personalized recommendations..."
      },
      "high": {
        "title": "Excellent News! You're a Strong Candidate",
        "description": "Based on your profile, you have a high probability of visa approval for {country}. Your education, experience, and qualifications align well with immigration requirements."
      },
      "medium": {
        "title": "Good Potential with Room for Improvement",
        "description": "You have a decent chance of visa approval for {country}, but strengthening certain areas could significantly improve your application success rate."
      },
      "low": {
        "title": "Let's Work Together to Strengthen Your Profile",
        "description": "While your current profile needs development, don't be discouraged! With strategic improvements and expert guidance, you can significantly enhance your visa chances."
      },
      "strengths": "Your Strengths",
      "weaknesses": "Areas to Improve",
      "recommendations": "Personalized Recommendations",
      "recommendationsSubtitle": "Expert advice to improve your visa chances",
      "nextSteps": "Ready to Start Your Journey?",
      "nextStepsDescription": "Book a free consultation with our expert immigration advisors to discuss your personalized pathway and improve your application success rate.",
      "emailCapture": {
        "title": "Get Your Detailed Report via Email",
        "description": "Receive a comprehensive PDF report with in-depth analysis, checklist, and timeline for your application process.",
        "placeholder": "your.email@example.com",
        "button": "Send Report",
        "privacy": "We respect your privacy. No spam, unsubscribe anytime."
      }
    },
    "disclaimer": "Disclaimer: This assessment provides an estimated probability based on general immigration criteria and does not guarantee visa approval. Actual outcomes depend on many factors including immigration policies, documentation quality, and individual circumstances. For accurate evaluation and application support, consult with our licensed immigration advisors."
  },
  "hero": {
    "visaCalculatorCta": "Check My Visa Chances"
  }
}
```

---

## 7. Additional Components

### 7.1 Benefits Section
**New File:** `src/components/calculator/BenefitsSection.tsx`

**Content:**
- "Why Use This Tool?" heading
- 4 benefit cards:
  - Instant Assessment
  - Expert-Backed Algorithm
  - Personalized Recommendations
  - 100% Free & Confidential

### 7.2 Calculator FAQ
**New File:** `src/components/calculator/CalculatorFAQ.tsx`

**Questions:**
1. "How accurate is this calculator?"
2. "Is my information secure?"
3. "Does this guarantee visa approval?"
4. "Can I save my results?"
5. "What should I do after getting my results?"

---

## 8. Technical Implementation Details

### 8.1 File Structure
```
src/
├── app/[locale]/visa-calculator/
│   └── page.tsx                          # Main page
├── components/calculator/
│   ├── VisaCalculatorWizard.tsx          # Main wizard
│   ├── CalculatorHeroSection.tsx         # Hero section
│   ├── ProgressIndicator.tsx             # Progress bar/stepper
│   ├── StepContent.tsx                   # Dynamic step renderer
│   ├── CalculatingAnimation.tsx          # Loading animation
│   ├── ResultsDisplay.tsx                # Results page
│   ├── CircularProgress.tsx              # Score gauge
│   ├── RecommendationsCard.tsx           # Recommendations
│   ├── BenefitsSection.tsx               # Why use tool
│   └── CalculatorFAQ.tsx                 # FAQ section
├── lib/calculator/
│   ├── scoring.ts                        # Scoring algorithm
│   ├── recommendations.ts                # Recommendation generator
│   └── utils.ts                          # Helper functions
└── lib/validations/
    └── calculator.ts                     # Zod validation schemas
```

### 8.2 State Management
Use React Context or local state (useState) since it's a simple wizard flow:

```typescript
const [currentStep, setCurrentStep] = useState(0);
const [formData, setFormData] = useState<Partial<CalculatorFormData>>({});
const [result, setResult] = useState<ScoringResult | null>(null);
const [isCalculating, setIsCalculating] = useState(false);
```

### 8.3 LocalStorage Persistence
Save progress after each step:
```typescript
useEffect(() => {
  if (formData && Object.keys(formData).length > 0) {
    localStorage.setItem('visaCalculatorData', JSON.stringify({
      formData,
      currentStep,
      timestamp: Date.now()
    }));
  }
}, [formData, currentStep]);
```

Restore on mount:
```typescript
useEffect(() => {
  const saved = localStorage.getItem('visaCalculatorData');
  if (saved) {
    const { formData, currentStep, timestamp } = JSON.parse(saved);
    // Only restore if less than 7 days old
    if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
      setFormData(formData);
      setCurrentStep(currentStep);
      toast.info('We restored your previous progress!');
    }
  }
}, []);
```

### 8.4 Animation Libraries
**Already available:**
- Framer Motion (for all animations)
- Existing AnimatedBackground component
- AnimatedCounter component (from HeroSection)

**New dependency (optional):**
- `canvas-confetti` for celebration effect on high scores

### 8.5 Form Pattern
Follow existing ApplicationForm.tsx patterns:
- React Hook Form with `useForm` hook
- Zod resolver: `zodResolver(step1Schema)`
- Form components: FormField, FormItem, FormLabel, FormControl, FormMessage
- Card-based layout with sections
- Toast notifications with Sonner

---

## 9. Responsive Design

### Mobile Optimizations:
- Progress indicator: Compact bar (not stepper)
- Form layout: Single column
- Button sizes: Full width on mobile
- Result cards: Stacked vertically
- Score gauge: Smaller size (150px vs 200px)

### Breakpoints:
```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {/* Content */}
</div>

<Button className="w-full sm:w-auto">
  Continue
</Button>
```

---

## 10. Engagement Features

### 10.1 Celebration for High Scores
```typescript
// In ResultsDisplay.tsx
import confetti from 'canvas-confetti';

useEffect(() => {
  if (probability === 'high') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}, [probability]);
```

### 10.2 Email Capture
Add email form in results page:
- Input field for email
- "Get Detailed Report" button
- Promise: PDF report with full breakdown
- Future enhancement: Actually generate and send PDF

### 10.3 Social Sharing (Optional)
- Share button for high scores
- Pre-filled message: "I just checked my visa chances with [Company]! Check yours at [URL]"
- Don't share actual scores (privacy)

---

## 11. Implementation Checklist

### Phase 1: Foundation
- [ ] Create `/visa-calculator` page route
- [ ] Build CalculatorHeroSection component
- [ ] Setup VisaCalculatorWizard component structure
- [ ] Create ProgressIndicator component
- [ ] Add translations to `messages/en.json`

### Phase 2: Form Steps
- [ ] Create Zod validation schemas for all 4 steps
- [ ] Build form fields for Step 1 (Personal)
- [ ] Build form fields for Step 2 (Education)
- [ ] Build form fields for Step 3 (Qualifications)
- [ ] Build form fields for Step 4 (Financial)
- [ ] Implement conditional field logic
- [ ] Add form navigation (Back/Next buttons)
- [ ] Implement localStorage persistence

### Phase 3: Scoring & Results
- [ ] Implement scoring algorithm in `scoring.ts`
- [ ] Create recommendations generator
- [ ] Build CalculatingAnimation component
- [ ] Create CircularProgress component
- [ ] Build ResultsDisplay component
- [ ] Add celebration animations for high scores

### Phase 4: Homepage Integration
- [ ] Add CTA button to HeroSection
- [ ] Add secondary CTA to CTASection
- [ ] Test navigation flow

### Phase 5: Polish
- [ ] Add Bengali translations (messages/bn.json)
- [ ] Optimize for mobile responsiveness
- [ ] Add accessibility features (ARIA labels)
- [ ] Implement email capture functionality
- [ ] Add BenefitsSection
- [ ] Add CalculatorFAQ
- [ ] Performance optimization
- [ ] User testing

---

## 12. Key Files to Modify

1. **src/components/sections/HeroSection.tsx** (line 207)
   - Add third CTA button for visa calculator

2. **src/components/sections/CTASection.tsx** (line 117)
   - Add/modify button for calculator

3. **messages/en.json** (line 356)
   - Add complete visaCalculator translation object

4. **messages/bn.json**
   - Add Bengali translations (future)

---

## 13. Disclaimers & Legal

**Disclaimer Text** (bottom of results page):
```
Disclaimer: This assessment provides an estimated probability based on
general immigration criteria and does not guarantee visa approval.
Actual outcomes depend on many factors including immigration policies,
documentation quality, and individual circumstances. For accurate
evaluation and application support, consult with our licensed
immigration advisors.
```

**Privacy Note:**
- Clarify that data is stored locally (localStorage)
- No personal data sent to server (unless email capture)
- GDPR/privacy policy compliance

---

## 14. Future Enhancements (Post-MVP)

- Backend API for more sophisticated scoring
- PDF report generation and email delivery
- Save results with user accounts
- A/B testing for copy and design variations
- Analytics tracking (Google Analytics events)
- Comparison with similar profiles
- Country-specific recommendations
- Multi-language support (beyond English/Bengali)
- Integration with CRM for lead management

---

## Summary

This plan provides a complete, production-ready approach for implementing a visa probability calculator feature that:

✅ Matches your existing design patterns and tech stack
✅ Uses frontend-only calculation (as requested)
✅ Implements multi-step wizard with progress bar (as requested)
✅ Provides personalized recommendations
✅ Serves as an effective lead generation tool
✅ Integrates seamlessly with your current site
✅ Follows best practices for UX, accessibility, and performance

The feature will help users assess their visa eligibility while positioning your consultancy as a tech-forward, user-centric service provider that guides clients through complex immigration decisions.
