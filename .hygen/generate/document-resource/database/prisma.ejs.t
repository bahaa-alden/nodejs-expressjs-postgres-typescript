---
inject: true
to: src/database/prisma/schema.prisma
after:  // create table
---
model <%= Name %> {
  id        String   @id @default(cuid())
  // add prop <%= Name %>
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
}