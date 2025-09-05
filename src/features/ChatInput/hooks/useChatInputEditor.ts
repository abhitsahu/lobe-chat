import { IEditor } from '@lobehub/editor';
import { useMemo } from 'react';

import { useChatInputStore } from '@/features/ChatInput/store';

export interface ChatInputEditor {
  clearContent: () => void;
  focus: () => void;
  getMarkdownContent: () => string;
  instance: IEditor;
  setExpand: (expand: boolean) => void;
}
export const useChatInputEditor = () => {
  const [editor, clearContent, getMarkdownContent, setExpand] = useChatInputStore((s) => [
    s.editor,
    s.clearContent,
    s.getMarkdownContent,
    s.setExpand,
  ]);

  return useMemo<ChatInputEditor>(
    () => ({
      clearContent,
      focus: () => {
        editor?.focus();
      },
      getMarkdownContent,
      instance: editor!,
      setExpand,
    }),
    [editor],
  );
};
