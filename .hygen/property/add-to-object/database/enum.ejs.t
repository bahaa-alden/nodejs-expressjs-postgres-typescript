---
inject: true
to: src/database/prisma/schema.prisma
after:  // add enum 
---
<% if (kind === 'enum' && isEnumDefined === 'no') { -%>
enum <%= EnumType %> {
<%= enumValue %>
}
<% } -%>