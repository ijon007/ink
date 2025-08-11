'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { PlateEditor } from '@/components/plate-editor';
import { usePages } from '@/hooks/use-pages';

function PageInner() {
  const params = useParams<{ slug?: string[] }>();
  const router = useRouter();
  const { pages, ensureDefaultPage } = usePages();

  // slug format: ['p', '<id>'] for now; future can support nested path segments.
  const slug = params?.slug ?? [];
  const pageId = slug.length >= 2 && slug[0] === 'p' ? slug[1] : null;

  React.useEffect(() => {
    if (!pageId) {
      // no page selected, navigate to default
      const first = ensureDefaultPage();
      router.replace(`/app/p/${first.id}`);
    }
  }, [pageId, ensureDefaultPage, router]);

  if (!pageId) return null;

  // If pages loaded but id not found, show 404
  if (pages.length > 0 && !pages.find((p) => p.id === pageId)) {
    router.replace('/app');
    return null;
  }

  return <PlateEditor pageId={pageId} />;
}

export default function CatchAllEditorPage() {
  return <PageInner />;
}


