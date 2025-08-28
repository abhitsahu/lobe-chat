import { TypeIcon } from 'lucide-react';
import { memo } from 'react';

import { useChatInput } from '../../hooks/useChatInput';
import Action from '../components/Action';

const Typo = memo(() => {
  const { showTypoBar, setShowTypoBar } = useChatInput();

  return (
    <Action active={showTypoBar} icon={TypeIcon} onClick={() => setShowTypoBar?.(!showTypoBar)} />
  );
});

export default Typo;
