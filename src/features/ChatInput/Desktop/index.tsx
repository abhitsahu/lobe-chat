'use client';

import { ChatInput, ChatInputActionBar } from '@lobehub/editor/react';
import { createStyles } from 'antd-style';
import { memo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';

import ActionBar from '../ActionBar';
import InputEditor from '../InputEditor';
import SendArea from '../SendArea';
import TypoBar from '../TypoBar';
import { useChatInput } from '../hooks/useChatInput';
import FilePreview from './FilePreview';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    .show-on-hover {
      display: none;
    }

    &:hover {
      .show-on-hover {
        display: flex;
      }
    }
  `,
  fullscreen: css`
    position: absolute;
    z-index: 100;
    inset: 0;

    width: 100%;
    height: 100%;
    padding: 12px;

    background: ${token.colorBgContainerSecondary};
  `,
}));

const DesktopChatInput = memo(() => {
  const { slashMenuRef, expand, showTypoBar, editorRef, actions } = useChatInput();
  const chatKey = useChatStore(chatSelectors.currentChatKey);
  const { styles, cx } = useStyles();

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current?.focus();
  }, [chatKey]);

  const fileNode = actions.flat().includes('fileUpload') && <FilePreview />;

  return (
    <>
      {!expand && fileNode}
      <Flexbox
        className={cx(styles.container, expand && styles.fullscreen)}
        paddingBlock={'0 12px'}
        paddingInline={12}
      >
        <ChatInput
          footer={
            <ChatInputActionBar
              left={<ActionBar />}
              right={<SendArea />}
              style={{
                paddingRight: 8,
              }}
            />
          }
          fullscreen={expand}
          header={showTypoBar && <TypoBar />}
          slashMenuRef={slashMenuRef}
        >
          {expand && fileNode}
          <InputEditor />
        </ChatInput>
      </Flexbox>
    </>
  );
});

DesktopChatInput.displayName = 'DesktopChatInput';

export default DesktopChatInput;
