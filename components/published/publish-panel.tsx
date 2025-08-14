"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Globe } from "lucide-react"
import type { PublishSettings } from "@/lib/stores/notes-store"
import * as React from "react"
import { ICON_MAP } from "@/lib/icons"

interface PublishPanelProps {
  publishSettings: PublishSettings
  setPublishSettings: React.Dispatch<React.SetStateAction<PublishSettings>>
  isPublished?: boolean
  isPublishing: boolean
  onPublish: () => void
  onUnpublish: () => void
  onOpen: () => void
  title: string
  icon?: string
  iconColor?: string
  content?: string
}

export function PublishPanel({
  publishSettings,
  setPublishSettings,
  isPublished,
  isPublishing,
  onPublish,
  onUnpublish,
  onOpen,
  title,
  icon,
  iconColor,
  content,
}: PublishPanelProps) {
  const getPreviewLine = React.useCallback((raw?: string) => {
    if (!raw) return "";
    try {
      const parsed = JSON.parse(raw as string);
      if (Array.isArray(parsed)) {
        for (const node of parsed) {
          if (node?.type === 'p' && Array.isArray(node.children)) {
            const textParts = node.children.map((c: any) => c?.text).filter(Boolean);
            const text = textParts.join(' ').trim();
            if (text) return text;
          }
        }
      }
    } catch (_) {
      // ignore
    }
    const firstLine = (raw as string).split(/\r?\n/).find(l => l.trim().length > 0) || "";
    return firstLine.trim();
  }, []);

  const preview = getPreviewLine(content);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border bg-card p-3 flex items-start gap-3">
        {icon && ICON_MAP[icon] ? (
          <div className="rounded-md border bg-background p-2" style={{ color: iconColor }}>
            {(() => {
              const IconComp = ICON_MAP[icon!]
              return <IconComp className="h-5 w-5" />
            })()}
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="font-semibold leading-tight">
            {title}
          </div>
          {preview ? (
            <p className="text-sm text-muted-foreground truncate">{preview}</p>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-xs">Show Last Updated</Label>
          <p className="text-sm text-muted-foreground">Display when the note was last modified</p>
        </div>
        <Switch
          checked={publishSettings.showLastUpdated}
          onCheckedChange={(checked) => setPublishSettings(prev => ({ ...prev, showLastUpdated: checked }))}
        />
      </div>

      <div className="flex items-center gap-2">
        {isPublished ? (
          <>
            <Button
              variant="destructive"
              onClick={onUnpublish}
              disabled={isPublishing}
            >
              {isPublishing ? 'Unpublishing...' : 'Unpublish'}
            </Button>
            <Button
              variant="outline"
              onClick={onOpen}
            >
              <Globe className="mr-1 h-4 w-4" />
              Open
            </Button>
          </>
        ) : (
          <Button onClick={onPublish} disabled={isPublishing}>
            {isPublishing ? 'Publishing...' : 'Publish'}
          </Button>
        )}
      </div>
    </div>
  )
}


