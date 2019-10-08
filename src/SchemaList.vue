<template>
  <b-container class>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table striped hover :fields="attr_fields" :items="schemas" @row-clicked='showSchema'>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { get_schemas } from "./persistence";

export default {
  name: "schema-list",
  data() {
    return {
      attr_fields: [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" }
      ]
    };
  },
  components: {},
  computed: {
    schemas: get_schemas
  },
  methods: {
    showSchema(row) {
      this.$router.push({ path: `schemas/${row.name}` });
    },
    deleteSchema() {

    },
  }
};
</script>

<style>
</style>
