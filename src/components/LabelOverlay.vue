<template>
  <div class="hello">
    <h3>{{ overlay.name }}</h3>
    <h4>{{ overlay.description }}</h4>
    <small>{{overlay.did}}</small>

    <ul id="example-1">
      <ul id="example-1">
        <li v-for="attr in schema.attr_names">
          {{ attr.name }}
          <b-input v-model="schema.attr_names[attr.name]"/>
        </li>
      </ul>
    </ul>

    <b-container>
      <b-row align-h="center">
        <b-col>
          <b-button variant="primary" @click="apply">Apply</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LabelOverlay",
  props: {
    overlay: Object
  },
  data() {
    return {
      localSchema: ""
    };
  },
  computed: {
    schema: {
      get() {
        return this.$store.state.selectedSchema;
      },
      set(value) {
        this.$store.commit("updateSchema", value);
      }
    }
  },
  methods: {
    apply() {
      this;
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
