<template>
  <div id="recipients" class="p-8 mt-6 rounded shadow bg-white">
    <table id="example" class="stripe hover">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.name">{{col.label}}</th>
          <th v-if="actions.edit || actions.delete">Action</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(item, index) in items" :key="index">
              <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column.name]}}</td>              
              <td v-if="actions">
                <span v-if="actions.edit" @click="$emit('edit', item.user_id)" class="cursor-pointer"><i class="fas fa-edit"></i></span>
                <span v-if="actions.delete" @click="$emit('delete', item.user_id)" class="cursor-pointer"><i class="fas fa-trash ml-3 text-red-700"></i></span>
              </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["columns", "items", "actions"],
  head: {
    script: [
      { src: "https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" }
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"
      }
    ]
  },
  beforeMount() {
    this.coba();    
  },
  methods: {
    coba: function() {
      $(document).ready(function() {
        var table = $("#example")
          .DataTable({
            responsive: true
          })
          .columns.adjust();
      });
    }
  }
};
</script>

<style>
/*Form fields*/
.dataTables_wrapper select,
.dataTables_wrapper .dataTables_filter input {
  color: #4a5568; /*text-gray-700*/
  padding-left: 1rem; /*pl-4*/
  padding-right: 1rem; /*pl-4*/
  padding-top: 0.5rem; /*pl-2*/
  padding-bottom: 0.5rem; /*pl-2*/
  line-height: 1.25; /*leading-tight*/
  border-width: 2px; /*border-2*/
  border-radius: 0.25rem;
  border-color: #edf2f7; /*border-gray-200*/
  background-color: #edf2f7; /*bg-gray-200*/
  margin-bottom: 20px;
}

/*Row Hover*/
table.dataTable.hover tbody tr:hover,
table.dataTable.display tbody tr:hover {
  background-color: #ebf4ff; /*bg-indigo-100*/
}

/*Pagination Buttons*/
.dataTables_wrapper .dataTables_paginate .paginate_button {
  font-weight: 700; /*font-bold*/
  border-radius: 0.25rem; /*rounded*/
  border: 1px solid transparent; /*border border-transparent*/
}

/*Pagination Buttons - Current selected */
.dataTables_wrapper .dataTables_paginate .paginate_button.current {
  color: #fff !important; /*text-white*/
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /*shadow*/
  font-weight: 700; /*font-bold*/
  border-radius: 0.25rem; /*rounded*/
  background: #667eea !important; /*bg-indigo-500*/
  border: 1px solid transparent; /*border border-transparent*/
}

/*Pagination Buttons - Hover */
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
  color: #fff !important; /*text-white*/
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /*shadow*/
  font-weight: 700; /*font-bold*/
  border-radius: 0.25rem; /*rounded*/
  background: #667eea !important; /*bg-indigo-500*/
  border: 1px solid transparent; /*border border-transparent*/
}

/*Add padding to bottom border */
table.dataTable.no-footer {
  border-bottom: 1px solid #e2e8f0; /*border-b-1 border-gray-300*/
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

/*Change colour of responsive icon*/
table.dataTable.dtr-inline.collapsed > tbody > tr > td:first-child:before,
table.dataTable.dtr-inline.collapsed > tbody > tr > th:first-child:before {
  background-color: #667eea !important; /*bg-indigo-500*/
}
</style>