<template>
  <b-container class>
    <b-row align-h="center">
      <b-col cols="12">
        <h3>
          Overlays for
          <b>{{ schema.name }}</b> schema base
        </h3>
      </b-col>
      <b-col cols="6">
        <ul id="overlay-list">
          <li v-for="overlay in overlays">
            <b-button v-b-tooltip :title="overlay.description" :pressed.sync="overlay.on" block variant="outline-primary">
                {{ overlay.name }}
                </b-button>
          </li>
        </ul>
      </b-col>
      <b-col cols="6">result</b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

export default {
  name: "app",
  props: {
    id: String
  },
  data() {
    return {
      schema: "",
      overlays: [
        {
          name: "Source overlay",
          description:
            "to point to an external source of predefined Schema attribute definitions (e.g. HL7 FHIR, Schema 2.0, etc.)",
          on: true
        },
        {
          name: "Encode overlay",
          description:
            "define character encoding (e.g. UTF-8, ISO-8859-1,Windows-1251, Base58Check, etc)",
          on: false
        },
        {
          name: "Entry overlay",
          description: "to add predefined field values to Schema attributes",
          on: false
        },
        {
          name: "Label overlay",
          description:
            "to add labels to Schema attributes (incl. category labels)",
          on: false
        },
        {
          name: "Format overlay",
          description:
            "to add formats (incl. field lengths) to Schema attributes",
          on: false
        },
        {
          name: "Conditional overlay",
          description: "to add simple conditional programming within a Schema;",
          on: false
        },
        {
          name: "Subset overlay",
          description: "to create a Schema subset",
          on: false
        },
        {
          name: "Information overlay",
          description: "to add additional information context",
          on: false
        },
        {
          name: "Consent overlay",
          description: "to add consent definition",
          on: false
        }
      ],
      overlay: ""
    };
  },
  mounted() {
    this.schema = this.$store.getters.getSchema(this.id);
  },
  components: { VueBootstrapTypeahead },
  computed: {},
  methods: {
    addOverlay() {
      // show modal?
    }
  }
};
</script>

<style lang="scss" scoped>
#overlay-list {
  list-style-type: none;
  margin-left: 0;
  li {
      margin: 5px;
  }
}
</style>