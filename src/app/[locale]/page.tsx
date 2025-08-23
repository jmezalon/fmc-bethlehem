import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main>
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('welcome')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to FMC Bethlehem - Your community church
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
