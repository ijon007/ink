import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl">ink.</h1>
      <p className="text-lg text-muted-foreground">
        A simple, beautiful, and powerful text editor and form builder.
      </p>
      <Link href="/app">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
