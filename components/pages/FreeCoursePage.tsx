import { cloudinaryUrl } from '@/lib/cloudinary';

type FreeCourseData = {
  title: string;
  subtitle: string;
  hero_image_id: string;
  translations?: { title: string; subtitle: string; languages_code: string }[];
  main_title?: string;
};

export default function FreeCoursePage({
  data,
  locale,
}: {
  data: FreeCourseData;
  locale: string;
}) {
  const imageUrl = cloudinaryUrl(data.hero_image_id, 'q_auto,w_1200');
  const t = data.translations?.find((tr) => tr.languages_code === locale);
  console.log('FreeCoursePage data:', { data, locale, t });

  return (
    <div className="p-8 border border-blue-300">
      <div className="mb-4 text-sm text-blue-700">[FreeCoursePage Test OK]</div>
      <img src={imageUrl} alt={t?.title ?? ''} className="w-full mb-6 rounded-lg" />
      <h1 className="text-4xl font-bold">{t?.title ?? data.title ?? data.main_title ?? 'Kein Titel gefunden'}</h1>
      <p className="mt-2 text-gray-500 italic">Locale: {locale}</p>
      {t?.subtitle && <p className="mt-4 text-lg">{t.subtitle}</p>}
    </div>
  );
}
