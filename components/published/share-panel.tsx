"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, MoreHorizontal, Trash2, Lock, Eye, Pencil } from "lucide-react"

interface SharePanelProps {
  publishedUrl?: string
  onCopyUrl: (url: string) => void
}

export function SharePanel({ publishedUrl, onCopyUrl }: SharePanelProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <Input placeholder="Enter an email..." className="h-8" />
            <Button className="h-8">
              Add
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-2 w-full bg-neutral-100 rounded-md p-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Lock className="h-4 w-4" />
                  Full access
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="h-4 w-4" />
                  Can view
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4" />
                  Can edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => publishedUrl && onCopyUrl(publishedUrl)}
          className="mr-auto"
          disabled={!publishedUrl}
        >
          <Link className="mr-1 h-4 w-4" />
          Copy URL
        </Button>
      </div>
    </div>
  )
}


