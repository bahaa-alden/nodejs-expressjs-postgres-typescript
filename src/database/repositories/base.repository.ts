import { PaginationOptions } from '../../utils/pagination';
import { OrderOptions } from '../../utils/order';
import { Prisma } from '@prisma/client';
import prisma from '../prisma-client';

export interface FindOptions<T> {
  order: OrderOptions;
  pagination: PaginationOptions;
  filter?: T;
  search?: string;
}

export class BaseRepository<T, B, Q, U> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async insert(data: B): Promise<T> {
    return await this.model.create({ data });
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany({ where: { deletedAt: null } });
  }

  async findOneBy(query: Q): Promise<T | null> {
    return await this.model.findFirst({ where: { ...query, deletedAt: null } });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findFirst({ where: { id, deletedAt: null } });
  }

  async deleteById(id: string) {
    const data = { deletedAt: new Date() };
    return await this.model.update({
      where: { id },
      data,
    });
  }
  async findByIds(ids: string[]): Promise<T[]> {
    return await this.model.findMany({
      where: { id: { in: ids }, deletedAt: null },
    });
  }

  async findBy(query: Q): Promise<T[]> {
    return await this.model.findMany({ where: { ...query, deletedAt: null } });
  }

  async patchById(id: string, data: U) {
    return await this.model.update({
      where: { id },
      data,
    });
  }
  async updateMany(
    ids: string[],
    requestData: U,
  ): Promise<Prisma.BatchPayload> {
    return await this.model.updateMany({
      where: { id: { in: ids } },
      data: requestData,
    });
  }
}
