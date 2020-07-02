<template>
  <div>
    <div class="main-layout">
      <div class="schema-info">
        <h1>{{name}}</h1>
      </div>
      <form-builder type="template" ref='FormBuilder' v-model="formData" :options="formBuilderOptions">
        <template #afterSidebar>
          <div class="text-right mt-3">
            <button class="btn btn-default" @click="resetForm">Reset</button>
            <button class="btn btn-primary" @click="saveForm">Save</button>
          </div>
        </template>
      </form-builder>
    </div>
  </div>
</template>

<script>
import { FormBuilder, EventHandlerConstant, eventBus } from 'odca-form';
import {get_form, update_form, save_form} from "./persistence";
import {SethPhatToaster} from "./config/toaster";

export default {
  name: "schema",
  components: {
    FormBuilder
  },
  props: ["name"],
  methods: {
    resetForm() {
      this.formData.sections.forEach(s => s.row.controls = []);
    },
    loadOldForm() {
      try {
        this.formData = JSON.parse(get_form(this.name));
        this.id = this.formData.uuid
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
  mounted() {
    this.$refs.FormBuilder
      .$refs.FormBuilderTemplate
      .$refs.SectionComponent
      .publishForm.host = process.env.VUE_APP_DEFAULT_OCA_REPOSITORY || ""
    this.$refs.FormBuilder
      .$refs.FormBuilderTemplate
      .$refs.PreviewComponent
      .hashlinkInfo.fileserver = process.env.VUE_APP_DEFAULT_FILESERVER || ""
    this.$refs.FormBuilder
      .$refs.FormBuilderTemplate
      .$refs.PreviewComponent
      .hashlinkInfo.ocaRepo.host = process.env.VUE_APP_DEFAULT_OCA_REPOSITORY || ""

    eventBus.$on(EventHandlerConstant.PUBLISH_FORM, ({ info, form }) => {
      this.saveForm()
    })
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
            // console.log(sectionInfo)
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
