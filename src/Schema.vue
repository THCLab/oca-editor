<template>
  <b-container class>
    <b-row align-h="center">
      <b-col cols="12">
        <b-table striped hover :fields="attr_fields" :items="schemas">

          <template slot="actions" slot-scope="data">
                  <b-button variant="link" @click="showSchema(data.item.name)">
                    <font-awesome-icon icon="edit"></font-awesome-icon>
                  </b-button>
                  <b-button
                    variant="link"
                    @click="deleteSchema(data.item.name)"
                  >
                    <font-awesome-icon icon="trash"></font-awesome-icon>
                  </b-button>
                </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      attr_fields: [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "actions", label: "" }
      ]
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      schemas: "getSchemas"
    })
  },
  methods: {
    showSchema() {
      
    },
    deleteSchema() {

    },
  }
};
</script>

<style>
</style>
