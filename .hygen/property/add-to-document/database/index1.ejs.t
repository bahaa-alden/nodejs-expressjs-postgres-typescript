---
inject: true
to: src/database/prisma/schema.prisma
after:  // add index <%= Name %>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
   @@index([<%= property %>Id]) 
<% }  -%>