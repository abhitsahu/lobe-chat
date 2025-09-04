'use client';

import { SendMessageParams } from '@lobechat/types';
import type { IEditor } from '@lobehub/editor';
import { type ChatInputProps, useEditor } from '@lobehub/editor/react';
import { type ReactNode, RefObject, createContext, use, useRef, useState } from 'react';

import { ActionKeys } from '../ActionBar/config';

interface SendAction {
  canSend: boolean;
  send: (params: SendMessageParams) => void;
}

export interface ChatInputProviderState {
  actions: ActionKeys[];
  allowExpand?: boolean;
  editorRef: RefObject<IEditor | null>;
  expand?: boolean;
  mobile?: boolean;
  sendAction?: SendAction;
  setExpand?: (expend: boolean) => void;
  setShowTypoBar?: (show: boolean) => void;
  showTypoBar?: boolean;
  slashMenuRef: ChatInputProps['slashMenuRef'];
}

const defaultValue: ChatInputProviderState = {
  actions: [],
  allowExpand: true,
  editorRef: { current: null },
  slashMenuRef: { current: null },
};

const ChatInputContext = createContext<ChatInputProviderState>(defaultValue);

export interface ChatInputProviderProps extends Partial<ChatInputProviderState> {
  children: ReactNode;
}

export const ChatInputProvider = ({ children, ...config }: ChatInputProviderProps) => {
  const slashMenuRef = useRef<HTMLDivElement>(null);
  const editorRef = useEditor();
  const [expand, setExpand] = useState(config?.expand || false);
  const [showTypoBar, setShowTypoBar] = useState(config?.showTypoBar || false);
  return (
    <ChatInputContext.Provider
      value={
        {
          ...defaultValue,
          ...config,
          editorRef,
          expand,
          setExpand,
          setShowTypoBar,
          showTypoBar,
          slashMenuRef,
        } as ChatInputProviderState
      }
    >
      {children}
    </ChatInputContext.Provider>
  );
};

export const useChatInput = (): ChatInputProviderState => {
  return use(ChatInputContext);
};

ChatInputProvider.displayName = 'ChatInputProvider';
