import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Container } from './Container';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const t = useTranslations();
  const nav = useTranslations('navigation');
  const footer = useTranslations('footer');

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: nav('home'), href: '/' },
    { name: nav('about'), href: '/about' },
    { name: nav('services'), href: '/services' },
    { name: nav('contact'), href: '/contact' },
  ];

  const services = [
    { name: t('services.workVisa.title'), href: '/services#work-visa' },
    { name: t('services.studyAbroad.title'), href: '/services#study-abroad' },
    { name: t('services.familyMigration.title'), href: '/services#family' },
    { name: t('services.businessImmigration.title'), href: '/services#business' },
  ];

  const legal = [
    { name: footer('privacyPolicy'), href: '/privacy' },
    { name: footer('termsOfService'), href: '/terms' },
  ];

  const social = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="w-full border-t border-border bg-muted/50">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xl font-bold text-primary-foreground">
                    MJ
                  </span>
                </div>
                <span className="font-bold">{t('brand.name')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {footer('description')}
              </p>
              <div className="flex space-x-4">
                {social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">{footer('quickLinks')}</h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">{footer('services')}</h3>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Legal */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold">{nav('contact')}</h3>
                <address className="space-y-2 text-sm text-muted-foreground not-italic">
                  <p>123 Migration Street</p>
                  <p>Dhaka, Bangladesh</p>
                  <p>Phone: +880 1XXX-XXXXXX</p>
                  <p>Email: info@myjourney.com</p>
                </address>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold">{footer('legal')}</h3>
                <ul className="space-y-3">
                  {legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {t('brand.name')}. {footer('rights')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
