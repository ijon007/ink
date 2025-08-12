"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Share, Globe, Copy, ExternalLink, Settings, Eye, Trash2 } from "lucide-react"
import { useNotesStore, type PublishSettings } from "@/lib/stores/notes-store"
import { toast } from "sonner"

interface PublishDropdownProps {
  noteId: string
}


export function PublishDropdown({ noteId }: PublishDropdownProps) {
  const { getNoteById, publishNote, unpublishNote } = useNotesStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishSettings, setPublishSettings] = useState<PublishSettings>({
    siteTitle: "",
    siteDescription: "",
    customDomain: "",
    isPasswordProtected: false,
    password: "",
    allowComments: true,
    showLastUpdated: true,
    customCSS: ""
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

  const openPublishDialog = () => {
    if (note.publishSettings) {
      setPublishSettings(note.publishSettings)
    } else if (!publishSettings.siteTitle) {
      setPublishSettings(prev => ({
        ...prev,
        siteTitle: note.title,
        siteDescription: `A note published from Ink - ${note.title}`
      }))
    }
    setIsDialogOpen(true)
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
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={openPublishDialog}>
            <Globe className="mr-2 h-4 w-4" />
            <span>Publish as website</span>
          </DropdownMenuItem>
          
          {note.isPublished && note.publishedUrl && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Published Site</span>
                  <Badge variant="secondary" className="text-xs">Live</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2 break-all">
                  {note.publishedUrl}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 flex-1"
                    onClick={() => copyToClipboard(note.publishedUrl!)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 flex-1"
                    onClick={() => window.open(note.publishedUrl!, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openPublishDialog}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Manage publication</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUnpublish} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Unpublish site</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {note.isPublished ? 'Manage Publication' : 'Publish as Website'}
            </DialogTitle>
            <DialogDescription>
              {note.isPublished 
                ? 'Update your published site settings or unpublish it.'
                : 'Make your note available as a standalone website that anyone can visit.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={publishSettings.siteTitle}
                onChange={(e) => setPublishSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                placeholder="Enter site title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={publishSettings.siteDescription}
                onChange={(e) => setPublishSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                placeholder="Enter site description"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
              <Input
                id="customDomain"
                value={publishSettings.customDomain}
                onChange={(e) => setPublishSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                placeholder="example.com"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Password Protection</Label>
                <p className="text-sm text-muted-foreground">Require a password to view the site</p>
              </div>
              <Switch
                checked={publishSettings.isPasswordProtected}
                onCheckedChange={(checked) => setPublishSettings(prev => ({ ...prev, isPasswordProtected: checked }))}
              />
            </div>

            {publishSettings.isPasswordProtected && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={publishSettings.password}
                  onChange={(e) => setPublishSettings(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Comments</Label>
                <p className="text-sm text-muted-foreground">Let visitors leave comments</p>
              </div>
              <Switch
                checked={publishSettings.allowComments}
                onCheckedChange={(checked) => setPublishSettings(prev => ({ ...prev, allowComments: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Last Updated</Label>
                <p className="text-sm text-muted-foreground">Display when the note was last modified</p>
              </div>
              <Switch
                checked={publishSettings.showLastUpdated}
                onCheckedChange={(checked) => setPublishSettings(prev => ({ ...prev, showLastUpdated: checked }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customCSS">Custom CSS (Optional)</Label>
              <Textarea
                id="customCSS"
                value={publishSettings.customCSS}
                onChange={(e) => setPublishSettings(prev => ({ ...prev, customCSS: e.target.value }))}
                placeholder="/* Add custom styles */&#10;body { font-family: 'Georgia', serif; }"
                rows={4}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            {note.isPublished && note.publishedUrl && (
              <Button 
                variant="outline" 
                onClick={() => window.open(note.publishedUrl!, '_blank')}
                className="mr-auto"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Site
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePublish} 
              disabled={isPublishing || !publishSettings.siteTitle.trim()}
            >
              {isPublishing ? (
                <>Publishing...</>
              ) : note.isPublished ? (
                'Update Site'
              ) : (
                'Publish Site'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
