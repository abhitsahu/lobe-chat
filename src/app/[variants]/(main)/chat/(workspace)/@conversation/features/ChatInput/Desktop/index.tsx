'use client';

import { Hotkey, Icon } from '@lobehub/ui';
import { BotMessageSquare, LucideCheck, MessageSquarePlus } from 'lucide-react';
import { Suspense, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { type ActionKeys, ChatInputProvider, DesktopChatInput } from '@/features/ChatInput';
import WideScreenContainer from '@/features/Conversation/components/WideScreenContainer';
import { useUserStore } from '@/store/user';
import { preferenceSelectors } from '@/store/user/slices/preference/selectors';
import { settingsSelectors } from '@/store/user/slices/settings/selectors';
import { HotkeyEnum, KeyEnum } from '@/types/hotkey';

import { useSend } from '../useSend';
import MessageFromUrl from './MessageFromUrl';

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
  const { t } = useTranslation('chat');
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.AddUserMessage));

  const [useCmdEnterToSend, updatePreference] = useUserStore((s) => [
    preferenceSelectors.useCmdEnterToSend(s),
    s.updatePreference,
  ]);
  const { send, canSend, generating, stop, loading } = useSend();
  return (
    <ChatInputProvider
      actions={actions}
      onSend={(params) => {
        console.log('onSend', params.editor);
      }}
      sendButtonProps={{
        canSend,
        generating,
        loading,
        menuItems: [
          {
            icon: !useCmdEnterToSend ? <Icon icon={LucideCheck} /> : <div />,
            key: 'sendWithEnter',
            label: (
              <Flexbox align={'center'} gap={4} horizontal>
                <Trans
                  components={{
                    key: <Hotkey keys={KeyEnum.Enter} variant={'borderless'} />,
                  }}
                  i18nKey={'input.sendWithEnter'}
                  ns={'chat'}
                />
              </Flexbox>
            ),
            onClick: () => {
              updatePreference({ useCmdEnterToSend: false });
            },
          },
          {
            icon: useCmdEnterToSend ? <Icon icon={LucideCheck} /> : <div />,
            key: 'sendWithCmdEnter',
            label: (
              <Flexbox align={'center'} gap={4} horizontal>
                <Trans
                  components={{
                    key: (
                      <Hotkey
                        keys={[KeyEnum.Mod, KeyEnum.Enter].join('+')}
                        variant={'borderless'}
                      />
                    ),
                  }}
                  i18nKey={'input.sendWithCmdEnter'}
                  ns={'chat'}
                />
              </Flexbox>
            ),
            onClick: () => {
              updatePreference({ useCmdEnterToSend: true });
            },
          },
          { type: 'divider' },
          {
            // disabled,
            icon: <Icon icon={BotMessageSquare} />,
            key: 'addAi',
            label: t('input.addAi'),
            onClick: () => {
              send({ onlyAddAIMessage: true });
            },
          },
          {
            // disabled,
            icon: <Icon icon={MessageSquarePlus} />,
            key: 'addUser',
            label: (
              <Flexbox align={'center'} gap={24} horizontal>
                {t('input.addUser')}
                <Hotkey keys={hotkey} />
              </Flexbox>
            ),
            onClick: () => {
              send({ onlyAddUserMessage: true });
            },
          },
        ],
        onStop: stop,
      }}
    >
      <WideScreenContainer>
        <DesktopChatInput />
      </WideScreenContainer>
      <Suspense>
        <MessageFromUrl />
      </Suspense>
    </ChatInputProvider>
  );
});

export default Desktop;
