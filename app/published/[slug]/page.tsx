import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublishedNoteView } from '@/components/published/published-note-view'
import { getPublishedNote as getStoredPublishedNote } from '@/lib/published-store'

interface PublishedPageProps {
  params: Promise<{ slug: string }>
}

async function fetchPublished(slug: string) {
  const entry = await getStoredPublishedNote(slug)
  return entry || null
}

export async function generateMetadata({ params }: PublishedPageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await fetchPublished(slug)
  if (!note) {
    return {
      title: 'Published Note',
      description: 'A note published from Ink'
    }
  }
  return {
    title: note.publishSettings?.siteTitle || note.title,
    description: note.publishSettings?.siteDescription || `A note published from Ink - ${note.title}`,
    openGraph: {
      title: note.publishSettings?.siteTitle || note.title,
      description: note.publishSettings?.siteDescription || `A note published from Ink - ${note.title}`,
      type: 'article',
      url: note.publishedUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: note.publishSettings?.siteTitle || note.title,
      description: note.publishSettings?.siteDescription || `A note published from Ink - ${note.title}`,
    }
  }
}

export default async function PublishedPage({ params }: PublishedPageProps) {
  const { slug } = await params
  const note = await fetchPublished(slug)
  if (!note) notFound()
  return <PublishedNoteView note={note as any} />
}
