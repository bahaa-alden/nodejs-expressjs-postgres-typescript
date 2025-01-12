import { FindOptions } from './base.repository';
import { OrderDirection, OrderOptions } from '../../utils/order';
import { Prisma, User } from '@prisma/client';
import prisma from '../prisma-client';
import { generateHash } from '../../utils/utils';

export interface UserOrderOptions extends OrderOptions {
  column: string;
}

export interface UserFilterOptions {}

export interface FindUserOptions extends FindOptions<UserFilterOptions> {
  order: UserOrderOptions;
}

export class UserRepository {
  private model: Prisma.UserDelegate;

  constructor(model: Prisma.UserDelegate = prisma.user) {
    this.model = model;
  }

  async insert(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await generateHash(data.password);
    return await this.model.create({ data });
  }

  async findAll(): Promise<User[]> {
    return await this.model.findMany({ where: { deletedAt: null } });
  }

  async findOneBy(query: Prisma.UserWhereInput): Promise<User | null> {
    return await this.model.findFirst({ where: { ...query, deletedAt: null } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.model.findFirst({ where: { id, deletedAt: null } });
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return await this.model.findMany({
      where: { id: { in: ids }, deletedAt: null },
    });
  }

  async findBy(query: Prisma.UserWhereInput): Promise<User[]> {
    return await this.model.findMany({ where: { ...query, deletedAt: null } });
  }

  async patchById(id: string, data: Prisma.UserUpdateInput) {
    return await this.model.update({
      where: { id },
      omit: { password: true },
      data,
    });
  }

  async updateMany(
    ids: string[],
    requestData: Prisma.UserUpdateInput,
  ): Promise<Prisma.BatchPayload> {
    return await this.model.updateMany({
      where: { id: { in: ids } },
      data: requestData,
    });
  }

  async deleteById(id: string) {
    return await this.patchById(id, { deletedAt: new Date() });
  }

  async findForUser(options: FindUserOptions) {
    const { pagination, order, search } = options;
    const where: Prisma.UserWhereInput = { deletedAt: null };

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await this.model.findMany({
      where,
      skip: pagination.pageSize * (pagination.page - 1),
      take: pagination.pageSize,
      orderBy: {
        [order.column]: order.direction === OrderDirection.asc ? 'asc' : 'desc',
      },
      omit: { password: true },
    });
  }

  async exists(email: string): Promise<boolean> {
    const doc = await this.model.findFirst({
      where: { email, deletedAt: null },
    });
    return doc !== null;
  }

  async findPrivateProfileById(id: string): Promise<User | null> {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findFirst({
      where: { email, deletedAt: null },
    });
  }
}

export const userRepository = new UserRepository();
