import { useEditor } from '@lobehub/editor/react';
import { ReactNode, memo, useRef } from 'react';

import StoreUpdater, { StoreUpdaterProps } from './StoreUpdater';
import { Provider, createStore } from './store';

interface ChatInputProviderProps extends StoreUpdaterProps {
  children: ReactNode;
}

export const ChatInputProvider = memo<ChatInputProviderProps>(
  ({ children, leftActions, rightActions, mobile, sendButtonProps, onSend }) => {
    const editorRef = useEditor();
    const slashMenuRef = useRef<HTMLDivElement>(null);

    return (
      <Provider
        createStore={() =>
          createStore({
            editorRef,
            leftActions,
            mobile,
            onSend,
            rightActions,
            sendButtonProps,
            slashMenuRef,
          })
        }
      >
        <StoreUpdater
          leftActions={leftActions}
          mobile={mobile}
          onSend={onSend}
          rightActions={rightActions}
          sendButtonProps={sendButtonProps}
        />
        {children}
      </Provider>
    );
  },
);
