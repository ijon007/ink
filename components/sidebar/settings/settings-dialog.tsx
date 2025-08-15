import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Settings, Bell, Globe, Users, Brain, Shapes } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

const SettingsDialog = () => {
  const [activeSection, setActiveSection] = useState('general');

  const settingsSections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'connections', label: 'Connections', icon: Shapes },
    { id: 'people', label: 'People', icon: Users },
    { id: 'public', label: 'Public pages', icon: Globe },
    { id: 'ai', label: 'Ink AI', icon: Brain },
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
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Theme</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Font Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium">New comments</Label>
                      <p className="text-sm text-muted-foreground">When someone comments on your notes</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium">Mentions</Label>
                      <p className="text-sm text-muted-foreground">When someone mentions you in a note</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium">Collaboration invites</Label>
                      <p className="text-sm text-muted-foreground">When someone invites you to collaborate</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium">Note updates</Label>
                      <p className="text-sm text-muted-foreground">When shared notes are updated</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-sm font-medium">Security alerts</Label>
                      <p className="text-sm text-muted-foreground">Important security notifications</p>
                    </div>
                    <Switch />
                  </div>
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
              <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
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
              <h3 className="text-lg font-semibold mb-4">Workspace</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Default notebook</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default notebook" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Auto-save interval</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Data & Storage</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Export data</Label>
                    <p className="text-xs text-muted-foreground">Download your notes and data</p>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Storage usage</Label>
                    <p className="text-xs text-muted-foreground">2.4 GB of 10 GB used</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
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
      <DialogContent className="p-0 min-w-[1000px] h-[700px]">
        <div className="flex h-full">
          <div className="w-64 border-r bg-muted/30">
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

          <div className="flex-1 p-6 overflow-y-auto">
            {renderSectionContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;