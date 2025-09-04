import { useEditor } from '@lobehub/editor/react';
import { ReactNode, memo, useRef } from 'react';

import StoreUpdater, { StoreUpdaterProps } from './StoreUpdater';
import { Provider, createStore } from './store';

interface ChatInputProviderProps extends StoreUpdaterProps {
  children: ReactNode;
}

export const ChatInputProvider = memo<ChatInputProviderProps>(
  ({ children, actions, mobile, sendButtonProps }) => {
    const editorRef = useEditor();
    const slashMenuRef = useRef<HTMLDivElement>(null);

    return (
      <Provider
        createStore={() =>
          createStore({ actions, editorRef, mobile, sendButtonProps, slashMenuRef })
        }
      >
        <StoreUpdater sendButtonProps={sendButtonProps} />
        {children}
      </Provider>
    );
  },
);
