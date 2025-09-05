import { IEditor } from '@lobehub/editor';
import { useCallback, useMemo, useState } from 'react';

import { useGeminiChineseWarning } from '@/hooks/useGeminiChineseWarning';
import { getAgentStoreState } from '@/store/agent';
import { agentSelectors } from '@/store/agent/slices/chat';
import { useChatStore } from '@/store/chat';
import { threadSelectors } from '@/store/chat/selectors';
import { SendMessageParams } from '@/types/message';

export type UseSendMessageParams = Pick<
  SendMessageParams,
  'onlyAddUserMessage' | 'isWelcomeQuestion'
>;

export const useSendThreadMessage = () => {
  const [loading, setLoading] = useState(false);
  const isSendButtonDisabledByMessage = useChatStore(threadSelectors.isSendButtonDisabledByMessage);
  const canSend = !isSendButtonDisabledByMessage;
  const generating = useChatStore((s) => threadSelectors.isThreadAIGenerating(s));
  const stop = useChatStore((s) => s.stopGenerateMessage);
  const [sendMessage, updateInputMessage] = useChatStore((s) => [
    s.sendThreadMessage,
    s.updateThreadInputMessage,
  ]);
  const checkGeminiChineseWarning = useGeminiChineseWarning();

  const handleSend = useCallback(async (editor: IEditor, params: UseSendMessageParams = {}) => {
    const store = useChatStore.getState();
    if (threadSelectors.isThreadAIGenerating(store)) return;

    const inputMessage = String(
      editor.getDocument('markdown') || '',
    ).trimEnd() as unknown as string;

    // if there is no message and no image, then we should not send the message
    if (!inputMessage) return;

    // Check for Chinese text warning with Gemini model
    const agentStore = getAgentStoreState();
    const currentModel = agentSelectors.currentAgentModel(agentStore);
    const shouldContinue = await checkGeminiChineseWarning({
      model: currentModel,
      prompt: inputMessage,
      scenario: 'chat',
    });

    if (!shouldContinue) return;

    updateInputMessage(inputMessage);

    sendMessage({ message: inputMessage, ...params });

    updateInputMessage('');
    editor.setDocument('text', '');
    editor.focus();
    // const hasSystemRole = agentSelectors.hasSystemRole(useAgentStore.getState());
    // const agentSetting = useAgentStore.getState().agentSettingInstance;

    // // if there is a system role, then we need to use agent setting instance to autocomplete agent meta
    // if (hasSystemRole && !!agentSetting) {
    //   agentSetting.autocompleteAllMeta();
    // }
  }, []);

  const send = useCallback(
    async (editor: IEditor, params: UseSendMessageParams = {}) => {
      setLoading(true);
      await handleSend(editor, params);
      setLoading(false);
    },
    [handleSend],
  );

  return useMemo(
    () => ({ canSend, generating, loading, send, stop }),
    [canSend, send, generating, stop, loading],
  );
};
