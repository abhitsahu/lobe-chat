import { SendButton as Send } from '@lobehub/editor/react';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';

import { selectors, useChatInputStore } from '../store';

const SendButton = memo(() => {
  const mobile = useChatInputStore((s) => s.mobile);
  const { canSend, generating, loading, menuItems } = useChatInputStore(
    selectors.sendButtonProps,
    isEqual,
  );
  const [send, handleStop] = useChatInputStore((s) => [s.handleSendButton, s.handleStop]);

  const disabled = !generating && !canSend;

  return (
    <Send
      disabled={disabled}
      generating={generating}
      loading={loading}
      menu={!mobile && menuItems ? { items: menuItems } : undefined}
      onClick={() => send()}
      onStop={() => handleStop()}
      placement={'topRight'}
      trigger={['hover']}
    />
  );
});

SendButton.displayName = 'SendButton';

export default SendButton;
