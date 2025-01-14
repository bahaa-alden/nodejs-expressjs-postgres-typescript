---
inject: true
to: src/database/prisma/schema.prisma
after:  <% if (kind === 'reference') { -%>// add prop <%= Type %><% } -%>
---
<% if (kind === 'reference') { -%><% if (referenceType === 'oneToOne') { -%>
  <%= name %>  <%= Name %>     @relation("<%= Type %><%= Name %>") 
<% } else if (referenceType === 'manyToOne') { -%>
  <%= h.inflection.pluralize(name) %>     <%= Name %>[]     @relation("<%= Type %><%= Name %>s") 
<% } else if (referenceType === 'oneToMany' ) { -%>
  <%= name %>Id  String
  <%= name %>  <%= Name %>  @relation("<%= Name  %><%= Type %>s", fields: [<%= name %>Id], references: [id]) <% }-%><% }-%>