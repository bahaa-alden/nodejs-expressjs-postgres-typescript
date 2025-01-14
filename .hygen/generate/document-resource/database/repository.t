---
to: src/database/repositories/<%= nameDash %>.repository.ts
---
import { <%= Name %>, Prisma } from '@prisma/client';
import { type PaginatedList } from '../../utils/pagination'
import { OrderDirection, type OrderOptions } from '../../utils/order'
import { BaseRepository, type FindOptions } from './base.repository'
import prisma from '../prisma-client';

export interface <%= Name %>FilterOptions {
  // add Filter
}

export interface <%= Name %>FindOptions extends FindOptions<<%= Name %>FilterOptions> {
  order: OrderOptions
}

export class <%= Name %>Repository extends BaseRepository<<%= Name %>,
  Prisma.<%= Name %>CreateInput,
  Prisma.<%= Name %>WhereInput,
  Prisma.<%= Name %>UpdateInput> {
  constructor() {
    super(prisma.<%= name %>);
  }

  async findForAdmin(options: <%= Name %>FindOptions): Promise<PaginatedList<<%= Name %>>> {
    const { order, pagination, search } = options

    const query:  Prisma.<%= Name %>WhereInput = { deletedAt: null }
    if (search) {
      query.OR = []
    }

      return await this.model.findMany({
      query,
      skip: pagination.pageSize * (pagination.page - 1),
      take: pagination.pageSize,
      orderBy: {
        [order.column]: order.direction === OrderDirection.asc ? 'asc' : 'desc',
      },
    });
    }
}

export const <%= name %>Repository = new <%= Name %>Repository()
