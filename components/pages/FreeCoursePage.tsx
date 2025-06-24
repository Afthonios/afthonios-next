import React from 'react'

// Funktion um Cloudinary-Bilder korrekt zu bauen
function cloudinary(publicId: string, opts = 'q_auto,w_1200') {
  return publicId
    ? `https://res.cloudinary.com/djiqjc1ui/image/upload/${opts}/${publicId}.jpg`
    : ''
}

export default function FreeCoursePage({
  data,
  t,
  locale,
}: {
  data: any
  t?: { title?: string; subtitle?: string; intro_text?: string }
  locale: string
}) {
  const title = t?.title || data.main_title || 'Kein Titel'
  const subtitle = t?.subtitle
  const intro = t?.intro_text

  return (
    <section className="p-8 max-w-2xl mx-auto">
      {data.hero_image_id && (
        <img
          src={cloudinary(data.hero_image_id)}
          alt={title}
          className="w-full mb-6 rounded-lg"
        />
      )}
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && <p className="mt-4 text-lg">{subtitle}</p>}
      {intro && (
        <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: intro }} />
      )}
      <p className="mt-4 text-sm italic text-gray-500">
        Slug: {data.slug ?? '–'} – Locale: {locale}
      </p>
    </section>
  )
}