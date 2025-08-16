import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Settings, Bell, Globe, Users, Brain, Shapes, MoreHorizontal, LogOut, Hand, CheckCircle, XCircle, FileText, BookOpen, HelpCircle, Wrench, ClipboardList, MessageSquare, Headphones, Lightbulb } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import InviteDialog from './invite-dialog';
import NewModeDialog from './new-mode-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MiniLineChart } from '@/components/ui/mini-line-chart';
import { Textarea } from '@/components/ui/textarea';

interface PublishedNote {
  id: number;
  name: string;
  description: string;
  status: 'Published' | 'Draft';
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PublishedForm {
  id: number;
  name: string;
  description: string;
  status: 'Published' | 'Draft';
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SettingsDialog = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [aiModes, setAiModes] = useState([
    {
      id: 1,
      name: 'Scientific',
      description: 'Scientific mode for research and academic writing.',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-700',
      notebooks: ['Research Notes', 'Academic Papers', 'Lab Reports']
    },
    {
      id: 2,
      name: 'Casual',
      description: 'Casual mode for everyday writing and notes.',
      iconColor: 'text-green-600',
      titleColor: 'text-green-700',
      notebooks: ['Personal Notes', 'Daily Journal', 'Quick Thoughts']
    },
    {
      id: 3,
      name: 'Shakespeare',
      description: 'Shakespeare mode for creative and literary writing.',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-700',
      notebooks: ['Creative Writing', 'Poetry', 'Stories']
    },
    {
      id: 4,
      name: 'Professional',
      description: 'Professional mode for business and formal documents.',
      iconColor: 'text-slate-600',
      titleColor: 'text-slate-700',
      notebooks: ['Business Notes', 'Meeting Notes', 'Proposals']
    },
    {
      id: 5,
      name: 'Creative',
      description: 'Creative mode for brainstorming and ideation.',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-700',
      notebooks: ['Ideas', 'Brainstorming', 'Project Planning']
    },
    {
      id: 6,
      name: 'Technical',
      description: 'Technical mode for code and technical documentation.',
      iconColor: 'text-indigo-600',
      titleColor: 'text-indigo-700',
      notebooks: ['Code Notes', 'Technical Docs', 'API Docs']
    },
    {
      id: 7,
      name: 'Academic',
      description: 'Academic mode for scholarly writing and research.',
      iconColor: 'text-teal-600',
      titleColor: 'text-teal-700',
      notebooks: ['Thesis', 'Research Papers', 'Literature Review']
    },
    {
      id: 8,
      name: 'Journalistic',
      description: 'Journalistic mode for news and reporting.',
      iconColor: 'text-red-600',
      titleColor: 'text-red-700',
      notebooks: ['News Notes', 'Interviews', 'Reports']
    }
  ]);

  const handleCreateMode = (modeData: {
    name: string;
    description: string;
    iconColor: string;
    titleColor: string;
    notebooks: string[];
  }) => {
    const newMode = {
      id: Math.max(...aiModes.map(m => m.id)) + 1,
      ...modeData
    };
    setAiModes([...aiModes, newMode]);
  };

  const settingsSections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'connections', label: 'Connections', icon: Shapes },
    { id: 'people', label: 'People', icon: Users },
    { id: 'public', label: 'Public pages', icon: Globe },
    { id: 'ai', label: 'Ink AI', icon: Brain },
  ];



  const workspaceUsers = [
    {
      id: 1,
      name: 'IjonK4',
      email: 'kushta.joni@gmail.com',
      avatar: 'https://github.com/shadcn.png',
      avatarFallback: 'CN',
      accessLevel: 'Admin',
      accessLevelColor: 'bg-blue-100 text-blue-800',
      pages: 'All pages',
      canUpgrade: false,
      canRemove: true,
      isPending: false,
      pageAccess: [
        { name: 'Dashboard', access: 'Full', lastSeen: '2 hours ago' },
        { name: 'Notes', access: 'Full', lastSeen: '1 day ago' },
        { name: 'Settings', access: 'Full', lastSeen: '3 days ago' },
        { name: 'Analytics', access: 'Full', lastSeen: '1 week ago' },
        { name: 'User Management', access: 'Full', lastSeen: '2 weeks ago' }
      ]
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '',
      avatarFallback: 'JD',
      accessLevel: 'Editor',
      accessLevelColor: 'bg-green-100 text-green-800',
      pages: 'Project notes, Shared docs',
      canUpgrade: true,
      canRemove: true,
      isPending: false,
      pageAccess: [
        { name: 'Dashboard', access: 'View', lastSeen: '1 day ago' },
        { name: 'Notes', access: 'Full', lastSeen: '2 days ago' },
        { name: 'Project Docs', access: 'Full', lastSeen: '3 days ago' },
        { name: 'Shared Notes', access: 'Full', lastSeen: '1 week ago' },
        { name: 'Settings', access: 'View', lastSeen: 'Never' }
      ]
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: '',
      avatarFallback: 'JS',
      accessLevel: 'Viewer',
      accessLevelColor: 'bg-gray-100 text-gray-800',
      pages: 'Public docs only',
      canUpgrade: true,
      canRemove: true,
      isPending: false,
      pageAccess: [
        { name: 'Dashboard', access: 'View', lastSeen: '3 days ago' },
        { name: 'Public Notes', access: 'View', lastSeen: '1 week ago' },
        { name: 'Shared Docs', access: 'View', lastSeen: '2 weeks ago' }
      ]
    },
    {
      id: 4,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      avatar: '',
      avatarFallback: 'MJ',
      accessLevel: 'Pending',
      accessLevelColor: 'bg-yellow-100 text-yellow-800',
      pages: '-',
      canUpgrade: false,
      canRemove: false,
      isPending: true,
      pageAccess: []
    }
  ];

  const projectUsers = [
    {
      id: 1,
      name: 'IjonK4',
      email: 'kushta.joni@gmail.com',
      avatar: 'https://github.com/shadcn.png',
      avatarFallback: 'CN',
      accessLevel: 'Admin',
      accessLevelColor: 'bg-blue-100 text-blue-800',
      pages: 'All project pages',
      canUpgrade: false,
      canRemove: true,
      isPending: false,
      pageAccess: [
        { name: 'Project Overview', access: 'Full', lastSeen: '1 hour ago' },
        { name: 'Tasks', access: 'Full', lastSeen: '3 hours ago' },
        { name: 'Documents', access: 'Full', lastSeen: '1 day ago' },
        { name: 'Team Chat', access: 'Full', lastSeen: '2 days ago' }
      ]
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '',
      avatarFallback: 'JD',
      accessLevel: 'Editor',
      accessLevelColor: 'bg-green-100 text-green-800',
      pages: 'Tasks, Documents',
      canUpgrade: true,
      canRemove: true,
      isPending: false,
      pageAccess: [
        { name: 'Project Overview', access: 'View', lastSeen: '2 days ago' },
        { name: 'Tasks', access: 'Full', lastSeen: '1 day ago' },
        { name: 'Documents', access: 'Full', lastSeen: '3 days ago' },
        { name: 'Team Chat', access: 'View', lastSeen: '1 week ago' }
      ]
    }
  ];

  const personalUsers = [
    {
      id: 1,
      name: 'IjonK4',
      email: 'kushta.joni@gmail.com',
      avatar: 'https://github.com/shadcn.png',
      avatarFallback: 'CN',
      accessLevel: 'Owner',
      accessLevelColor: 'bg-purple-100 text-purple-800',
      pages: 'All personal pages',
      canUpgrade: true,
      canRemove: true,
      isPending: false,
      pageAccess: [
        { name: 'Personal Notes', access: 'Full', lastSeen: '30 min ago' },
        { name: 'Bookmarks', access: 'Full', lastSeen: '2 hours ago' },
        { name: 'Settings', access: 'Full', lastSeen: '1 day ago' }
      ]
    }
  ];

  const notificationTypes = [
    { id: 'new-comments', label: 'New comments', description: 'When someone comments on your notes' },
    { id: 'mentions', label: 'Mentions', description: 'When someone mentions you in a note' },
    { id: 'collaboration-invites', label: 'Collaboration invites', description: 'When someone invites you to collaborate' },
    { id: 'note-updates', label: 'Note updates', description: 'When shared notes are updated' },
    { id: 'security-alerts', label: 'Security alerts', description: 'Important security notifications' }
  ];

  const publicStats = [
    {
      id: 1,
      label: 'Published notes',
      value: 28,
      color: '#3b82f6',
      chartData: [
        { value: 8 }, { value: 12 }, { value: 15 }, { value: 18 }, { value: 12 }, { value: 25 }, { value: 28 }
      ]
    },
    {
      id: 2,
      label: 'Published forms',
      value: 10,
      color: '#10b981',
      chartData: [
        { value: 2 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: 8 }, { value: 2 }, { value: 10 }
      ]
    },
    {
      id: 3,
      label: 'Anyone with the link',
      value: 100,
      color: '#f59e0b',
      chartData: [
        { value: 35 }, { value: 45 }, { value: 60 }, { value: 75 }, { value: 85 }, { value: 95 }, { value: 100 }
      ]
    }
  ];

  const publishedNotes: PublishedNote[] = [
    {
      id: 1,
      name: 'Getting Started Guide',
      description: 'Complete guide for new users',
      status: 'Published',
      url: '/notes/getting-started',
      icon: BookOpen
    },
    {
      id: 2,
      name: 'API Documentation',
      description: 'Technical API reference',
      status: 'Published',
      url: '/notes/api-docs',
      icon: FileText
    },
    {
      id: 3,
      name: 'User Manual',
      description: 'Comprehensive user manual',
      status: 'Draft',
      url: '/notes/user-manual',
      icon: HelpCircle
    },
    {
      id: 4,
      name: 'Troubleshooting',
      description: 'Common issues and solutions',
      status: 'Published',
      url: '/notes/troubleshooting',
      icon: Wrench
    }
  ];

  const publishedForms: PublishedForm[] = [
    {
      id: 1,
      name: 'Contact Form',
      description: 'General contact form',
      status: 'Published',
      url: '/forms/contact',
      icon: MessageSquare
    },
    {
      id: 2,
      name: 'Feedback Survey',
      description: 'User feedback collection',
      status: 'Published',
      url: '/forms/feedback',
      icon: ClipboardList
    },
    {
      id: 3,
      name: 'Support Request',
      description: 'Technical support form',
      status: 'Draft',
      url: '/forms/support',
      icon: Headphones
    },
    {
      id: 4,
      name: 'Feature Request',
      description: 'New feature suggestions',
      status: 'Published',
      url: '/forms/feature-request',
      icon: Lightbulb
    }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' }
  ];

  const publicThemes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-6">Account</h3>
              <div className="flex items-start gap-6">
                <Avatar className="size-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Preferred name</Label>
                  <Input 
                    placeholder="Enter your preferred name" 
                    defaultValue="IjonK4"
                    className="max-w-xs"
                  />
                </div>
              </div>
            </div>

            <div className="border-t" />

            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-3">Preferences</h3>  
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground">Change the appearance of your workspace.</p>
                </div>
                <Switch />
              </div>
              <div className="flex flex-row items-center justify-between gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-medium">Language</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred language.</p>
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="English" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Account security</h3>
              <div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">kushta.joni@gmail.com</p>
                  </div>
                  <Button variant="outline" size="sm">Change email</Button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Password</Label>
                    <p className="text-sm text-muted-foreground">Change your password to login to your account.</p>
                  </div>
                  <Button variant="outline" size="sm">Change password</Button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">2-step verification</Label>
                    <p className="text-sm text-muted-foreground">Add an additional layer of security to your account during login.</p>
                  </div>
                  <Button variant="outline" size="sm">Add verification method</Button>
                </div>
                <div className="flex flex-row items-center justify-between py-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Delete account</Label>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-500 w-fit">Delete account</Button> 
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'public':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Public Notes</h3>
              <p className="text-sm font-medium mb-4">Stats</p>
                <div className='flex flex-row gap-5 w-full'>
                 {publicStats.map((stat) => (
                   <Card key={stat.id} className='shadow-none hover:bg-muted/70 w-full relative'>
                     <CardContent className='flex flex-col items-start justify-center'>
                       <span className='text-xs text-muted-foreground'>{stat.label}</span>
                       <span className='text-2xl font-medium'>
                         {stat.value}
                       </span>
                     </CardContent>
                     <MiniLineChart 
                       data={stat.chartData} 
                       color={stat.color}
                     />
                   </Card>
                 ))}
               </div>

               <div className="mt-10">
                <p className="text-sm font-medium mb-2 mt-4">All notes and forms</p>
                 <Tabs defaultValue="notes" className="w-full">
                   <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="notes">Published Notes</TabsTrigger>
                     <TabsTrigger value="forms">Published Forms</TabsTrigger>
                   </TabsList>

                   <TabsContent value="notes" className="space-y-4">
                     <div className="border rounded-lg">
                       <div className="overflow-x-auto">
                          <div className="bg-muted/50 border-b">
                            <div className="grid grid-cols-4 gap-3 px-3 py-2 text-xs font-medium text-muted-foreground">
                              <div>Name</div>
                              <div>Status</div>
                              <div>URL</div>
                              <div>Actions</div>
                            </div>
                          </div>
                          <div className="divide-y">
                            {publishedNotes.map((note) => {
                              const Icon = note.icon;
                              return (
                                <div key={note.id} className="grid grid-cols-4 gap-3 px-3 py-2 text-xs hover:bg-muted/30">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                                      <Icon className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-xs">{note.name}</span>
                                  </div>
                                 <div>
                                   <Badge 
                                     variant="outline" 
                                     className={cn(
                                       "text-xs px-1.5 py-0.5",
                                       note.status === 'Published' ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                     )}
                                   >
                                     {note.status}
                                   </Badge>
                                 </div>
                                 <div className="text-xs text-muted-foreground font-mono">
                                   {note.url}
                                 </div>
                                 <div>
                                   <DropdownMenu>
                                     <DropdownMenuTrigger asChild>
                                       <Button variant="ghost" className="h-5 w-5 p-0">
                                         <span className="sr-only">Open menu</span>
                                         <MoreHorizontal className="h-2.5 w-2.5" />
                                       </Button>
                                     </DropdownMenuTrigger>
                                     <DropdownMenuContent align="start">
                                       <DropdownMenuItem onClick={() => alert('View clicked')}>
                                         <span className="text-xs">View</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Edit clicked')}>
                                         <span className="text-xs">Edit</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Unpublish clicked')}>
                                         <span className="text-xs">Unpublish</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Delete clicked')} className="">
                                         <span className="text-xs text-red-600 hover:text-red-600">Delete</span>
                                       </DropdownMenuItem>
                                     </DropdownMenuContent>
                                   </DropdownMenu>
                                 </div>
                               </div>
                             );
                           })}
                         </div>
                       </div>
                     </div>
                   </TabsContent>

                   <TabsContent value="forms" className="space-y-4">
                     <div className="border rounded-lg">
                       <div className="overflow-x-auto">
                          <div className="bg-muted/50 border-b">
                            <div className="grid grid-cols-5 gap-3 px-3 py-2 text-xs font-medium text-muted-foreground">
                              <div>Name</div>
                              <div>Status</div>
                              <div>URL</div>
                              <div>Actions</div>
                            </div>
                          </div>
                          <div className="divide-y">
                            {publishedForms.map((form) => {
                              const Icon = form.icon;
                              return (
                                <div key={form.id} className="grid grid-cols-4 gap-3 px-3 py-2 text-xs hover:bg-muted/30">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                                      <Icon className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="font-medium text-xs">{form.name}</span>
                                  </div>
                                 <div>
                                   <Badge 
                                     variant="outline" 
                                     className={cn(
                                       "text-xs px-1.5 py-0.5",
                                       form.status === 'Published' ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                     )}
                                   >
                                     {form.status}
                                   </Badge>
                                 </div>
                                 <div className="text-xs text-muted-foreground font-mono">
                                   {form.url}
                                 </div>
                                 <div>
                                   <DropdownMenu>
                                     <DropdownMenuTrigger asChild>
                                       <Button variant="ghost" className="h-5 w-5 p-0">
                                         <span className="sr-only">Open menu</span>
                                         <MoreHorizontal className="h-2.5 w-2.5" />
                                       </Button>
                                     </DropdownMenuTrigger>
                                     <DropdownMenuContent align="start">
                                       <DropdownMenuItem onClick={() => alert('View clicked')}>
                                         <span className="text-xs">View</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Edit clicked')}>
                                         <span className="text-xs">Edit</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Responses clicked')}>
                                         <span className="text-xs">View Responses</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Unpublish clicked')}>
                                         <span className="text-xs">Unpublish</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => alert('Delete clicked')} className="">
                                         <span className="text-xs text-red-600 hover:text-red-600">Delete</span>
                                       </DropdownMenuItem>
                                     </DropdownMenuContent>
                                   </DropdownMenu>
                                 </div>
                               </div>
                             );
                           })}
                         </div>
                       </div>
                     </div>
                   </TabsContent>
                 </Tabs>
               </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold mb-6">Email Notifications</h3>
              <div className="">
                <div className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                  </div>
                  <Switch />
                </div>

                <div className="mb-4 mt-2">
                  <h4 className="text-lg font-medium">Notification Types</h4>
                  
                  {notificationTypes.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between py-2">
                      <div className="flex flex-col gap-1">
                        <Label className="text-sm font-medium">{notification.label}</Label>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch />
                    </div>
                  ))}
                </div>

                <div className="mt-2"> 
                  <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium">Unsubscribe footer</Label>
                      <p className="text-sm text-muted-foreground">Include unsubscribe link in emails</p>
                    </div>
                    <Button variant="outline" size="sm">Unsubscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'connections':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Connections</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Two-factor authentication</Label>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Session management</Label>
                    <p className="text-xs text-muted-foreground">Manage active sessions</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'people':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">People</h3>
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between gap-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Invite by link</span>
                    <p className="text-xs text-muted-foreground">Invite people to your workspace</p>
                  </div>
                  <Button variant="outline" size="sm">Copy invite link</Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Notebook Access</h3>
                    <InviteDialog settings={true} />
                  </div>
                  <Tabs defaultValue="main" className="w-full">
                    <div className="flex items-center justify-between">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="main">ijon's notebook</TabsTrigger>
                        <TabsTrigger value="project">Project Alpha</TabsTrigger>
                        <TabsTrigger value="caly">caly</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="main" className="space-y-4">
                      <div className="border rounded-lg">
                        <div className="overflow-x-auto">
                          <div className="divide-y">
                            {workspaceUsers.map((user) => (
                              <Collapsible key={user.id} className="group">
                                <CollapsibleTrigger asChild>
                                  <div className="flex items-center justify-between p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                      <Avatar className="size-6">
                                        {user.avatar && <AvatarImage src={user.avatar} />}
                                        <AvatarFallback className="text-xs">{user.avatarFallback}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline" className={`text-xs px-2 ${user.accessLevelColor}`}>
                                        {user.accessLevel}
                                      </Badge>
                                      
                                      <div className="text-xs text-muted-foreground w-32 truncate">
                                        {user.pages}
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-6 w-6 p-0">
                                              <span className="sr-only">Open menu</span>
                                              <MoreHorizontal className="h-3 w-3" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            {user.isPending ? (
                                              <>
                                                <DropdownMenuItem onClick={() => alert('Accept clicked')}>
                                                  <CheckCircle className="size-4 text-green-600" />
                                                  <span className='text-xs text-green-600 hover:text-green-600'>
                                                    Accept
                                                  </span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => alert('Decline clicked')}>
                                                  <XCircle className="size-4 text-red-600" />
                                                  <span className='text-xs text-red-600 hover:text-red-600'>
                                                    Decline
                                                  </span>
                                                </DropdownMenuItem>
                                              </>
                                            ) : (
                                              <>
                                                {user.canUpgrade && user.accessLevel === 'Viewer' && (
                                                  <DropdownMenuItem onClick={() => alert('Upgrade to Editor clicked')} className="text-xs">
                                                    Upgrade to Editor
                                                  </DropdownMenuItem>
                                                )}
                                                {user.canUpgrade && user.accessLevel !== 'Admin' && (
                                                  <DropdownMenuItem onClick={() => alert('Upgrade to Admin clicked')} className="text-xs">
                                                    Upgrade to Admin
                                                  </DropdownMenuItem>
                                                )}
                                                {user.canRemove && (
                                                  <DropdownMenuItem onClick={() => alert('Remove clicked')} className="flex items-center gap-2">
                                                    <Hand className="size-4 -rotate-32 text-red-600" />
                                                    <span className='text-xs text-red-600 hover:text-red-600'>Remove from workspace</span>
                                                  </DropdownMenuItem>
                                                )}
                                              </>
                                            )}
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleTrigger>
                                
                                <CollapsibleContent>
                                  <div className="px-3 pb-3 border-t bg-muted/20">
                                    <div className="pt-3">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-3">Page Access Details</h5>
                                      {user.pageAccess.length > 0 ? (
                                        <div className="border rounded-md overflow-hidden">
                                          <div className="bg-muted/50 border-b">
                                            <div className="grid grid-cols-3 gap-4 px-3 py-2 text-xs font-medium text-muted-foreground">
                                              <div>Page Name</div>
                                              <div>Last Seen</div>
                                              <div>Access Level</div>
                                            </div>
                                          </div>
                                          <div className="divide-y">
                                            {user.pageAccess.map((page, index) => (
                                              <div key={index} className="grid grid-cols-3 gap-4 px-3 py-2 text-xs hover:bg-muted/30">
                                                <div className="font-medium text-foreground">{page.name}</div>
                                                <div className="text-muted-foreground">{page.lastSeen}</div>
                                                <div>
                                                  <Badge 
                                                    variant="outline" 
                                                    className={cn(
                                                      "text-xs px-2 py-0.5",
                                                      page.access === 'Full' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200"
                                                    )}
                                                  >
                                                    {page.access}
                                                  </Badge>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-xs text-muted-foreground italic py-4 text-center">
                                          No pages assigned yet
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="project" className="space-y-4">
                      <div className="border rounded-lg">
                        <div className="overflow-x-auto">
                          <div className="divide-y">
                            {projectUsers.map((user) => (
                              <Collapsible key={user.id} className="group">
                                <CollapsibleTrigger asChild>
                                  <div className="flex items-center justify-between p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                      <Avatar className="size-6">
                                        {user.avatar && <AvatarImage src={user.avatar} />}
                                        <AvatarFallback className="text-xs">{user.avatarFallback}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline" className={`text-xs px-2 ${user.accessLevelColor}`}>
                                        {user.accessLevel}
                                      </Badge>
                                      
                                      <div className="text-xs text-muted-foreground w-32 truncate">
                                        {user.pages}
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-6 w-6 p-0">
                                              <span className="sr-only">Open menu</span>
                                              <MoreHorizontal className="h-3 w-3" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            {user.canUpgrade && user.accessLevel !== 'Admin' && (
                                              <DropdownMenuItem onClick={() => alert('Upgrade to Admin clicked')} className="text-xs">
                                                Upgrade to Admin
                                              </DropdownMenuItem>
                                            )}
                                            {user.canRemove && (
                                              <DropdownMenuItem onClick={() => alert('Remove clicked')} className="flex items-center gap-2">
                                                <Hand className="size-4 -rotate-32 text-red-600" />
                                                <span className='text-xs text-red-600 hover:text-red-600'>Remove from project</span>
                                              </DropdownMenuItem>
                                            )}
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleTrigger>
                                
                                <CollapsibleContent>
                                  <div className="px-3 pb-3 border-t bg-muted/20">
                                    <div className="pt-3">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-3">Page Access Details</h5>
                                      {user.pageAccess.length > 0 ? (
                                        <div className="border rounded-md overflow-hidden">
                                          <div className="bg-muted/50 border-b">
                                            <div className="grid grid-cols-3 gap-4 px-3 py-2 text-xs font-medium text-muted-foreground">
                                              <div>Page Name</div>
                                              <div>Last Seen</div>
                                              <div>Access Level</div>
                                            </div>
                                          </div>
                                          <div className="divide-y">
                                            {user.pageAccess.map((page, index) => (
                                              <div key={index} className="grid grid-cols-3 gap-4 px-3 py-2 text-xs hover:bg-muted/30">
                                                <div className="font-medium text-foreground">{page.name}</div>
                                                <div className="text-muted-foreground">{page.lastSeen}</div>
                                                <div>
                                                  <Badge 
                                                    variant="outline" 
                                                    className={cn(
                                                      "text-xs px-2 py-0.5",
                                                      page.access === 'Full' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200"
                                                    )}
                                                  >
                                                    {page.access}
                                                  </Badge>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-xs text-muted-foreground italic py-4 text-center">
                                          No pages assigned yet
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="caly" className="space-y-4">
                      <div className="border rounded-lg">
                        <div className="overflow-x-auto">
                          <div className="divide-y">
                            {personalUsers.map((user) => (
                              <Collapsible key={user.id} className="group">
                                <CollapsibleTrigger asChild>
                                  <div className="flex items-center justify-between p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                      <Avatar className="size-6">
                                        {user.avatar && <AvatarImage src={user.avatar} />}
                                        <AvatarFallback className="text-xs">{user.avatarFallback}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                      <Badge variant="outline" className={`text-xs px-2 ${user.accessLevelColor}`}>
                                        {user.accessLevel}
                                      </Badge>
                                      
                                      <div className="text-xs text-muted-foreground w-32 truncate">
                                        {user.pages}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-6 w-6 p-0">
                                              <span className="sr-only">Open menu</span>
                                              <MoreHorizontal className="h-3 w-3" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            {user.canUpgrade && user.accessLevel !== 'Admin' && (
                                              <DropdownMenuItem onClick={() => alert('Upgrade to Admin clicked')} className="text-xs">
                                                Upgrade to Admin
                                              </DropdownMenuItem>
                                            )}
                                            {user.canRemove && (
                                              <DropdownMenuItem onClick={() => alert('Remove clicked')} className="flex items-center gap-2">
                                                <Hand className="size-4 -rotate-32 text-red-600" />
                                                <span className='text-xs text-red-600 hover:text-red-600'>Remove from project</span>
                                              </DropdownMenuItem>
                                            )}
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleTrigger>
                                
                                <CollapsibleContent>
                                  <div className="px-3 pb-3 border-t bg-muted/20">
                                    <div className="pt-3">
                                      <h5 className="text-xs font-medium text-muted-foreground mb-3">Page Access Details</h5>
                                      {user.pageAccess.length > 0 ? (
                                        <div className="border rounded-md overflow-hidden">
                                          <div className="bg-muted/50 border-b">
                                            <div className="grid grid-cols-3 gap-4 px-3 py-2 text-xs font-medium text-muted-foreground">
                                              <div>Page Name</div>
                                              <div>Last Seen</div>
                                              <div>Access Level</div>
                                            </div>
                                          </div>
                                          <div className="divide-y">
                                            {user.pageAccess.map((page, index) => (
                                              <div key={index} className="grid grid-cols-3 gap-4 px-3 py-2 text-xs hover:bg-muted/30">
                                                <div className="font-medium text-foreground">{page.name}</div>
                                                <div className="text-muted-foreground">{page.lastSeen}</div>
                                                <div>
                                                  <Badge 
                                                    variant="outline" 
                                                    className={cn(
                                                      "text-xs px-2 py-0.5",
                                                      page.access === 'Full' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200"
                                                    )}
                                                  >
                                                    {page.access}
                                                  </Badge>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-xs text-muted-foreground italic py-4 text-center">
                                          No pages assigned yet
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ink AI</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2 max-w-full">
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Different Modes</p>
                      <p className="text-xs text-muted-foreground">
                        Choose between different modes.
                      </p>
                    </div>
                    <NewModeDialog onModeCreate={handleCreateMode} />
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 max-w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--muted-foreground) / 0.2) transparent' }}>
                    {aiModes.map((mode) => (
                      <Card 
                        key={mode.id}
                        className="min-w-[240px] shadow-none hover:bg-muted/70 cursor-pointer border border-border hover:border-border/70 transition-colors"
                      >
                        <CardContent className="px-3">
                          <CardTitle className={`flex flex-row items-center gap-2 text-sm font-medium ${mode.titleColor}`}>
                            <Brain className={`size-3.5 ${mode.iconColor}`} />
                            {mode.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mb-2">
                            {mode.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {mode.notebooks.map((notebook, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="text-xs px-1.5 py-0.5 bg-muted/50 hover:bg-muted/70"
                              >
                                {notebook}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Short or Long Answers</p>
                  <p className="text-xs text-muted-foreground">
                    Choose between short, medium or long answers.
                  </p>
                  <div className="flex flex-row gap-2 w-full">
                    <Button variant="outline" className="w-1/3">
                      Short
                    </Button>
                    <Button variant="outline" className="w-1/3">
                      Medium
                    </Button>
                    <Button variant="outline" className="w-1/3">
                      Long
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Custom Instructions</p>
                  <p className="text-xs text-muted-foreground">
                    Custom instructions for Ink AI.
                  </p>
                  <Textarea placeholder="Custom Instructions" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Personal API Key</p>
                  <p className="text-xs text-muted-foreground">
                    Your personal API key for Ink AI.
                  </p>
                  <Input type="text" placeholder="API Key" />
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Disable Ink AI</p>
                    <p className="text-xs text-muted-foreground">
                      Disable Ink AI.
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Switch />
                    <p className="text-xs text-muted-foreground">
                      Enabled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className="cursor-pointer transition-all duration-300 border h-7 border-neutral-200" onSelect={(e) => e.preventDefault()}>
            <Settings className="size-4" />
            Settings
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="p-0 min-w-[1200px] h-[700px]">
        <div className="flex h-full">
          <div className="w-64 border-r bg-muted/30 flex-shrink-0">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Settings</h2>
              <p className="text-sm text-muted-foreground">Manage your preferences</p>
            </div>
            <nav className="p-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center justify-start gap-3 px-3 py-2 text-sm rounded-md transition-colors mb-2",
                      activeSection === section.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                    variant="ghost"
                  >
                    <Icon className="size-4" />
                    {section.label}
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 p-6 overflow-y-auto w-0">
            <div className="max-w-full">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;