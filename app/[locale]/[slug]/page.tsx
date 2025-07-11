import { notFound } from 'next/navigation'
import FreeCoursePage from '@/components/pages/FreeCoursePage'
import PageTest from '@/components/pages/PageTest'
import { fetchPageContent } from '@/lib/content/fetchPage'
import React from 'react'

type PageComponent = React.ComponentType<{ data: any; t?: any; locale: string }>

const pageComponentMap: Record<string, PageComponent> = {
  page_freecourse: FreeCoursePage,
  page_test: PageTest,
}

// The warning in your console suggests your Next.js setup might expect `params` to be a Promise.
// Reverting to the `await params` pattern to resolve the warning.
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  let pageData

  try {
    pageData = await fetchPageContent(slug, locale)
  } catch (error) {
    console.error(`Error fetching page content for slug "${slug}" and locale "${locale}":`, error)
    notFound()
  }

  if (!pageData) {
    notFound()
  }

  const { key, data, t } = pageData
  const Component = pageComponentMap[key]

  if (!Component) {
    console.error(`[Page] No component found for page key: "${key}"`)
    notFound()
  }
  
  console.log('🧪 t-object being passed to component:', t)
  
  return <Component data={data} t={t} locale={locale} />
}
