"use client"

import { useEffect, useMemo, useState } from "react"
import { Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { useNotesStore } from "@/lib/stores/notes-store"
import { ICON_MAP } from "@/lib/icons"
import { getIconColorClasses } from "@/lib/utils"

type PlateNode = any

const loadLocalContent = (noteId: string): PlateNode[] | null => {
    try {
        const raw = localStorage.getItem(`note-content-${noteId}`)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

const Preview = ({ noteId }: { noteId: string }) => {
    const notes = useNotesStore(s => s.notes)
    const { getNoteById } = useNotesStore()
    const [content, setContent] = useState<PlateNode[]>([])
    const currentNote = useMemo(() => notes.find(n => n.id === noteId), [notes, noteId])

    useEffect(() => {
        if (!noteId) return

        // Prefer latest local content saved by the editor
        const local = loadLocalContent(noteId)
        if (local && Array.isArray(local)) {
            setContent(local)
            return
        }

        const note = getNoteById(noteId)
        if (note?.content && note.content !== 'Start writing your note here...') {
            try {
                const parsed = JSON.parse(note.content)
                if (Array.isArray(parsed)) setContent(parsed)
                else setContent([])
            } catch {
                // Treat raw string content as a simple paragraph
                setContent([
                    { type: 'p', children: [{ text: note.content }] }
                ])
            }
        } else {
            setContent([])
        }
    }, [noteId, getNoteById])

    // Keep preview in sync with the store (near-instant updates while typing)
    useEffect(() => {
        if (!currentNote) return
        if (currentNote.content && currentNote.content !== 'Start writing your note here...') {
            try {
                const parsed = JSON.parse(currentNote.content)
                if (Array.isArray(parsed)) setContent(parsed)
            } catch {
                setContent([{ type: 'p', children: [{ text: currentNote.content }] }])
            }
        }
    }, [currentNote?.content])

    const renderTextChildren = (children: any[] = []) => {
        return children.map((child, idx) => {
            if (child.bold) return <strong key={idx}>{child.text}</strong>
            if (child.italic) return <em key={idx}>{child.text}</em>
            if (child.underline) return <u key={idx}>{child.text}</u>
            if (child.code) return <code key={idx} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{child.text}</code>
            return <span key={idx}>{child.text}</span>
        })
    }

    const renderNode = (node: any, index: number): React.ReactNode => {
        switch (node.type) {
            case 'p':
                return <p key={index} className="mb-4">{renderTextChildren(node.children)}</p>
            case 'h1':
                return <h1 key={index} className="text-3xl font-bold mb-4 mt-6">{node.children?.[0]?.text}</h1>
            case 'h2':
                return <h2 key={index} className="text-2xl font-bold mb-3 mt-5">{node.children?.[0]?.text}</h2>
            case 'h3':
                return <h3 key={index} className="text-xl font-bold mb-2 mt-4">{node.children?.[0]?.text}</h3>
            case 'ul':
                return (
                    <ul key={index} className="list-disc list-inside mb-4 ml-4">
                        {node.children?.map((item: any, i: number) => (
                            <li key={i}>{item.children?.[0]?.text}</li>
                        ))}
                    </ul>
                )
            case 'ol':
                return (
                    <ol key={index} className="list-decimal list-inside mb-4 ml-4">
                        {node.children?.map((item: any, i: number) => (
                            <li key={i}>{item.children?.[0]?.text}</li>
                        ))}
                    </ol>
                )
            case 'blockquote':
                return (
                    <blockquote key={index} className="border-l-4 border-muted pl-4 py-2 mb-4 italic">
                        {node.children?.[0]?.text}
                    </blockquote>
                )
            case 'code_block':
                return (
                    <pre key={index} className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                        <code className="text-sm font-mono">{node.children?.[0]?.text}</code>
                    </pre>
                )
            // Form elements rendered as normal HTML controls
            case 'form-input': {
                const label = node.label || 'Text Input'
                const placeholder = node.placeholder || 'Enter text...'
                const required = !!node.required
                const inputId = `form-input-${node.id || index}`
                return (
                    <div key={index} className="my-4">
                        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
                            {label}{required ? ' *' : ''}
                        </label>
                        <input id={inputId} className="w-full border rounded px-3 py-2"
                            placeholder={placeholder} required={required} />
                    </div>
                )
            }
            case 'form-textarea': {
                const label = node.label || 'Text Area'
                const placeholder = node.placeholder || 'Enter text...'
                const required = !!node.required
                const rows = node.rows || 4
                const inputId = `form-textarea-${node.id || index}`
                return (
                    <div key={index} className="my-4">
                        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
                            {label}{required ? ' *' : ''}
                        </label>
                        <textarea id={inputId} className="w-full border rounded px-3 py-2"
                            placeholder={placeholder} required={required} rows={rows} />
                    </div>
                )
            }
            case 'form-checkbox': {
                const label = node.label || 'Checkbox'
                const required = !!node.required
                const checked = !!node.checked
                const inputId = `form-checkbox-${node.id || index}`
                return (
                    <div key={index} className="my-4 flex items-center gap-2">
                        <input id={inputId} type="checkbox" className="h-4 w-4" defaultChecked={checked} required={required} />
                        <label htmlFor={inputId} className="text-sm font-medium">{label}{required ? ' *' : ''}</label>
                    </div>
                )
            }
            case 'form-multiple-choice': {
                const label = node.label || 'Multiple Choice'
                const required = !!node.required
                const options: string[] = Array.isArray(node.options) ? node.options : ['Option 1', 'Option 2']
                const name = `form-mc-${node.id || index}`
                return (
                    <fieldset key={index} className="my-4">
                        <legend className="block text-sm font-medium mb-2">{label}{required ? ' *' : ''}</legend>
                        <div className="space-y-2">
                            {options.map((opt, i) => {
                                const optId = `${name}-${i}`
                                return (
                                    <div key={i} className="flex items-center gap-2">
                                        <input id={optId} name={name} type="radio" value={opt} required={required} />
                                        <label htmlFor={optId} className="text-sm">{opt}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </fieldset>
                )
            }
            case 'form-date-picker': {
                const label = node.label || 'Date'
                const required = !!node.required
                const inputId = `form-date-${node.id || index}`
                return (
                    <div key={index} className="my-4">
                        <label htmlFor={inputId} className="block text-sm font-medium mb-1">{label}{required ? ' *' : ''}</label>
                        <input id={inputId} type="date" className="border rounded px-3 py-2" required={required} />
                    </div>
                )
            }
            default:
                return null
        }
    }

    const rendered = useMemo(() => content.map((n, i) => renderNode(n, i)), [content])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex flex-row items-center gap-2">
                    <Eye className="size-3" />
                    <span>Preview</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-1/2">
                <DialogHeader>
                    <DialogTitle className="text-sm">Page Preview</DialogTitle>
                </DialogHeader>
                <div className="px-1 pb-3">
                    <div className="flex items-center gap-2">
                        {(() => {
                            const IconComp = ICON_MAP[currentNote?.icon || 'FileText'] || ICON_MAP['FileText']
                            const colorClass = getIconColorClasses(currentNote?.iconColor || 'gray')
                            return <IconComp className={`h-6 w-6 ${colorClass}`} />
                        })()}
                        <h2 className="text-xl font-semibold">
                            {currentNote?.title || 'Untitled Note'}
                        </h2>
                    </div>
                </div>
                <div className="w-full max-h-[70vh] overflow-y-auto px-1">
                    {content.length === 0 ? (
                        <p className="text-muted-foreground">No content to preview.</p>
                    ) : (
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            {rendered}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Preview