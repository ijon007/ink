"use client"

import { usePathname } from "next/navigation"

import { SidebarTrigger } from "../ui/sidebar"
import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import { Home, FileText } from "lucide-react"
import { cn, getIconColorClasses } from "@/lib/utils"
import { useNotesStore } from "@/lib/stores/notes-store"
import * as LucideIcons from 'lucide-react'
import { PublishDropdown } from "./publish-dropdown"
import Preview from "../notes/preview"

const PageBreadcrumb = () => {
    const pathname = usePathname()
    const { getNoteById } = useNotesStore()

    const breadcrumbItems = pathname.split('/').filter(Boolean).map((segment, index, array) => {
        const isLast = index === array.length - 1
        const href = `/${array.slice(0, index + 1).join('/')}`
        
        const isNoteId = array[0] === 'app' && index === 1 && segment !== 'app'
        let displayText = segment
        let icon = <FileText className="size-4" />
        
        if (segment === 'app') {
            displayText = 'Home'
            icon = <Home className="size-4" />
        } else if (isNoteId) {
            const note = getNoteById(segment)
            if (note) {
                displayText = note.title
                const IconComp = (LucideIcons as Record<string, any>)[note.icon] || FileText
                icon = <IconComp className={cn("size-4", getIconColorClasses(note.iconColor))} />
            }
        }

        return (
			<div key={index} className="flex flex-row items-center gap-1">
				<BreadcrumbItem className={cn(isLast && 'cursor-default')}>
					<BreadcrumbLink href={href} className="flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-300 hover:bg-neutral-200/30">
						{icon}
						<BreadcrumbPage className="text-sm">{displayText}</BreadcrumbPage>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{!isLast && (
					<BreadcrumbSeparator />
				)}
			</div>
        )
    })

    return (
        <header className="flex flex-row justify-between h-10 shrink-0 items-center gap-2 px-2 mt-1">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					className="mr-2 data-[orientation=vertical]:h-4"
					orientation="vertical"
				/>
				<Breadcrumb>
					<BreadcrumbList className="gap-1">
						{breadcrumbItems}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex flex-row items-center gap-2">
				{pathname.includes('app') && pathname !== '/app' && (() => {
					const noteIdMatch = pathname.match(/\/app\/(.+)/)
					const noteId = noteIdMatch?.[1]
					return noteId ? <Preview noteId={noteId} /> : null
				})()}
				{pathname.includes('app') && pathname !== '/app' && (() => {
					const noteIdMatch = pathname.match(/\/app\/(.+)/)
					const noteId = noteIdMatch?.[1]
					return noteId ? <PublishDropdown noteId={noteId} /> : null
				})()}
			</div>
        </header>
    )
}
export default PageBreadcrumb