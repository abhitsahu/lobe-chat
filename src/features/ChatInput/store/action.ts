import { StateCreator } from 'zustand/vanilla';

import { setNamespace } from '@/utils/storeDebug';

import { PublicState, State, initialState } from './initialState';

export interface Action {
  handleSendButton: () => void;
  handleStop: () => void;
  setExpand: (expend: boolean) => void;
  setShowTypoBar: (show: boolean) => void;
}

export type Store = Action & State;

const t = setNamespace('ChatInput');

type CreateStore = (
  initState?: Partial<PublicState>,
) => StateCreator<Store, [['zustand/devtools', never]]>;

export const store: CreateStore = (initState) => (set, get) => ({
  ...initialState,
  ...initState,

  handleSendButton: () => {
    if (!get().editor) return;

    get().onSend?.({ editor: get().editor! });
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
