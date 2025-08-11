'use client';

import { usePages } from '@/hooks/use-pages';
import * as React from 'react';

function HomeInner() {
  const { ensureDefaultPage } = usePages();
  React.useEffect(() => {
    ensureDefaultPage();
  }, [ensureDefaultPage]);
  return (
    <div className="px-16 pt-10 sm:px-[max(64px,calc(50%-350px))]">
      <h1 className="text-xl font-semibold mb-4">Welcome to ink.</h1>
      <p className="text-muted-foreground">Select or create a note from the sidebar.</p>
    </div>
  );
}

export default function EditorHomePage() {
  return <HomeInner />;
}
