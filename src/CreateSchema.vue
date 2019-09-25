<template>
  <div>
    <div class="main-layout">
      <form-builder type="template" v-model="formData" :options="formBuilderOptions"></form-builder>
    </div>
    <div class="text-right mt-3" style="margin: 0px 20px;">
      <button class="btn btn-default" @click="resetForm">Reset</button>
      <button class="btn btn-primary" @click="saveForm">Save</button>
    </div>
  </div>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import FormBuilder from 'v-form-builder';
import {get_form, update_form, save_form} from "./persistence";

export default {
  name: "app",
  components: {
    FormBuilder
  },
  methods: {
    resetForm() {
      this.formData.type = "";
      this.formData.sections = [];
    },
    loadOldForm() {
      let data = get_form(this.name);
      try {
        this.formData = JSON.parse(data);
      } catch(e) {
        SethPhatToaster.error("Incorrect JSON model");
      }
    },
    saveForm() {
      if (this.name === "") {
        SethPhatToaster.error("Please input your form config title");
        return;
      }
      if (this.id !== "") {
        update_form(this.id, this.name, this.formData);
      } else {
        save_form(this.name, this.formData);
      }
      SethPhatToaster.success("ok");
    },
    markPII(attr) {
      this.form.bit.push(attr);
    },
    unmarkPII(attr) {
      this.form.bit = this.form.bit.filter(function(item) {
        return item !== attr;
      });
    },
    isPII(attr) {
      return this.form.bit.includes(attr);
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
      let attr_name = self.attribute
      var index = self.form.attr_names.findIndex(function(item) {
        return item.name == self.attribute;
      });
      if (index == -1) {
        self.form.attr_names.push({ name: attr_name });
        if (this.default_bit.includes(attr_name)) {
          self.form.bit.push(attr_name)
        }
      }
      self.attribute = "";
      // TODO above does not work as the input does not support that yet see #38
      // instead we have to use this:
      this.$refs.attributeAutocomplete.inputValue = "";
    },
    removeAttribute(attr_name) {
      var index = this.form.attr_names.findIndex(function(item) {
        return item.name == attr_name;
      });
      this.$delete(this.form.attr_names, index);
    }
  },
  created() {
    this.loadOldForm();
  },
  beforeDestroy() {
    this.formData = null;
  },
  data() {
    return {
      name: "testName",
      formData: null,
      id: "",
      formBuilderOptions: {
        hooks: {
          'Section.beforeAdd': function(sectionInfo) {
            console.log(sectionInfo)
          }
          // https://github.com/sethsandaru/vue-form-builder/wiki/Template-Hooks
        }
      },
      default_bit: [
        "first_name",
        "last_name",
        "mac_address",
        "name",
        "entity_name",
        "full_name",
        "address",
        "street",
        "city",
        "building_number",
        "email",
        "postal_code",
        "zip_code",
        "skype",
        "linkedin_profile_url",
        "facebook_profile_url",
        "passport_number",
        "social_security_number",
        "national_id",
        "national_insurance_number",
        "VIN",
        "IBAN",
        "credit_card",
        "debit_card",
        "PIN",
        "DID",
        "employee_identifier",
        "account_identifier",
        "membership_identifier",
        "institutional_identifier",
        "case_identifier",
        "user_identifier",
        "password",
        "signature",
        "digital_certificate",
        "photo",
        "video",
        "vocal_sound_bits",
        "birth_date",
        "transaction_date",
        "chromosomal",
        "DNA",
        "RNA",
        "voice_prints",
        "iris_scan",
        "facial_image",
        "ip",
        "SSID",
        "bluetooth_mac_address",
        "GPS_coordinates",
        "browser_fingerprint",
        "iot_identifier",
        "IMEI",
        "IMSI",
        "text"
      ],
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
        attr_names: [],
        bit: []
      }
    };
  }
};
</script>



<style>
.pii-label {
  color: red;
  font-size: small;
}
</style>
