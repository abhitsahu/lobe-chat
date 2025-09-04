import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useChatInputStore } from '../store';
import ExpandButton from './ExpandButton';
import SaveTopic from './SaveTopic';
import SendButton from './SendButton';

const SendArea = memo(() => {
  const allowExpand = useChatInputStore((s) => s.allowExpand);
  return (
    <Flexbox align={'center'} flex={'none'} gap={6} horizontal>
      {allowExpand && <ExpandButton />}
      <SaveTopic />
      <SendButton />
    </Flexbox>
  );
});

SendArea.displayName = 'SendArea';

export default SendArea;
