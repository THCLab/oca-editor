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
        <b-row align-v="center">
          <b-col cols="8">Add overlay:
            <b-form-select v-model="selected_overlay_id" :options="overlayOptions()" class="mb-3"></b-form-select>
          </b-col>
          <b-col ol="2">
            <b-button v-b-tooltip @click="addOverlay()" block variant="outline-primary">Add</b-button>
          </b-col>
          <b-col ol="2">
            <b-button v-b-tooltip @click="addAllOverlay()" block variant="outline-primary">Add All</b-button>
          </b-col>
        </b-row>
        <ul id="overlay-list">
          <li v-for="overlay in schema_overlays" v-bind:key="overlay.id">
            <b-button
              v-b-tooltip
              :pressed.sync="overlay.on"
              @click="activateOverlay(overlay.id)"
              block
              variant="outline-primary"
            >{{ overlay.name }}</b-button>
          </li>
        </ul>
      </b-col>
      <b-col cols="4">
        <LabelOverlay v-if="overlays[3].on" v-bind:overlay="active_overlay" :schema="schema"/>
        <EncodeOverlay v-if="overlays[1].on" v-bind:overlay="active_overlay" :schema="schema"/>
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
      active_overlay: {},
      labelIsActive: false,
      encodeIsActive: false,
      selected_overlay_id: null,
      schema: "",
      schema_overlays: [],
      overlays: [
        {
          id: "1",
          name: "Source overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description:
            "to point to an external source of predefined Schema attribute definitions (e.g. HL7 FHIR, Schema 2.0, etc.)",
          on: false
        },
        {
          id: "2",
          name: "Encoding overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description:
            "define character encoding (e.g. UTF-8, ISO-8859-1,Windows-1251, Base58Check, etc)",
          on: false
        },
        {
          id: "3",
          name: "Entry overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description: "to add predefined field values to Schema attributes",
          on: false
        },
        {
          id: "4",
          name: "Label overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description:
            "to add labels to Schema attributes (incl. category labels)",
          on: false
        },
        {
          id: "5",
          name: "Format overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description:
            "to add formats (incl. field lengths) to Schema attributes",
          on: false
        },
        {
          id: "6",
          name: "Conditional overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description: "to add simple conditional programming within a Schema;",
          on: false
        },
        {
          id: "7",
          name: "Subset overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description: "to create a Schema subset",
          on: false
        },
        {
          id: "8",
          name: "Information overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description: "to add additional information context",
          on: false
        },
        {
          id: "9",
          name: "Consent overlay",
          did: "ipfs://tasvethclab0j12dj021d",
          description: "to add consent definition",
          on: false
        }
      ]
    };
  },
  created() {
    this.schema = this.$store.getters.getSchema(this.id);
    this.$store.dispatch("selectSchema", this.schema);
  },
  components: {
    LabelOverlay,
    EncodeOverlay,
    SchemaOutput,
    VueBootstrapTypeahead
  },
  computed: {},
  methods: {
    overlayOptions() {
      let options = this.overlays.map(item => {
        return {
          html: "<b>" + item.name + ":</b>" + item.description,
          value: item.id
        };
      });
      return options;
    },
    addOverlay() {
      if (
        !this.schema_overlays.some(item => item.id == this.selected_overlay_id)
      ) {
        let o = this.overlays.find(item => {
          return item.id == this.selected_overlay_id;
        });
        this.schema_overlays.push(o);
      }
    },
    addAllOverlay() {
      this.schema_overlays = this.overlays
    },
    activateOverlay(overlay_id) {
      var self = this;
      let index = this.overlays.findIndex(item => item.id == overlay_id);
      this.overlays.forEach(item => (item.on = false));
      this.overlays[index].on = true;
      this.active_overlay = this.overlays[index]
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