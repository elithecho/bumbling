import type { Center, User, CenterAdmin, Classroom } from '@prisma/client'

export type { Center, User, CenterAdmin, Classroom }

export type CenterAdminWithUser = CenterAdmin & {
  user: User;
};
