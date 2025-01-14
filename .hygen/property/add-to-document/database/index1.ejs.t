---
inject: true
to: src/database/prisma/schema.prisma
after:  <% if (kind === 'reference' && (referenceType === 'oneToOne' || referenceType === 'manyToOne')) { -%>// add index <%= Name %><% } -%>
---
<% if (kind === 'reference' && (referenceType === 'oneToOne' || referenceType === 'manyToOne')) { -%>  @@index([<%= property %>Id]) <% } -%>