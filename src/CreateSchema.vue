<template>
  <b-container id="app" class="bv-example-row">
    <b-row>
      <b-col cols="6" class="newFormCol">
        <b-row align-h="center">
          <b-col cols="12">
            <h1>Create OCA</h1>
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
            </b-form>
          </b-col>

          <b-col sm="10" lg="81" class="createBtn">
            <b-row>
              <b-col></b-col>
              <b-col>
                <b-button block
                  @click="onCreateForm"
                  :disabled = "form.name.length == 0"
                  variant="primary">
                  Create
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="6" class="fileCol">
        <b-row align-h="center">
          <b-col cols="12">
            <h1>Upload Form zip file</h1>
          </b-col>

          <b-col sm="10" lg="81" class="fileInput">
              <b-form-file
                v-model="file"
                size="lg"
                id="chooseFile"
                accept=".zip"
              />
              <p>
              Don't have one yet? Try example download file and upload it: <a href="/tprm.zip"> tprm.zip</a> </p>
          </b-col>

          <b-col sm="10" lg="81" class="uploadBtn">
            <b-row>
              <b-col></b-col>
              <b-col>
                <b-button block
                  @click="onUploadForm"
                  :disabled = "!Boolean(file)"
                  variant="primary">
                  Upload
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="6" class="calculateHashlinkCol">
        <b-row align-h="center">
          <b-col cols="12">
            <h1>Calculate hashlink</h1>
          </b-col>

          <b-col sm="10" lg="81">
            <b-form-file
              v-model="calculatedFile"
              :file-name-formatter="formatNames"
              size="md" />
          </b-col>
          <p class="fileHashlink" v-if="fileHashlink">{{ fileHashlink }}</p>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { save_schema, save_form } from "./persistence"
import { generateHashlink } from "./hashlink_generator";
import { EventHandlerConstant, eventBus, resolveZipFile,
  renderForm, renderEmptyForm } from 'odca-form'
const uuid = require('uuid/v4')

export default {
  name: "create-schema",
  data() {
    return {
      file: null,
      calculatedFile: null,
      fileHashlink: null,
      form: {
        name: "",
        description: "",
        classification: "",
        uuid: uuid(),
        did: "",
        version: "1"
      }
    };
  },
  watch: {
    calculatedFile: function() {
      if (this.calculatedFile) {
        const fr = new FileReader()
        fr.onload = async (e) => {
          const fileBuffer = e.target.result
          const hashlink = await generateHashlink(fileBuffer)
          this.fileHashlink = hashlink.split(':')[1]
        }
        fr.readAsArrayBuffer(this.calculatedFile)
      } else {
        this.fileHashlink = null
      }
    }
  },
  methods: {
    onCreateForm() {
      // key 'schemas' store schema list, so it can't be overriden
      if (this.form.name != 'schemas') {
        const created = save_schema(this.form);
        const emptyForm = renderEmptyForm(this.form.uuid, this.form.name)
        save_form(this.form.name, emptyForm)
        if (created) {
          this.$router.push("schemas");
        }
      }
    },
    onUploadForm() {
      if (this.file) {
        resolveZipFile(this.file).then(results => {
          results.forEach(schemaData => {
            let { schema, form } = renderForm(schemaData)
            save_schema(schema);
            save_form(schema.name, form)
          })
          this.$router.push("schemas");
        })
      }
    },
    formatNames(files) {
      if (files[0].name.length > 23)
        return `${files[0].name.substring(0, 20)}...`
      else {
        return files[0].name
      }
    }
  }
};
</script>

<style scoped>
  h1 {
    padding-bottom: 30px;
  }

  .newFormCol, .fileCol {
    position: relative;
    min-height: 360px;
  }

  .createBtn, .uploadBtn {
    position: absolute;
    bottom: 10%;
  }

  .calculateHashlinkCol {
    margin-top: 50px;
    min-height: 180px;
  }

  .fileHashlink {
    padding-top: 10px;
  }

  .newFormCol, .calculateHashlinkCol {
    border-right: 1px solid #ced4da;
  }

  .fileCol {
    border-left: 1px solid #ced4da;
  }
</style>
