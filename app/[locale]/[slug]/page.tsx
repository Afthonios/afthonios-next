import { notFound } from 'next/navigation';
import { fetchPageContent } from '@/lib/content/fetchPage';
import FreeCoursePage from '@/components/pages/FreeCoursePage';
import React from 'react';

type PageComponentType = React.ComponentType<{ data: any; t?: any; locale: string }>;

const pageComponentMap: Record<string, PageComponentType> = {
  page_freecourse: FreeCoursePage,
};

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  let pageData;

  try {
    pageData = await fetchPageContent(slug, locale);
  } catch (error) {
    console.error('[Page] fetchPageContent error:', error);
    notFound();
  }

  if (!pageData) {
    notFound();
  }

  const { key, data, t } = pageData;

  const PageComponent = pageComponentMap[key];

  if (!PageComponent) {
    notFound();
  }

  return <PageComponent data={data} t={t} locale={locale} />;
}