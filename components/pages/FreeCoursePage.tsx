import React from 'react';

export default function FreeCoursePage({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) {
  // Das richtige Translation-Objekt finden (z. B. "fr" oder "en")
  const t = Array.isArray(data.translations)
    ? data.translations.find((tr: any) => tr.languages_code === locale)
    : undefined;

  console.log('FreeCoursePage locale:', locale);
  console.log('Translation object:', t);

  const title = t?.title || data.main_title || 'Kein Titel gefunden';
  const subtitle = t?.subtitle;

  // Falls gar keine Übersetzung: Fallback auf main_title
  return (
    <div className="p-8 border border-blue-300">
      <div className="mb-4 text-sm text-blue-700">[FreeCoursePage Test OK]</div>
      <img
        src={
          data.hero_image_id
            ? `https://res.cloudinary.com/djiqjc1ui/image/upload/q_auto,w_1200/${data.hero_image_id}`
            : undefined
        }
        alt={t?.title ?? ''}
        className="w-full mb-6 rounded-lg"
      />
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-500 italic">Locale: {locale}</p>
      {subtitle && <p className="mt-4 text-lg">{subtitle}</p>}
    </div>
  );
}