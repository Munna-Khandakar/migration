import type { CalculatorFormData } from '@/lib/validations/calculator';

export interface ScoringResult {
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

  // Age scoring (10 points)
  if (data.age !== undefined) {
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
  }

  // Target country (10 points)
  const highDemandCountries = ['canada', 'australia', 'new zealand', 'germany', 'uk'];
  if (data.targetCountry && highDemandCountries.some(country => data.targetCountry.toLowerCase().includes(country))) {
    personalScore += 10;
  } else if (data.targetCountry) {
    personalScore += 7;
  }

  // Dependents (5 points)
  if (!data.hasDependents || (data.dependentsCount && data.dependentsCount <= 2)) {
    personalScore += 5;
  } else {
    personalScore += 2;
    weaknesses.push('Multiple dependents may complicate application');
  }

  // Current location (5 points) - base points
  personalScore += 5;

  // Education & Work (35 points max)

  // Education level (15 points)
  const educationPoints: Record<string, number> = {
    phd: 15,
    master: 12,
    bachelor: 9,
    highSchool: 5,
    other: 3,
  };
  educationScore += educationPoints[data.educationLevel] || 5;

  if (data.educationLevel === 'phd' || data.educationLevel === 'master') {
    strengths.push('Strong educational background');
  } else if (data.educationLevel === 'highSchool' || data.educationLevel === 'other') {
    weaknesses.push('Higher education would strengthen your profile');
  }

  // Field of study (10 points)
  const stemFields = ['computer science', 'engineering', 'medicine', 'healthcare', 'it', 'technology', 'science', 'data'];
  const isStem = data.fieldOfStudy
    ? stemFields.some((field) => data.fieldOfStudy.toLowerCase().includes(field))
    : false;

  if (isStem) {
    educationScore += 10;
    strengths.push('In-demand field of study (STEM)');
  } else if (data.fieldOfStudy) {
    educationScore += 6;
  }

  // Work experience (10 points)
  if (data.yearsOfExperience !== undefined) {
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
  }

  // Qualifications (25 points max)

  // English test (15 points)
  if (data.englishTest !== 'none' && data.englishScore) {
    if (data.englishScore >= 7.5) {
      qualificationScore += 15;
      strengths.push('Excellent English proficiency');
    } else if (data.englishScore >= 6.5) {
      qualificationScore += 12;
      strengths.push('Very good English proficiency');
    } else if (data.englishScore >= 6) {
      qualificationScore += 10;
      strengths.push('Good English proficiency');
    } else {
      qualificationScore += 5;
      weaknesses.push('Improving English test score would help');
    }
  } else if (data.englishTest !== 'none' && !data.englishScore) {
    // If they selected a test but didn't provide score, give moderate points
    qualificationScore += 7;
  } else {
    qualificationScore += 0;
    weaknesses.push('English language test required for most visas');
  }

  // Previous visa applications
  if (data.previousVisaApplications) {
    if (data.previousApprovals && data.previousApprovals > 0) {
      // Previous approvals add points (up to 5)
      const approvalPoints = Math.min(data.previousApprovals * 2, 5);
      qualificationScore += approvalPoints;
      strengths.push('Positive previous visa history');
    }

    if (data.previousRefusals && data.previousRefusals > 0) {
      // Previous refusals reduce total score slightly
      const refusalPenalty = Math.min(data.previousRefusals * 2, 5);
      qualificationScore -= refusalPenalty;
      if (data.previousRefusals > 1) {
        weaknesses.push('Multiple visa refusals may need addressing');
      }
    }
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

  const financialRanges: Record<string, number> = {
    '50k+': 6,
    '30k-50k': 4,
    '15k-30k': 3,
    '5k-15k': 2,
    '<5k': 1,
  };

  financialScore += financialRanges[data.financialResources] || 3;

  // Timeline flexibility (4 points)
  if (data.timeline === 'flexible' || data.timeline === '1-2years') {
    financialScore += 4;
  } else if (data.timeline === '6-12months') {
    financialScore += 3;
  } else {
    financialScore += 2;
  }

  if (data.financialResources === '50k+' || data.financialResources === '30k-50k') {
    strengths.push('Strong financial position');
  } else if (data.financialResources === '<5k' || data.financialResources === '5k-15k') {
    weaknesses.push('Financial resources may need improvement');
  }

  // Calculate total (max 100 points)
  const totalScore = Math.min(
    personalScore + educationScore + qualificationScore + financialScore,
    100
  );

  // Determine probability level
  let probability: 'high' | 'medium' | 'low';
  if (totalScore >= 85) {
    probability = 'high';
  } else if (totalScore >= 60) {
    probability = 'medium';
  } else {
    probability = 'low';
  }

  return {
    totalScore,
    probability,
    categoryScores: {
      personal: personalScore,
      education: educationScore,
      qualifications: Math.max(qualificationScore, 0), // Ensure non-negative
      financial: financialScore,
    },
    strengths,
    weaknesses,
  };
}
