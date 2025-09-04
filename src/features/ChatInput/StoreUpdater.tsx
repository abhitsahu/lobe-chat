'use client';

import type { IEditor } from '@lobehub/editor';
import { ForwardedRef, memo, useImperativeHandle } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { PublicState, useStoreApi } from './store';

export interface StoreUpdaterProps extends Partial<PublicState> {
  editorRef?: ForwardedRef<IEditor | null>;
}

const StoreUpdater = memo<StoreUpdaterProps>(
  ({ editorRef, mobile, sendButtonProps, actions, onSend }) => {
    const storeApi = useStoreApi();
    const useStoreUpdater = createStoreUpdater(storeApi);

    useStoreUpdater('mobile', mobile);
    useStoreUpdater('actions', actions);

    useStoreUpdater('sendButtonProps', sendButtonProps);
    useStoreUpdater('onSend', onSend);

    useImperativeHandle(editorRef, () => storeApi.getState().editor!);

    return null;
  },
);

export default StoreUpdater;
