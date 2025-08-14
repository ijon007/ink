"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, Trash2, Lock, Eye, Pencil, ChevronDown, Unlock } from "lucide-react"
import * as React from "react"

interface SharePanelProps {
  publishedUrl?: string
  onCopyUrl: (url: string) => void
}

export function SharePanel({ publishedUrl, onCopyUrl }: SharePanelProps) {
  type AccessLevel = "full" | "view" | "edit"

  interface ShareEntry {
    email: string
    name: string
    access: AccessLevel
  }

  const [pendingEmail, setPendingEmail] = React.useState("")
  const [shares, setShares] = React.useState<ShareEntry[]>([])

  const accessLabelByValue: Record<AccessLevel, string> = {
    full: "Full access",
    view: "Can view",
    edit: "Can edit",
  }

  const accessIconByValue: Record<AccessLevel, React.ReactNode> = {
    full: <Unlock className="h-4 w-4 text-muted-foreground" />,
    view: <Eye className="h-4 w-4 text-muted-foreground" />,
    edit: <Pencil className="h-4 w-4 text-muted-foreground" />,
  }

  const isValidEmail = (value: string) => {
    const trimmed = value.trim()
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  }

  const addShare = () => {
    const email = pendingEmail.trim().toLowerCase()
    if (!isValidEmail(email)) return
    if (shares.some((s) => s.email === email)) return
    const name = email.split("@")[0]
    setShares((prev) => [...prev, { email, name, access: "view" }])
    setPendingEmail("")
  }

  const updateAccess = (email: string, access: AccessLevel) => {
    setShares((prev) => prev.map((s) => (s.email === email ? { ...s, access } : s)))
  }

  const removeShare = (email: string) => {
    setShares((prev) => prev.filter((s) => s.email !== email))
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addShare()
    }
  }

  const canAdd = isValidEmail(pendingEmail) && !shares.some((s) => s.email === pendingEmail.trim().toLowerCase())

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <Input
              placeholder="Enter an email..."
              className="h-8"
              value={pendingEmail}
              onChange={(e) => setPendingEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button className="h-8" onClick={addShare} disabled={!canAdd}>
              Add
            </Button>
          </div>
        </div>

        {shares.map((share) => {
          const initials = share.name
            .split(/[\.\-_\s]+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("") || share.email.slice(0, 2).toUpperCase()

          return (
            <div key={share.email} className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-2 w-full bg-neutral-100 rounded-md p-2">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{share.name}</p>
                    <p className="text-xs text-muted-foreground">{share.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 gap-2 hover:bg-neutral-200">
                      {accessIconByValue[share.access]}
                      <span className="text-sm font-normal text-muted-foreground">{accessLabelByValue[share.access]}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateAccess(share.email, "full")} className="text-sm font-normal flex items-center gap-2 cursor-pointer">
                      <Unlock className="h-4 w-4" />
                      <span className="text-sm">Full access</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAccess(share.email, "view")} className="text-sm font-normal flex items-center gap-2 cursor-pointer">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Can view</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAccess(share.email, "edit")} className="text-sm font-normal flex items-center gap-2 cursor-pointer">
                      <Pencil className="h-4 w-4" />
                      <span className="text-sm">Can edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => removeShare(share.email)} className="text-sm font-normal flex items-center gap-2 cursor-pointer ">
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-500">Remove</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>

      <Button 
        variant="outline" 
        onClick={() => publishedUrl && onCopyUrl(publishedUrl)}
        className="ml-auto h-8"
        disabled={!publishedUrl}
      >
        <Link className="h-4 w-4" />
        Copy URL
      </Button>
    </div>
  )
}


