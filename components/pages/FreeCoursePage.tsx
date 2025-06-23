import React from 'react';

function cloudinaryUrl(publicId: string, options = 'q_auto,w_1200') {
  return publicId
    ? `https://res.cloudinary.com/djiqjc1ui/image/upload/${options}/${publicId}.jpg`
    : '';
}

export default function FreeCoursePage({
  data,
  t,
  locale,
}: {
  data: any;
  t?: any;
  locale: string;
}) {
  return (
    <section className="p-8 max-w-2xl mx-auto">
      {data.hero_image_id && (
        <img
          src={cloudinaryUrl(data.hero_image_id)}
          alt={t?.title || data.main_title || 'Hero'}
          className="w-full mb-6 rounded-lg"
        />
      )}
      <h1 className="text-4xl font-bold">{t?.title ?? data.main_title ?? 'No title'}</h1>
      {t?.subtitle && <p className="mt-4 text-lg">{t.subtitle}</p>}
      {t?.intro_text && <div className="mt-6 text-base">{t.intro_text}</div>}
      {data.slug && <div className="mt-2 text-sm italic text-gray-500">Slug: {data.slug}</div>}
      <div className="mt-2 text-xs text-gray-400">Locale: {locale}</div>
    </section>
  );
}