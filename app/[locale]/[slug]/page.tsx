import { notFound } from 'next/navigation';
import { fetchPageContent } from '@/lib/content/fetchPage';
import FreeCoursePage from '@/components/pages/FreeCoursePage';
import React from 'react';

type PageComponentType = React.ComponentType<{ data: any; locale: string }>;

const pageComponentMap: Record<string, PageComponentType> = {
  page_freecourse: FreeCoursePage,
};

// --- The Page Component ---
export default async function Page(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  let pageData;

  try {
    pageData = await fetchPageContent(slug, locale);
  } catch (error) {
    console.error(error);
    notFound();
  }
  
  const { key, data } = pageData;

  const PageComponent = pageComponentMap[key];

  if (!PageComponent) {
    notFound();
  }

  // Dynamically select and render the page component based on Directus key.
  return <PageComponent data={data} locale={locale} />;
}