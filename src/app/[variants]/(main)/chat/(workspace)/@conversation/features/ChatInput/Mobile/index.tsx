'use client';

import { memo } from 'react';

import {
  type ActionKey,
  type ActionKeys,
  MobileChatInput as ChatInput,
  ChatInputProvider,
} from '@/features/ChatInput';

import { useSend } from '../useSend';

const leftActions: ActionKeys[] = [
  'model',
  'search',
  'fileUpload',
  'knowledgeBase',
  'tools',
  '---',
  ['params', 'history', 'stt', 'clear'],
  'mainToken',
];

const rightActions: ActionKey[] = ['saveTopic'];

const MobileChatInput = memo(() => {
  const { send, loading, canSend, generating } = useSend();
  return (
    <ChatInputProvider
      leftActions={leftActions}
      mobile
      rightActions={rightActions}
      sendAction={{
        canSend,
        generating,
        loading,
        send,
        stop,
      }}
    >
      <ChatInput />
    </ChatInputProvider>
  );
});

MobileChatInput.displayName = 'MobileChatInput';

export default MobileChatInput;
