import { SendButton as Send } from '@lobehub/editor/react';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';

import { selectors, useChatInputStore } from '../store';

const SendButton = memo(() => {
  const sendMenu = useChatInputStore((s) => s.sendMenu);
  const { canSend, generating, loading } = useChatInputStore(selectors.sendButtonProps, isEqual);
  const [send, handleStop] = useChatInputStore((s) => [s.handleSendButton, s.handleStop]);

  const disabled = !generating && !canSend;

  return (
    <Send
      disabled={disabled}
      generating={generating}
      loading={loading}
      menu={sendMenu as any}
      onClick={() => send()}
      onStop={() => handleStop()}
      placement={'topRight'}
      trigger={['hover']}
    />
  );
});

SendButton.displayName = 'SendButton';

export default SendButton;
