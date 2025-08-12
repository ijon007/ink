'use client'

import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Calendar, MessageCircle, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface PublishedNote {
  id: string
  title: string
  content: string
  publishSettings?: {
    siteTitle: string
    siteDescription: string
    allowComments: boolean
    showLastUpdated: boolean
    customCSS: string
  }
  updatedAt: string
  publishedUrl: string
}

interface PublishedNoteViewProps {
  note: PublishedNote
}

export function PublishedNoteView({ note }: PublishedNoteViewProps) {
  const content = useMemo(() => {
    try {
      return JSON.parse(note.content)
    } catch (error) {
      console.error('Failed to parse note content:', error)
      return [
        {
          type: 'p',
          children: [{ text: note.content || 'No content available.' }]
        }
      ]
    }
  }, [note.content])

  const renderContent = (content: any[]): React.ReactNode => {
    return content.map((node, index) => {
      if (node.type === 'p') {
        return (
          <p key={index} className="mb-4">
            {node.children?.map((child: any, childIndex: number) => {
              if (child.bold) {
                return <strong key={childIndex}>{child.text}</strong>
              }
              if (child.italic) {
                return <em key={childIndex}>{child.text}</em>
              }
              if (child.underline) {
                return <u key={childIndex}>{child.text}</u>
              }
              if (child.code) {
                return <code key={childIndex} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{child.text}</code>
              }
              return <span key={childIndex}>{child.text}</span>
            })}
          </p>
        )
      }
      if (node.type === 'h1') {
        return <h1 key={index} className="text-3xl font-bold mb-4 mt-6">{node.children?.[0]?.text}</h1>
      }
      if (node.type === 'h2') {
        return <h2 key={index} className="text-2xl font-bold mb-3 mt-5">{node.children?.[0]?.text}</h2>
      }
      if (node.type === 'h3') {
        return <h3 key={index} className="text-xl font-bold mb-2 mt-4">{node.children?.[0]?.text}</h3>
      }
      if (node.type === 'ul') {
        return (
          <ul key={index} className="list-disc list-inside mb-4 ml-4">
            {node.children?.map((item: any, itemIndex: number) => (
              <li key={itemIndex}>{item.children?.[0]?.text}</li>
            ))}
          </ul>
        )
      }
      if (node.type === 'ol') {
        return (
          <ol key={index} className="list-decimal list-inside mb-4 ml-4">
            {node.children?.map((item: any, itemIndex: number) => (
              <li key={itemIndex}>{item.children?.[0]?.text}</li>
            ))}
          </ol>
        )
      }
      if (node.type === 'blockquote') {
        return (
          <blockquote key={index} className="border-l-4 border-muted pl-4 py-2 mb-4 italic">
            {node.children?.[0]?.text}
          </blockquote>
        )
      }
      if (node.type === 'code_block') {
        return (
          <pre key={index} className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm font-mono">{node.children?.[0]?.text}</code>
          </pre>
        )
      }
      return null
    })
  }

  const customStyles = note.publishSettings?.customCSS ? (
    <style dangerouslySetInnerHTML={{ __html: note.publishSettings.customCSS }} />
  ) : null

  return (
    <div className="min-h-screen bg-background">
      {customStyles}
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {note.publishSettings?.siteTitle || note.title}
              </h1>
              {note.publishSettings?.siteDescription && (
                <p className="text-muted-foreground text-lg">
                  {note.publishSettings.siteDescription}
                </p>
              )}
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Published
            </Badge>
          </div>
          
          {note.publishSettings?.showLastUpdated && (
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Last updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="min-h-[400px] w-full">
            {renderContent(content)}
          </div>
        </article>
      </main>

      {/* Comments Section */}
      {note.publishSettings?.allowComments && (
        <section className="border-t bg-card/30">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Comments</h2>
            </div>
            
            <div className="rounded-lg border bg-card p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Comments functionality would be implemented here.
                <br />
                This could integrate with services like Disqus, Utterances, or a custom solution.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Published with Ink</p>
            <a 
              href="/" 
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create your own →
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
