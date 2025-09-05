'use client';

import { ForwardedRef, memo, useImperativeHandle } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { ChatInputEditor, useChatInputEditor } from './hooks/useChatInputEditor';
import { PublicState, useStoreApi } from './store';

export interface StoreUpdaterProps extends Partial<PublicState> {
  editorRef?: ForwardedRef<ChatInputEditor | null>;
}

const StoreUpdater = memo<StoreUpdaterProps>(
  ({ editorRef, mobile, sendButtonProps, leftActions, rightActions, onSend }) => {
    const storeApi = useStoreApi();
    const useStoreUpdater = createStoreUpdater(storeApi);
    const editor = useChatInputEditor();

    useStoreUpdater('mobile', mobile);
    useStoreUpdater('leftActions', leftActions);
    useStoreUpdater('rightActions', rightActions);

    useStoreUpdater('sendButtonProps', sendButtonProps);
    useStoreUpdater('onSend', onSend);

    useImperativeHandle(editorRef, () => editor);

    return null;
  },
);

export default StoreUpdater;
