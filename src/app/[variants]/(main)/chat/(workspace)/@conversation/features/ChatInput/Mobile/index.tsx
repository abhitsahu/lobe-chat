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
  const { send, loading, canNotSend, generating } = useSend();

  return (
    <ChatInputProvider
      leftActions={leftActions}
      mobile
      onSend={() => send()}
      rightActions={rightActions}
      sendButtonProps={{
        disabled: canNotSend,
        generating,
        loading,
        onStop: stop,
      }}
    >
      <ChatInput />
    </ChatInputProvider>
  );
});

MobileChatInput.displayName = 'MobileChatInput';

export default MobileChatInput;
