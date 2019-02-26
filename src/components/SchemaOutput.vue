<template>
  <div class="hello">
    <h3>{{ schema.name }}</h3>
    <h4>{{ schema.description }}</h4>
    <small> {{schema.did }}</small>
    <b> {{ name }}</b>

    <b-table striped hover :fields="attr_fields" :items="schema.attr_names">
      <template slot="display" slot-scope="data">
        <span v-if="isPII(data.item.name)" class="pii-label">PII</span>
        {{ data.item.name }}
      </template>
    </b-table>
  </div>

</template>

<script>
export default {
  name: "SchemaOut",
  data() {
    return {
      attr_fields: ["name", "display"]
    };
  },
  computed: {
    schema() {
      return this.$store.state.selectedSchema;
    },
    name() {
        return this.$store.state.name
    }
  },
  methods: {
    isPII(attr) {
      return this.schema.bit.includes(attr);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pii-label {
  color: red;
  font-size: small;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
