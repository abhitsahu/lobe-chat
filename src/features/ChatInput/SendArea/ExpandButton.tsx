import { ActionIcon } from '@lobehub/ui';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';
import { memo } from 'react';

import { useChatInput } from '../hooks/useChatInput';

const ExpandButton = memo(() => {
  const { expand, setExpand } = useChatInput();
  return (
    <ActionIcon
      className="show-on-hover"
      icon={expand ? Minimize2Icon : Maximize2Icon}
      onClick={() => setExpand?.(!expand)}
      size={{ blockSize: 32, size: 16, strokeWidth: 2.3 }}
    />
  );
});

ExpandButton.displayName = 'ExpandButton';

export default ExpandButton;
