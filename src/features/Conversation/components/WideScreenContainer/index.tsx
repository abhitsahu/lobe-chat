'use client';

import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    align-self: center;
    transition: width 0.25s ${token.motionEaseInOut};
  `,
}));

const WideScreenContainer = memo<FlexboxProps>(({ children, className, ...rest }) => {
  const { cx, styles } = useStyles();
  const wideScreen = useGlobalStore(systemStatusSelectors.wideScreen);

  return (
    <Flexbox
      className={cx(styles.container, className)}
      width={wideScreen ? '100%' : 'min(1024px, 100%)'}
      {...rest}
    >
      {children}
    </Flexbox>
  );
});

export default WideScreenContainer;
