---
inject: true
to: src/controllers/<%= nameDash %>.controller.ts
after:  // set id
---
<% if (kind === 'reference' && (referenceType === 'oneToOne' || referenceType === 'manyToOne')) { -%>
  <%= property %>: {
      connect: { id: <%= property %>Id  },
    },
<% } -%>