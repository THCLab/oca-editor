<template>
  <b-container fluid class>
    <b-row align-h="center">
      <b-col cols="12">
        <h3>
          Overlays for
          <b>{{ schema.name }}</b> schema base
        </h3>
      </b-col>
      <b-col cols="4">
        <ul id="overlay-list">
          <li v-for="overlay in overlays">
            <b-button
              v-b-tooltip
              :pressed.sync="overlay.on"
              @click="overlayToggled(overlay)"
              block
              variant="outline-primary"
            >{{ overlay.name }}</b-button>
          </li>
        </ul>
      </b-col>
      <b-col cols="4">
        <LabelOverlay v-if="labelOverlayOn" :overlay="overlay" :schema="schema"/>
        <EncodeOverlay v-if="encodingOverlayOn" :overlay="overlay" :schema="schema"/>
      </b-col>
      <b-col cols="4">
        <SchemaOutput :schema="schema"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import SchemaOutput from "@/components/SchemaOutput.vue";
import LabelOverlay from "@/components/LabelOverlay.vue";
import EncodeOverlay from "@/components/EncodeOverlay.vue";

export default {
  name: "app",
  props: {
    id: String
  },
  data() {
    return {
      labelOverlayOn: false,
      encodingOverlayOn: false,
      overlay: "",
      schema: "",
      overlay_content: "",
      overlays: [
        {
          name: "Source overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description:
            "to point to an external source of predefined Schema attribute definitions (e.g. HL7 FHIR, Schema 2.0, etc.)",
          on: false
        },
        {
          name: "Encoding overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description:
            "define character encoding (e.g. UTF-8, ISO-8859-1,Windows-1251, Base58Check, etc)",
          on: false
        },
        {
          name: "Entry overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description: "to add predefined field values to Schema attributes",
          on: false
        },
        {
          name: "Label overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description:
            "to add labels to Schema attributes (incl. category labels)",
          on: false
        },
        {
          name: "Format overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description:
            "to add formats (incl. field lengths) to Schema attributes",
          on: false
        },
        {
          name: "Conditional overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description: "to add simple conditional programming within a Schema;",
          on: false
        },
        {
          name: "Subset overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description: "to create a Schema subset",
          on: false
        },
        {
          name: "Information overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description: "to add additional information context",
          on: false
        },
        {
          name: "Consent overlay",
          did: "ipfs://tasvethclab0j12dj021d",

          description: "to add consent definition",
          on: false
        }
      ],
      overlay: ""
    };
  },
  created() {
    this.schema = this.$store.getters.getSchema(this.id);
    this.$store.dispatch("selectSchema", this.schema);
  },
  components: { LabelOverlay, EncodeOverlay, SchemaOutput },
  computed: {},
  methods: {
    addOverlay() {
      // show modal?
    },
    overlayToggled(overlay) {
      this.overlay_content = overlay.description;
      console.log(overlay);
      if (overlay.name == "Label overlay") {
        this.labelOverlayOn = overlay.on;
        this.encodingOverlayOn = false;
      }
      if (overlay.name == "Encoding overlay") {
        this.encodingOverlayOn = overlay.on;
        this.labelOverlayOn = false;
      }

      this.overlay = overlay;
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
h3 {
  margin-bottom: 50px;
}
</style>