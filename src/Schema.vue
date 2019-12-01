<template>
  <div>
    <div class="main-layout">
      <div class="schema-info">
        <h1>{{name}}</h1>
      </div>
      <form-builder type="template" v-model="formData" :options="formBuilderOptions"></form-builder>
    </div>
    <div class="text-right mt-3" style="margin: 0px 20px;">
      <button class="btn btn-default" @click="resetForm">Reset</button>
      <button class="btn btn-primary" @click="saveForm">Save</button>
    </div>
  </div>
</template>

<script>
import FormBuilder from './FormBuilder';
import {get_form, update_form, save_form} from "./persistence";

export default {
  name: "schema",
  components: {
    FormBuilder
  },
  props: ["name"],
  methods: {
    resetForm() {
      this.formData.section.row.controls = [];
    },
    loadOldForm() {
      try {
        this.formData = JSON.parse(get_form(this.name));
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
      SethPhatToaster.success("Saved");
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
      formData: null,
      id: "",
      formBuilderOptions: {
        hooks: {
          'Section.beforeAdd': function(sectionInfo) {
            console.log(sectionInfo)
          }
        }
      }
    };
  }
};
</script>

<style scope>
  .schema-info {
    padding-left: 40px;
    text-align: left;
  }
</style>
