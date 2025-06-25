import { useTranslations } from 'next-intl';

export default function TestPage() {
  const t = useTranslations('TestPage');

  return (
    <h1 style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      {t('title')}
    </h1>
  );
}