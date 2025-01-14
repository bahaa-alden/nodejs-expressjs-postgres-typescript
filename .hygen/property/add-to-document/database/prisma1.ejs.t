---
inject: true
to: src/database/prisma/schema.prisma
after:  // add prop <%= Name %>
---
<% if (kind === 'reference' && referenceType === 'oneToOne') { -%>
  <%= property %>Id  String
  <%= property %>     <%= Type %>     @relation( fields: [<%= property %>Id], references: [id]) 
<% } else if (kind === 'reference' && referenceType === 'manyToOne') { -%>
  <%= property %>Id  String
  <%= property %>     <%= Type %>     @relation("<%= Type %><%= Name %>s", fields: [<%= property %>Id], references: [id]) 
<% } else if (kind === 'reference' && referenceType === 'oneToMany' ) { -%>
  <%= h.inflection.pluralize(property) %> <%= Type %>[]  @relation("<%= Name  %><%= Type %>s")
<% } else if (kind === 'enum') { -%>
  <%= property %>    <%= EnumType %><% if (isArray) {-%>[] <% }-%>  @default(<%= enumValue.split(" ")[0] %>)
<% } else if (kind === 'object') { -%>
  <%= property %>    Json<% if (isArray) {-%>? <% }-%>
<% } else  if (kind === 'primitive' && type === 'string') { -%>
  <%= property %>    String<% if (isArray) {-%>[] <% }-%>
<% } else if (kind === 'primitive' && type === 'number') { -%>
  <%= property %>    Float<% if (isArray) {-%>[] <% }-%>
<% } else if (kind === 'primitive' && type === 'boolean') { -%>
  <%= property %>    Boolean <% } -%>