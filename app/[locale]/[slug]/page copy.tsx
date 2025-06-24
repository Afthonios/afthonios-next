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
    console.error('fetchPageContent error', error)
    notFound()
  }

  if (!pageData) notFound()

  const { key, data, t } = pageData
  const Component = pageComponentMap[key]

  if (!Component) {
    console.error('No component for:', key)
    notFound()
  }
  console.log('🧪 t-object', t)
  return <Component data={data} t={t} locale={locale} />
}