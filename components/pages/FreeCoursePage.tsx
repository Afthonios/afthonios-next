import React from 'react'

// Define a type for the translation object
type Translation = {
  title: string
  subtitle: string
  intro_text: string
  label_course_heading?: string
  label_course_title?: string
  label_course_summary?: string
  label_course_duration?: string
  label_course_public?: string
  availability_notice?: string
  cta_label?: string
  more_links_heading?: string
  more_links_text?: string
  how_it_works_heading?: string
  how_it_works?: string
}

// Define the props type
interface FreeCoursePageProps {
  data: any
  t?: Translation
  locale: string
}

// Funktion um Cloudinary-Bilder korrekt zu bauen
function cloudinary(publicId: string, opts = 'q_auto,w_1200') {
  return publicId
    ? `https://res.cloudinary.com/djiqjc1ui/image/upload/${opts}/${publicId}.jpg`
    : ''
}

export default function FreeCoursePage({ data, t, locale }: FreeCoursePageProps) {
  return (
    <section className="p-8 max-w-2xl mx-auto">
      {data.hero_image_id && (
        <img
          src={cloudinary(data.hero_image_id)}
          alt={t?.title ?? data.main_title ?? 'Kein Titel'}
          className="w-full mb-6 rounded-lg"
        />
      )}

      <h1 className="text-4xl font-bold">{t?.title ?? data.main_title ?? 'No title'}</h1>
      <h2 className="mt-4 text-xl">{t?.subtitle ?? 'No subtitle'}</h2>
      
      <div
        className="prose mt-6"
        dangerouslySetInnerHTML={{
          __html: t?.intro_text ?? '<p>No intro provided.</p>',
        }}
      />
      <div className="mt-6 space-y-2">
        {[
          { key: 'label_course_heading',  label: 'Course Heading' },
          { key: 'label_course_title',    label: 'Course Title' },
          { key: 'label_course_summary',  label: 'Course Summary' },
          { key: 'label_course_duration', label: 'Course Duration' },
          { key: 'label_course_public',   label: 'Course Public' },
          { key: 'availability_notice',   label: 'Availability Notice' },
          { key: 'cta_label',             label: 'CTA Label' },
          { key: 'more_links_heading',    label: 'More Links Heading' },
          { key: 'more_links_text',       label: 'More Links Text' },
          { key: 'how_it_works_heading',  label: 'How It Works Heading' },
          { key: 'how_it_works',          label: 'How It Works' },
        ].map(({ key, label }) => (
          <p key={key}>
            <strong>{label}:</strong> {(t as any)?.[key] ?? '–'}
          </p>
        ))}
      </div>
    </section>
  )
}