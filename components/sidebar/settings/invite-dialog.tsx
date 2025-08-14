import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Eye, Pencil, Users, Mail } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    MultiSelector,
    MultiSelectorTrigger,
    MultiSelectorInput,
    MultiSelectorContent,
    MultiSelectorList,
    MultiSelectorItem,
} from "@/components/ui/multi-select";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const InviteDialog = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    
  // Mock email suggestions - in a real app, this would come from an API
  const mockEmails = [
    { id: 1, name: 'Johan Gjinko', email: 'johan@example.com', avatar: 'J' },
    { id: 2, name: 'Keidi Beshiri', email: 'keidi@example.com', avatar: 'K' },
    { id: 3, name: 'Helio Gato', email: 'helio@example.com', avatar: 'H' },
  ];

  const handleValuesChange = (values: string[]) => {
    setSelectedEmails(values);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emails = value.split(',').map(email => email.trim());
    setSelectedEmails(emails);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem 
          className="cursor-pointer transition-all duration-300 border h-7 border-neutral-200"
          onSelect={(e) => e.preventDefault()}
        >
            <Users />
            Invite people
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className='px-4 py-3'>
        <DialogHeader className='gap-0'>
            <DialogTitle className='text-base'>Invite people</DialogTitle>
            <DialogDescription className=''>
                Search for people or add email addresses
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">   
            <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                    <Label className='text-xs text-muted-foreground mb-1'>Email addresses</Label>
                    <Input placeholder="Type email and press Enter" className='mb-2' value={selectedEmails.join(', ')} onChange={handleEmailInputChange} />

                    {selectedEmails.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selectedEmails.map((email) => (
                                <div 
                                    key={email} 
                                    className="flex items-center gap-2 bg-muted px-3 rounded-full text-sm"
                                >
                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                    {email}
                                    <button
                                        onClick={() => setSelectedEmails(selectedEmails.filter(e => e !== email))}
                                        className="ml-1 hover:text-destructive text-muted-foreground"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <Label className='text-xs text-muted-foreground'>Role</Label>
                    <Select>
                        <SelectTrigger size='sm' className='w-full cursor-pointer'>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            <SelectItem value="admin" className='cursor-pointer'>
                                <div className="flex flex-row items-center gap-2">
                                    <Users className='size-4' />
                                    Admin
                                </div>
                            </SelectItem>
                            <SelectItem value="editor" className='cursor-pointer'>
                                <div className="flex flex-row items-center gap-2">
                                    <Pencil className='size-4' />
                                    Editor
                                </div>
                            </SelectItem>
                            <SelectItem value="viewer" className='cursor-pointer'>
                                <div className="flex flex-row items-center gap-2">
                                    <Eye className='size-4' />
                                    Viewer
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-1">
                    <Label className='text-xs text-muted-foreground'>Message</Label>
                    <Textarea placeholder="Message (optional)" />
                </div>
            </div>
            <div className="flex flex-row-reverse justify-start gap-2">
                <Button disabled={selectedEmails.length === 0}>
                    Send Invitation{selectedEmails.length > 0 && ` (${selectedEmails.length})`}
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;