<template>
  <b-container class>
    <b-row align-h="center">
      <b-col cols="12">Overlays for <b>{{ schema.name }} </b> schema base</b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  props: {
    id: String  
  },
  data() {
    return {
        schema: ""
    };
  },
  mounted() {
      this.schema = this.$store.getters.getSchema(this.id)
  },
  components: {},
  computed: {
  },
  methods: {}
};
</script>

<style>
</style>
