'use client';

import { memo } from 'react';

import { type ActionKeys, ChatInputProvider, DesktopChatInput } from '@/features/ChatInput';
import WideScreenContainer from '@/features/Conversation/components/WideScreenContainer';

const actions: ActionKeys[] = [
  'model',
  'search',
  'typo',
  'fileUpload',
  'knowledgeBase',
  'tools',
  '---',
  ['params', 'history', 'stt', 'clear'],
  'mainToken',
];

const Desktop = memo(() => {
  return (
    <ChatInputProvider actions={actions}>
      <WideScreenContainer>
        <DesktopChatInput />
      </WideScreenContainer>
    </ChatInputProvider>
  );
});

export default Desktop;
