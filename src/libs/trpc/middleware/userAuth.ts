import { TRPCError } from '@trpc/server';

import { enableAuth, enableClerk } from '@/const/auth';
import { DESKTOP_USER_ID } from '@/const/desktop';
import { isDesktop } from '@/const/version';

import { trpc } from '../lambda/init';

export const userAuth = trpc.middleware(async (opts) => {
  const { ctx } = opts;

  if (isDesktop) {
    return opts.next({
      ctx: { userId: DESKTOP_USER_ID },
    });
  }

  if (!enableAuth) {
    return opts.next({
      ctx: { userId: 'anonymous' },
    });
  }

  if (!ctx.userId) {
    if (enableClerk) {
      console.log('clerk auth:', ctx.clerkAuth);
    } else {
      console.log('next auth:', ctx.nextAuth);
    }
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: { userId: ctx.userId },
  });
});
