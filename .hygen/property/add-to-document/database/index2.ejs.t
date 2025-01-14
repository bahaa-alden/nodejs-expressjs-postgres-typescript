---
inject: true
to: src/database/prisma/schema.prisma
after:  <% if (kind === 'reference' && referenceType === 'oneToMany') { -%>// add index <%= Type %><% }  -%>
---
<% if (kind === 'reference' && referenceType === 'oneToMany') { -%>  @@index([<%= name %>Id]) <% }  -%>