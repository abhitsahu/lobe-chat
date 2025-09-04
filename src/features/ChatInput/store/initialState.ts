import type { IEditor } from '@lobehub/editor';
import type { ChatInputProps } from '@lobehub/editor/react';
import type { ItemType } from 'antd/lib/menu/interface';
import { RefObject } from 'react';

import { ActionKeys } from '@/features/ChatInput';

export type SendButtonHandler = (params: { editor: IEditor }) => void;

export interface SendButtonProps {
  canSend: boolean;
  generating: boolean;
  loading: boolean;
  menuItems?: ItemType[];
  onStop: (params: { editor: IEditor }) => void;
  shape?: 'round' | 'circle';
}

export const initialSendButtonState: SendButtonProps = {
  canSend: false,
  generating: false,
  loading: false,
  onStop: () => {},
};

export interface PublicState {
  actions: ActionKeys[];
  allowExpand?: boolean;
  expand?: boolean;
  mobile?: boolean;
  onSend?: SendButtonHandler;
  sendButtonProps?: SendButtonProps;
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
  actions: [],
  allowExpand: true,
  editor: null,
  editorRef: { current: null },
  expand: false,
  slashMenuRef: { current: null },
};
