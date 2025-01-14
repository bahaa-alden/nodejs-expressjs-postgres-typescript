---
inject: true
to: src/database/prisma/schema.prisma
after:  // add index <%= Type %>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToMany'{ -%>
   @@index([<%= name %>Id]) 
<% }  -%>