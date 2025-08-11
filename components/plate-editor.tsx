'use client';

import * as React from 'react';

import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor-kit';
import { SettingsDialog } from '@/components/settings-dialog';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { EditorTitle } from '@/components/ui/editor-title';
import { useEditor } from '@/components/editor-kit';

export function PlateEditor() {
    const editor = usePlateEditor({
        plugins: EditorKit,
    });

    const [title, setTitle] = React.useState<string>('');
    const plate = useEditor();

    return (
        <Plate editor={editor}>
            <EditorContainer>
                <div className="px-16 pt-10 sm:px-[max(64px,calc(50%-350px))]">
                    <EditorTitle
                      value={title}
                      onChange={setTitle}
                      onSubmit={() => {
                        // Focus the editor and move caret to the end
                        plate.tf.focus({ edge: 'end' });
                      }}
                    />
                </div>
                <Editor variant="default" />
            </EditorContainer>

            <SettingsDialog />
        </Plate>
    );
}