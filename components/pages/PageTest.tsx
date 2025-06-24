import React from 'react'

// Define a type for the translation object for better self-documentation and type safety.
type Translation = {
  title: string;
  subtitle: string;
  intro_text: string;
}

// Define the props type for the component. 
// 't' can be undefined if no translation is found for the given locale.
interface PageTestProps {
  data: any;
  t: Translation | undefined;
}

export default function PageTest({ data, t }: PageTestProps) {
  return (
    <section>
      {/*
        Using optional chaining (?.) and the nullish coalescing operator (??)
        provides a graceful fallback if the 't' object is undefined or null.
      */}
      <h1>{t?.title ?? 'No title'}</h1>
      <h2>{t?.subtitle ?? 'No subtitle'}</h2>

      {/*
        If 'intro_text' from the CMS can contain HTML, using dangerouslySetInnerHTML
        is the correct way to render it.
      */}
      <div dangerouslySetInnerHTML={{ __html: t?.intro_text ?? '<p>No text provided.</p>' }} />
    </section>
  )
}
