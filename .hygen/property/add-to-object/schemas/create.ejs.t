---
inject: true
to: src/schemas/<%= nameDash %>.schema.ts
after: // <creating-property-create-schema\-<%= object %> />
---
<% if (isAddToValidation) { -%>
 <%  if (kind === 'enum') { -%>
    <%= property %>: z<% if (isArray) {-%>.array( z<% }-%>.nativeEnum(<%= EnumType %>)<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
 <% } else { -%>    
    <%= property %>: <% if (isArray) {-%>z.array( <% }-%>z.<%= type %>()<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>