import { StateCreator } from 'zustand/vanilla';


import { PublicState, State, initialState } from './initialState';

export interface Action {
  clearContent: () => void;
  getMarkdownContent: () => string;
  handleSendButton: () => void;
  handleStop: () => void;
  setExpand: (expend: boolean) => void;
  setShowTypoBar: (show: boolean) => void;
}

export type Store = Action & State;

// const t = setNamespace('ChatInput');

type CreateStore = (
  initState?: Partial<PublicState>,
) => StateCreator<Store, [['zustand/devtools', never]]>;

export const store: CreateStore = (publicState) => (set, get) => ({
  ...initialState,
  ...publicState,

  clearContent: () => {
    get().editor?.setDocument('text', '');
  },

  getMarkdownContent: () => {
    return String(get().editor?.getDocument('markdown') || '').trimEnd();
  },

  handleSendButton: () => {
    if (!get().editor) return;

    get().onSend?.({
      clearContent: get().clearContent,
      editor: get().editor!,
      getMarkdownContent: get().getMarkdownContent,
    });
  },

  handleStop: () => {
    if (!get().editor) return;

    get().sendButtonProps?.onStop?.({ editor: get().editor! });
  },

  setExpand: (expand) => {
    set({ expand });
  },

  setShowTypoBar: (showTypoBar) => {
    set({ showTypoBar });
  },
});
