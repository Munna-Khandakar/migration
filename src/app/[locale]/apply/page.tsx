import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { ApplicationForm } from '@/components/forms/ApplicationForm';

export default function ApplyPage() {
  const t = useTranslations('form');

  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {t('title')}
              </h1>
              <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
            </div>

            <ApplicationForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
