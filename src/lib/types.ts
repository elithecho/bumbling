import type { Center, User, CenterAdmin } from '@prisma/client'

export type { Center, User, CenterAdmin }

export type CenterAdminWithUser = CenterAdmin & {
  user: User;
};
