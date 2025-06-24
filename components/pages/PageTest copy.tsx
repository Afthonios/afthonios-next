// components/pages/PageTest.tsx

import React from 'react'

export default function PageTest({ data, t }: { data: any; t: any }) {
  return (
    <section>
      <h1>{t?.title ?? 'No title'}</h1>
      <h2>{t?.subtitle ?? 'No subtitle'}</h2>
      <p>{t?.intro_text ?? 'No intro'}</p>
    </section>
  )
}
