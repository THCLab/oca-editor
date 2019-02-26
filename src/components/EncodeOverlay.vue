<template>
  <div class="hello">
    <h3>{{ overlay.name }}</h3>
    <h4>{{ overlay.description }}</h4>
    <small> {{overlay.did}}</small>

    <ul id="example-1">
      <li v-for="attr in schema.attr_names">
        {{ attr.name }}
        <b-input/>
      </li>
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

export default {
  name: "EncodeOverlay",
  props: {
    overlay: Object
  },
  data() {
    return {
    };
  },
  computed: {
    schema() {
        return this.$store.state.selectedSchema
    },
  },
  methods: {
    apply() {}
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
