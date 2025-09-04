'use client';

import { memo } from 'react';

import {
  type ActionKeys,
  MobileChatInput as ChatInput,
  ChatInputProvider,
} from '@/features/ChatInput';

const actions: ActionKeys[] = [
  'model',
  'search',
  'fileUpload',
  'knowledgeBase',
  'tools',
  '---',
  ['params', 'history', 'stt', 'clear'],
  'mainToken',
];

const MobileChatInput = memo(() => {
  return (
    <ChatInputProvider actions={actions} mobile>
      <ChatInput />
    </ChatInputProvider>
  );
});

MobileChatInput.displayName = 'MobileChatInput';

export default MobileChatInput;
