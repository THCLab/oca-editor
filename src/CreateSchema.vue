<template>
  <b-container id="app" class="bv-example-row">
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Schema Base & Overlays</h1>
      </b-col>

      <b-col sm="10" lg="81">
        <b-form @submit.prevent @reset="onReset">
          <b-form-group
            id="nameGroup"
            description="Name of the schema base which you are creating. E.g. Driving licence"
          >
            <b-form-input
              id="nameInput"
              type="text"
              v-model="form.name"
              required
              size="lg"
              placeholder="Enter name"
            />
          </b-form-group>

          <b-form-group
            id="descGroup"
            description="Provide description for schema. E.g. Official driving licence schema issued by Gov"
          >
            <b-form-input
              id="descInput"
              type="text"
              v-model="form.description"
              required
              size="lg"
              description="Provide meaningful description for your schama base"
              placeholder="Enter description"
            />
          </b-form-group>

          <b-form-row>
            <b-col cols="6">
              <b-table striped hover :fields="attr_fields" :items="form.attr_names">
                <template slot="name" slot-scope="data">
                  <span class="pii-label" v-if="isPII(data.item.name)">PII</span>
                  {{data.item.name}}
                </template>
                <template slot="actions" slot-scope="data">
                  <b-button variant="link" @click="removeAttribute(data.item.name)">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                  </b-button>
                  <b-button
                    v-if="!isPII(data.item.name)"
                    variant="outline-danger"
                    @click="markPII(data.item.name)"
                  >
                    <font-awesome-icon icon="lock"></font-awesome-icon>
                  </b-button>
                  <b-button
                    v-if="isPII(data.item.name)"
                    variant="outline-success"
                    @click="unmarkPII(data.item.name)"
                  >
                    <font-awesome-icon icon="unlock"></font-awesome-icon>
                  </b-button>
                </template>
              </b-table>
            </b-col>
            <b-col cols="6">
              <b-row>
                <b-col cols="8">
                  <b-form-group id="attrGroup" description="Attribute name">
                    <vue-bootstrap-typeahead
                      ref="attributeAutocomplete"
                      textVariant="danger"
                      @hit="addAttribute"
                      v-model="attribute"
                      :data="bit"
                    >
                      <template slot="suggestion" slot-scope="{ data, htmlText }">
                        PII:
                        <span v-html="htmlText"></span>&nbsp;
                        <small>{{ data.code }}</small>
                      </template>
                    </vue-bootstrap-typeahead>
                  </b-form-group>
                </b-col>
                <b-col cols="4">
                  <b-col align-hself="start" align-h="start" cols="2">
                    <b-button variant="primary" @click="addAttribute">
                      <font-awesome-icon icon="plus"></font-awesome-icon>
                    </b-button>
                  </b-col>
                </b-col>
              </b-row>
            </b-col>
          </b-form-row>
          <b-row>
            <b-col>
              <b-button @click="onCreateSchema" type="submit" variant="primary">Create</b-button>
            </b-col>
            <b-col>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

export default {
  name: "app",
  data() {
    return {
      bit: ["first_name", "last_name", "mac_address"],
      attr_fields: [
        { key: "name", label: "Attribute name" },
        { key: "actions", label: "" }
      ],
      attribute: "",
      form: {
        name: "",
        description: "",
        did: "",
        version: "1",
        attr_names: []
      }
    };
  },
  components: {
    VueBootstrapTypeahead
  },
  methods: {
    markPII(attr) {
      this.bit.push(attr);
    },
    unmarkPII(attr) {
      this.bit = this.bit.filter(function(item) {
        return item !== attr;
      });
    },
    isPII(attr) {
      return this.bit.includes(attr);
    },
    onCreateSchema() {
      var self = this;
      self.$store.commit("addSchema", self.form);
      this.$router.push("schemas");
    },
    onReset() {
      this.form.attr_names = [];
    },
    format(value, event) {
      // TODO restrict to numbers, latters and underscore
      return value.toLowerCase();
    },
    addAttribute() {
      var self = this;
      var index = self.form.attr_names.findIndex(function(item) {
        return item.name == self.attribute;
      });
      if (index == -1) {
        self.form.attr_names.push({ name: self.attribute });
      }
      self.attribute = "";
      // TODO above does not work as the input does not support that yet see #38
      // instead we have to use this:
      this.$refs.attributeAutocomplete.inputValue = "";
    },
    removeAttribute(attr_name) {
      console.log(attr_name);
      var index = this.form.attr_names.findIndex(function(item) {
        console.log(item);
        return item.name == attr_name;
      });
      console.log(index);
      this.$delete(this.form.attr_names, index);
    }
  }
};
</script>



<style>
.pii-label {
  color: red;
  font-size: small;
}
</style>
