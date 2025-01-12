import { z, TypeOf } from 'zod';
import { cuid, orderColumn, orderDirection, page, pageSize } from './common';
import { UserStatus } from '@prisma/client';

const userIdSchema = z.object({
  id: cuid,
});

export type IUserIdSchema = TypeOf<typeof userIdSchema>;

const userUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    status: z.nativeEnum(UserStatus).optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();

export type IUserUpdateSchema = TypeOf<typeof userUpdateSchema>;

const userAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
});

export type IUserAllSchema = TypeOf<typeof userAllSchema>;

export default {
  userId: userIdSchema,
  updateUser: userUpdateSchema,
  userAll: userAllSchema,
};
