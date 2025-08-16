import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Brain } from 'lucide-react';

interface NewModeDialogProps {
  onModeCreate: (mode: {
    name: string;
    description: string;
    iconColor: string;
    titleColor: string;
    notebooks: string[];
  }) => void;
}

const colorOptions = [
  { value: 'text-blue-600', label: 'Blue', preview: 'text-blue-600' },
  { value: 'text-green-600', label: 'Green', preview: 'text-green-600' },
  { value: 'text-purple-600', label: 'Purple', preview: 'text-purple-600' },
  { value: 'text-slate-600', label: 'Slate', preview: 'text-slate-600' },
  { value: 'text-orange-600', label: 'Orange', preview: 'text-orange-600' },
  { value: 'text-indigo-600', label: 'Indigo', preview: 'text-indigo-600' },
  { value: 'text-teal-600', label: 'Teal', preview: 'text-teal-600' },
  { value: 'text-red-600', label: 'Red', preview: 'text-red-600' },
  { value: 'text-pink-600', label: 'Pink', preview: 'text-pink-600' },
  { value: 'text-yellow-600', label: 'Yellow', preview: 'text-yellow-600' },
];

const NewModeDialog = ({ onModeCreate }: NewModeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconColor, setIconColor] = useState('text-blue-600');
  const [titleColor, setTitleColor] = useState('text-blue-700');
  const [notebooks, setNotebooks] = useState<string[]>([]);
  const [newNotebook, setNewNotebook] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onModeCreate({
      name: name.trim(),
      description: description.trim(),
      iconColor,
      titleColor: iconColor.replace('600', '700'),
      notebooks: notebooks.filter(n => n.trim()),
    });

    // Reset form
    setName('');
    setDescription('');
    setIconColor('text-blue-600');
    setNotebooks([]);
    setNewNotebook('');
    setOpen(false);
  };

  const addNotebook = () => {
    if (newNotebook.trim() && !notebooks.includes(newNotebook.trim())) {
      setNotebooks([...notebooks, newNotebook.trim()]);
      setNewNotebook('');
    }
  };

  const removeNotebook = (index: number) => {
    setNotebooks(notebooks.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNotebook();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">
          <Plus className="size-4 mr-2" />
          New Mode
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="size-5" />
            Create New AI Mode
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Mode Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Creative, Technical, Academic"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this mode is for..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Color Theme</Label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setIconColor(color.value)}
                  className={`p-2 rounded-md border-2 transition-all ${
                    iconColor === color.value
                      ? 'border-foreground ring-2 ring-ring ring-offset-2'
                      : 'border-border hover:border-foreground/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${color.preview} bg-current`} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Associated Notebooks</Label>
            <div className="flex gap-2">
              <Input
                value={newNotebook}
                onChange={(e) => setNewNotebook(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a notebook..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addNotebook}
                disabled={!newNotebook.trim()}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            
            {notebooks.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {notebooks.map((notebook, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    {notebook}
                    <button
                      type="button"
                      onClick={() => removeNotebook(index)}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || !description.trim()}>
              Create Mode
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewModeDialog;
