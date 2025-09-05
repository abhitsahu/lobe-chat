import type { IEditor } from '@lobehub/editor';
import type { ChatInputProps } from '@lobehub/editor/react';
import type { MenuProps } from '@lobehub/ui/es/Menu';
import { RefObject } from 'react';

import { ActionKeys } from '@/features/ChatInput';

export type SendButtonHandler = (params: {
  clearContent: () => void;
  editor: IEditor;
  getMarkdownContent: () => string;
}) => Promise<void> | void;

export interface SendButtonProps {
  disabled?: boolean;
  generating: boolean;
  loading: boolean;
  onStop: (params: { editor: IEditor }) => void;
  shape?: 'round' | 'default';
}

export const initialSendButtonState: SendButtonProps = {
  disabled: false,
  generating: false,
  loading: false,
  onStop: () => {},
};

export interface PublicState {
  allowExpand?: boolean;
  expand?: boolean;
  leftActions: ActionKeys[];
  mobile?: boolean;
  onSend?: SendButtonHandler;
  rightActions: ActionKeys[];
  sendButtonProps?: SendButtonProps;
  sendMenu?: MenuProps;
  showTypoBar?: boolean;
}

export interface State extends PublicState {
  editor: IEditor | null;
  /**
   * TODO: 等重构完可以将这个 Ref 移除
   */
  editorRef: RefObject<IEditor | null>;
  slashMenuRef: ChatInputProps['slashMenuRef'];
}

export const initialState: State = {
  allowExpand: true,
  editor: null,
  editorRef: { current: null },
  expand: false,
  leftActions: [],
  rightActions: [],
  slashMenuRef: { current: null },
};
