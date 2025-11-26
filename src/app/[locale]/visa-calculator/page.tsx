import { Container } from '@/components/layout/Container';
import { CalculatorHeroSection } from '@/components/calculator/CalculatorHeroSection';
import { VisaCalculatorWizard } from '@/components/calculator/VisaCalculatorWizard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa Probability Calculator - My Journey',
  description:
    'Calculate your visa approval probability in 5 minutes. Get personalized recommendations from immigration experts.',
};

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function VisaCalculatorPage({ params }: PageProps) {
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
    </main>
  );
}
