<template>
  <b-container class>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table striped hover :fields="attr_fields" :items="schemas" @row-clicked='showSchema'>
          <template v-slot:cell(operations)="row">
            <b-button variant="outline-danger" @click="deleteSchema(row.item)" size="sm" class="mr-2">
              Delete
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { get_schemas, delete_schema } from "./persistence";

export default {
  name: "schema-list",
  data() {
    return {
      schemas: [],
      attr_fields: [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "operations", label: "Operations" }
      ]
    };
  },
  methods: {
    showSchema(row) {
      this.$router.push({ path: `schemas/${row.name}` });
    },
    deleteSchema(row) {
      delete_schema(row.name);
      this.schemas = get_schemas();
    }
  },
  created() {
    this.schemas = get_schemas()
  }
};
</script>

<style>
  td:hover {
    cursor: pointer;
  }
</style>
