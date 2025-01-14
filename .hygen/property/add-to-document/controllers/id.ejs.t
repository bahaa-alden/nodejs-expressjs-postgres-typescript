---
inject: true
to: src/controllers/<%= nameDash %>.controller.ts
after:  // get id
---
<% if (kind === 'reference' && (referenceType === 'oneToOne' || referenceType === 'manyToOne')) { -%>
  <%= property %>Id ,
<% } -%>