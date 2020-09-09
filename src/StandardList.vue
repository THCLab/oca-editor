<template>
  <b-container class>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table striped hover :fields="attr_fields" :items="standards">
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "standard-list",
  data() {
    return {
      standards: [],
      attr_fields: [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" }
      ]
    };
  },
  methods: {},
};
</script>

<style>
</style>
