import { SendButton as Send } from '@lobehub/editor/react';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';

import { selectors, useChatInputStore } from '../store';

const SendButton = memo(() => {
  const mobile = useChatInputStore((s) => s.mobile);
  const { canSend, generating, stop, loading, menuItems } = useChatInputStore(
    selectors.sendButtonProps,
    isEqual,
  );
  const send = useChatInputStore((s) => s.handleSendButton);

  const disabled = !generating && !canSend;

  return (
    <Send
      disabled={disabled}
      generating={generating}
      loading={loading}
      menu={!mobile && menuItems ? { items: menuItems } : undefined}
      onClick={() => send()}
      onStop={() => stop()}
      placement={'topRight'}
      trigger={['hover']}
    />
  );
});

SendButton.displayName = 'SendButton';

export default SendButton;
