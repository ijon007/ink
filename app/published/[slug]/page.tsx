import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublishedNoteView } from '@/components/published/published-note-view'

interface PublishedPageProps {
  params: Promise<{ slug: string }>
}

// This would typically fetch from a database
async function getPublishedNote(slug: string) {
  // For demo purposes, we'll simulate fetching from localStorage on the server
  // In a real implementation, this would be a database query
  
  // Extract noteId from slug (format: title-slug-noteId)
  const parts = slug.split('-')
  const noteId = parts[parts.length - 1]
  
  // This is a mock - in reality you'd fetch from your database
  return {
    id: noteId,
    title: "Sample Published Note",
    content: JSON.stringify([
      {
        type: 'p',
        children: [{ text: 'This is a published note! The content would come from your database.' }]
      }
    ]),
    publishSettings: {
      siteTitle: "Sample Published Note",
      siteDescription: "A note published from Ink",
      allowComments: true,
      showLastUpdated: true,
      customCSS: ""
    },
    updatedAt: new Date().toISOString(),
    publishedUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/published/${slug}`
  }
}

export async function generateMetadata({ params }: PublishedPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const note = await getPublishedNote(slug)
    
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
  } catch (error) {
    return {
      title: 'Published Note',
      description: 'A note published from Ink'
    }
  }
}

export default async function PublishedPage({ params }: PublishedPageProps) {
  const { slug } = await params
  
  try {
    const note = await getPublishedNote(slug)
    return <PublishedNoteView note={note} />
  } catch (error) {
    notFound()
  }
}
