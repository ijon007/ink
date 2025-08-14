"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Share } from "lucide-react"
import { useNotesStore, type PublishSettings } from "@/lib/stores/notes-store"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { SharePanel } from "./share-panel"
import { PublishPanel } from "./publish-panel"

interface PublishDropdownProps {
  noteId: string
}

export function PublishDropdown({ noteId }: PublishDropdownProps) {
  const { getNoteById, publishNote, unpublishNote } = useNotesStore()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishSettings, setPublishSettings] = useState<PublishSettings>({
    showLastUpdated: true,
    editable: false
  })

  const note = getNoteById(noteId)

  if (!note) return null

  const handlePublish = async () => {
    setIsPublishing(true)
    
    try {
      await publishNote(noteId, publishSettings)
      
      toast.success("Site published successfully!", {
        description: "Your note is now live on the web."
      })
    } catch (error) {
      toast.error("Publishing failed", {
        description: "There was an error publishing your site. Please try again."
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleUnpublish = async () => {
    try {
      await unpublishNote(noteId)
      toast.success("Site unpublished", {
        description: "Your note is no longer public."
      })
    } catch (error) {
      toast.error("Failed to unpublish", {
        description: "There was an error unpublishing your site. Please try again."
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard", {
        description: "URL has been copied to your clipboard."
      })
    } catch (error) {
      toast.error("Failed to copy", {
        description: "Could not copy to clipboard."
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="flex flex-row items-center gap-2">
            <Share className="size-3" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[500px] overflow-y-auto py-2">
          <div className="px-2">
            <Tabs defaultValue="share" className="w-full">
              <TabsList>
                <TabsTrigger value="share" className="cursor-pointer">Share Note</TabsTrigger>
                <TabsTrigger value="publish" className="cursor-pointer">Publish</TabsTrigger>
              </TabsList>

              <TabsContent value="share" className="mt-2">
                <SharePanel publishedUrl={note.publishedUrl} onCopyUrl={copyToClipboard} />
              </TabsContent>

              <TabsContent value="publish" className="mt-2">
                <PublishPanel
                  publishSettings={publishSettings}
                  setPublishSettings={setPublishSettings}
                  isPublished={note.isPublished}
                  isPublishing={isPublishing}
                  onPublish={handlePublish}
                  onUnpublish={handleUnpublish}
                  onOpen={() => note.publishedUrl && window.open(note.publishedUrl, '_blank')}
                  title={note.title}
                  icon={note.icon}
                  iconColor={note.iconColor}
                  content={note.content}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
