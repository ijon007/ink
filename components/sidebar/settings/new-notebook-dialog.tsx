import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Briefcase, LaptopMinimal, NotebookPen, Plus, School, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const NewNotebookDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className="cursor-pointer transition-all duration-300 hover:bg-blue-500/20" onSelect={(e) => e.preventDefault()}>
            <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex flex-row items-center justify-center size-5">
                    <Plus className="size-4 text-blue-500 font-semibold" />
                </div>
                <p className="text-sm text-blue-500 font-semibold">New notebook</p>
            </div>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className='px-4 py-3'>
        <DialogHeader className='gap-0'>
            <DialogTitle className='text-base'>New notebook</DialogTitle>
            <DialogDescription className=''>
                Create a new notebook to start writing
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">   
            <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                    <Label className='text-xs text-muted-foreground mb-1'>Name</Label>
                    <Input placeholder="Type notebook name" className='mb-2' />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className='text-xs text-muted-foreground'>What is this notebook for?</Label>
                    <Select>
                        <SelectTrigger size='sm' className='w-full cursor-pointer'>
                            <SelectValue placeholder="Select a purpose" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            <SelectItem value="admin" className='cursor-pointer'>
                                <div className="flex flex-row items-center gap-2">
                                    <Users className='size-4' />
                                    Personal
                                </div>
                            </SelectItem>
                            <SelectItem value="editor" className='cursor-pointer'>
                                <div className="flex flex-row items-center gap-2">
                                    <LaptopMinimal className='size-4' />
                                    Work
                                </div>
                            </SelectItem>
                            <SelectItem value="viewer" className='cursor-pointer'>
                                <div className="flex flex-row items-center gap-2">
                                    <School className='size-4' />
                                    School
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row gap-2">
                    <Card className="w-full shadow-none cursor-pointer hover:bg-muted">
                        <CardContent>
                            <NotebookPen className='size-10' />
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold">Personal</p>
                                <p className="text-xs text-muted-foreground">
                                    For your personal notes, ideas, and more.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full shadow-none cursor-pointer hover:bg-muted">
                        <CardContent className="items-center justify-start gap-2">
                            <Briefcase className='size-10' />
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold">Team</p>
                                <p className="text-xs text-muted-foreground">
                                    For your team's notes, projects, and more.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-1">
                    <Label className='text-xs text-muted-foreground'>Description</Label>
                    <Textarea placeholder="Describe the purpose of this notebook" />
                </div>
            </div>
            <div className="flex flex-row-reverse justify-start gap-2">
                <Button>
                    Create Notebook
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewNotebookDialog;