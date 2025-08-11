'use client';

import * as React from 'react';

import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor-kit';
import { SettingsDialog } from '@/components/settings-dialog';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { EditorTitle } from '@/components/ui/editor-title';
import { usePages } from '@/hooks/use-pages';

export function PlateEditor({ pageId }: { pageId?: string }) {
    const editor = usePlateEditor({
        plugins: EditorKit,
    });
    const { getPageById, updatePage } = usePages();
    const page = pageId ? getPageById(pageId) : undefined;
    const [title, setTitle] = React.useState<string>(page?.title ?? '');

    React.useEffect(() => {
      setTitle(page?.title ?? '');
    }, [page?.title]);

    return (
        <Plate key={pageId || 'home'} editor={editor}>
            <EditorContainer>
                <div className="px-16 pt-10 sm:px-[max(64px,calc(50%-350px))]">
                    <EditorTitle
                      value={title}
                      onChange={(v) => {
                        setTitle(v);
                      }}
                      onSubmit={() => {
                        editor.tf.focus({ edge: 'end' });
                        if (pageId) {
                          updatePage(pageId, { title: title.trim() || 'Untitled' });
                        }
                      }}
                    />
                </div>
                <Editor variant="default" />
            </EditorContainer>

            <SettingsDialog />
        </Plate>
    );
}