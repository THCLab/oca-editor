<template>
  <b-container id="app" class="bv-example-row">
    <b-row align-h="center">
      <b-col cols="12">
        <h1>Schema Base & Overlays</h1>
      </b-col>

      <b-col sm="10" lg="81">
          <b-form-file
            v-model="file"
            id="chooseFile"
            accept=".zip"
            :disabled="form.name.length != 0 || form.description.length != 0"
          />
      </b-col>

      <b-col sm="10" lg="81">
        <br>
      </b-col>

      <b-col sm="10" lg="81">
        <b-form @submit.prevent>
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
              :disabled="Boolean(file)"
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
              :disabled="Boolean(file)"
            />
          </b-form-group>

          <b-row>
            <b-col>
              <b-button block @click="onCreateSchema" variant="primary">Create</b-button>
            </b-col>
            <b-col>
              <b-button block type="reset" @click="resetFileInput" variant="danger">Reset</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { save_schema, save_form } from "./persistence"
import { resolveZipFile } from './zip_resolver'
import { renderForm } from './form_renderer'
import { eventBus } from '@/template/handler/event_handler'

export default {
  name: "create-schema",
  data() {
    return {
      file: null,
      form: {
        name: "",
        description: "",
        did: "",
        version: "1"
      }
    };
  },
  methods: {
    onCreateSchema() {
      if (this.file) {
        resolveZipFile(this.file).then(results => {
          results.forEach(schemaData => renderForm(schemaData))
          this.$router.push("schemas");
        })
      } else {
        // key 'schemas' store schema list, so it can't be overriden
        if (this.form.name != 'schemas') {
          const created = save_schema(this.form);
          if (created) {
            this.$router.push("schemas");
          }
        }
      }
    },
    resetFileInput() {
      this.file = null
    }
  },
  created() {
    eventBus.$on('msg.form_rendered', ({ schema, form }) => {
      save_schema(schema);
      save_form(schema.name, form)
    })
  }
};
</script>

<style>
</style>
