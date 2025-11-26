import type { CalculatorFormData } from '@/lib/validations/calculator';
import type { ScoringResult } from './scoring';

export interface Recommendation {
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
      description:
        'IELTS, TOEFL, or PTE scores are mandatory for most visa applications. Aim for IELTS 7+ for the best chances.',
      action: 'Book IELTS test',
      priority: 'high',
    });
  } else if (data.englishScore && data.englishScore < 7) {
    recommendations.push({
      title: 'Improve Your English Test Score',
      description:
        'A higher English proficiency score (7.0+) can significantly improve your visa chances. Consider retaking the test after preparation.',
      action: 'Find IELTS preparation courses',
      priority: 'high',
    });
  }

  // Job offer recommendation
  if (data.hasJobOffer === 'no') {
    recommendations.push({
      title: 'Secure a Job Offer',
      description:
        'A valid job offer from an employer in your target country can significantly improve your visa chances and may open up employer-sponsored visa pathways.',
      action: 'Explore job opportunities',
      priority: 'high',
    });
  }

  // Education recommendation
  if (data.educationLevel === 'highSchool' || data.educationLevel === 'other') {
    recommendations.push({
      title: 'Consider Further Education',
      description:
        "Higher education qualifications (Bachelor's, Master's, or PhD) substantially increase your visa eligibility for most countries.",
      action: 'View study programs',
      priority: 'medium',
    });
  }

  // Work experience recommendation
  if (data.yearsOfExperience !== undefined && data.yearsOfExperience < 3) {
    recommendations.push({
      title: 'Gain More Work Experience',
      description:
        'Most countries prefer applicants with 3-5+ years of relevant work experience. Continue building your career in your field.',
      priority: 'medium',
    });
  }

  // Financial recommendation
  if (result.categoryScores.financial < 5) {
    recommendations.push({
      title: 'Improve Financial Position',
      description:
        'Build up your savings and financial resources. Most visa applications require proof of funds ranging from $15,000 to $50,000 depending on the country.',
      priority: 'high',
    });
  }

  // Previous visa refusals
  if (data.previousVisaApplications && data.previousRefusals && data.previousRefusals > 0) {
    recommendations.push({
      title: 'Address Previous Visa Refusals',
      description:
        'Previous refusals can impact new applications. Our advisors can help you understand the reasons and strengthen your new application accordingly.',
      action: 'Book consultation',
      priority: 'high',
    });
  }

  // Field of study recommendation
  const stemFields = ['computer science', 'engineering', 'medicine', 'healthcare', 'it', 'technology'];
  const isStem = data.fieldOfStudy
    ? stemFields.some((field) => data.fieldOfStudy.toLowerCase().includes(field))
    : false;

  if (!isStem && data.educationLevel !== 'highSchool') {
    recommendations.push({
      title: 'Highlight Transferable Skills',
      description:
        'While your field is valuable, emphasize how your skills meet labor market needs in your target country. Consider additional certifications in high-demand areas.',
      priority: 'low',
    });
  }

  // Age-related recommendation
  if (data.age !== undefined && data.age > 45) {
    recommendations.push({
      title: 'Explore Age-Flexible Visa Categories',
      description:
        'Some visa categories have age preferences. Our experts can guide you to pathways that value experience and expertise over age.',
      action: 'Book consultation',
      priority: 'medium',
    });
  }

  // Always add consultation recommendation
  recommendations.push({
    title: 'Book a Professional Consultation',
    description:
      'Our expert advisors can provide personalized guidance, identify the best visa pathway for your profile, and help you prepare a strong application.',
    action: 'Book free consultation',
    priority: 'high',
  });

  // Sort by priority and return top 5
  const priorityOrder: Record<'high' | 'medium' | 'low', number> = { high: 0, medium: 1, low: 2 };

  return recommendations
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 5);
}
