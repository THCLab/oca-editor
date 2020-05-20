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
            <h1>Upload OCA</h1>
          </b-col>

          <b-col sm="10" lg="81" class="fileInput">
              <vue-bootstrap-typeahead
                size="lg"
                :showOnFocus="true"
                :minMatchingChars="1"
                placeholder="Search in OCA Repository"
                v-model="ocaSchemaSearch.query"
                :data="ocaSchemaSearch.data.length == 0 ? ocaSchemaSearch.all : ocaSchemaSearch.data"
                :serializer="s => s.schemaName"
                @hit="getOcaSchema"
              >
                  <template slot="append">
                    <b-button
                    class="btn-sm"
                    slot="append"
                    variant="primary"
                    v-show="ocaForm && ocaSchemaSearch.query"
                    @click="preview()">Preview</b-button>
                  </template>

                  <template slot="suggestion" slot-scope="{ data, htmlText }">
                      <small>{{ data.namespace }}/</small>
                      <span v-html="htmlText"></span>
                  </template>
              </vue-bootstrap-typeahead>
              {{ ocaSchemaSearch.selected }}
              <p style="margin: 15px 0 0 0">or choose zip file</p>
              <b-form-file
                v-model="file"
                size="lg"
                id="chooseFile"
                accept=".zip"
              />
              <p>
              Don't have one yet? Try <a href="#" @click="playDemo()">demo</a></p>
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
            <h2>Calculate hashlink</h2>
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

      <b-col cols="6" class="convertCsvCol">
        <b-row align-h="center">
          <b-col cols="12">
            <h2>Convert <a href="https://github.com/THCLab/odca-ruby#how-to-build-input-for-parser">CSV file</a> to OCA</h2>
          </b-col>

          <b-col sm="10" lg="81">
            <b-form-file
              v-model="csvFile"
              :file-name-formatter="formatNames"
              size="md"
              accept=".csv" />
          </b-col>
          <p class="convertedFileUrl" v-if="convertedFileUrl">Download <a :href="convertedFileUrl"> output form zip file</a> which can be uploaded above</p>
        </b-row>
      </b-col>
    </b-row>

    <preview-component style="z-index: 9999;" ref="PreviewComponent" :readonly="true" :form="ocaForm" :alternatives="ocaFormAlternatives"></preview-component>
  </b-container>
</template>

<script>
import axios from 'axios';
import { save_schema, save_form } from "./persistence"
import { generateHashlink } from "./hashlink_generator";
import { SethPhatToaster } from "./config/toaster"
import { EventHandlerConstant, eventBus, resolveZipFile,
  renderForm, renderEmptyForm, PreviewComponent } from 'odca-form'
import VueBootstrapTypeahead from "vue-typeahead-bootstrap";

const uuid = require('uuid/v4')

export default {
  name: "create-schema",
  components: { VueBootstrapTypeahead, PreviewComponent },
  data() {
    return {
      file: null,
      calculatedFile: null,
      csvFile: null,
      convertedFileUrl: null,
      fileHashlink: null,
      ocaForm: null,
      ocaFormAlternatives: [],
      ocaRepo: {
        host: process.env.VUE_APP_DEFAULT_OCA_REPOSITORY || ''
      },
      ocaSchemaSearch: {
        query: '',
        all: [],
        data: [],
        selected: null
      },
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
  created() {
    axios.get(`${this.ocaRepo.host}/api/v2/schemas?_index=schema_base&limit=7`)
    .then(r => {
      this.ocaSchemaSearch.all = r.data.map(x => {
        return {
          namespace: x.namespace,
          DRI: x.DRI,
          schemaName: x.schema.name
        }
      })
    })
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
    },
    csvFile: function() {
      if (this.csvFile) {
        const fd = new FormData();
        fd.append('file', this.csvFile);

        axios({
          method: 'post',
          url: 'https://tool.oca.argo.colossi.network/',
          data: fd
        }).then(response => {
          const contentUrl = `${response.config.url}${response.data}`
          this.convertedFileUrl = contentUrl
          window.location.replace(contentUrl)
        })
      } else {
        this.convertedFileUrl = null
      }
    },
    'ocaSchemaSearch.query': function(input) {
      if(input.length == 0) {
        this.ocaForm = null
        this.file = null
      }
      this.fetchOcaSchemas(input)
    },
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
          try {
            results.forEach(schemaData => {
              let { schema, form } = renderForm(schemaData)
              save_schema(schema);
              save_form(schema.name, form)
            })
            this.$router.push("schemas");
          } catch(e) {
            SethPhatToaster.error("Form data are corrupted");
          }
        })
      }
    },
    playDemo() {
      axios.get('/tprm.zip', { responseType: 'arraybuffer' })
        .then(zipResponse => {
          const blob = new Blob([zipResponse.data], {type: "octet/stream"});
          this.file = new File([blob], 'file.zip')
          this.onUploadForm()
        })
    },
    formatNames(files) {
      if (files[0].name.length > 23)
        return `${files[0].name.substring(0, 20)}...`
      else {
        return files[0].name
      }
    },
    fetchOcaSchemas(input) {
      axios.get(`${this.ocaRepo.host}/api/v2/schemas?suggest=${input}`)
      .then(r => {
        this.ocaSchemaSearch.data = r.data.map(x => {
          return {
            namespace: x.namespace,
            DRI: x.DRI,
            schemaName: x.schema.name
          }
        })
      })
    },
    getOcaSchema: async function(schema) {
      this.ocaFormAlternatives = []
      const result = await axios.get(`${this.ocaRepo.host}/api/v2/schemas?_index=branch&schema_base=${schema.DRI}`)
      const branchesBase = result.data.filter(e => e.namespace == schema.namespace)
      const branchBase = branchesBase[0]
      const branchResponse = await axios.get(`${this.ocaRepo.host}/api/v2/schemas/${branchBase.namespace}/${branchBase.DRI}`)
      const branch = branchResponse.data
      const langBranches = this.splitBranchPerLang(branch)

      let url = `${this.ocaRepo.host}/api/v2/schemas/${branchBase.namespace}/${branchBase.DRI}/archive`
      axios.get(url, { responseType: 'arraybuffer' })
        .then(zipResponse => {
          const blob = new Blob([zipResponse.data], {type: "octet/stream"});
          this.file = new File([blob], 'file.zip')
        })

      try {
          langBranches.forEach(langBranch => {
            this.ocaFormAlternatives.push({
              language: langBranch.lang,
              form: renderForm([langBranch.branch.schema_base, ...langBranch.branch.overlays]).form
            })
          })

          this.ocaForm = this.ocaFormAlternatives[0].form
      } catch {
          SethPhatToaster.error("ERROR! Form data are corrupted.", {
            timeout: 1000
          })
      }
    },
    splitBranchPerLang: function(branch) {
      const langBranches = []
      const labelOverlays = branch.overlays.filter(o => o.type.includes("label"))
      const languages = labelOverlays.map(o => o.language)
      const schemaBase = branch.schema_base
      languages.forEach(lang => {
        langBranches.push({
          lang: lang,
          branch: {
            schema_base: schemaBase,
            overlays: branch.overlays.filter(o => {
              if(!o.language) { return true }
              return o.language == lang
            })
          }
        })
      })
      return langBranches
    },
    preview() {
      try {
          this.$refs.PreviewComponent.openModal(this.ocaForm);
      } catch(e) {
          SethPhatToaster.error("ERROR! Form data are corrupted.", {
            timeout: 1000
          })
      }
    },
  }
};
</script>

<style scoped>
  h1 {
    padding-bottom: 30px;
  }

  h2 {
    padding-bottom: 20px;
  }

  .newFormCol, .fileCol {
    position: relative;
    min-height: 360px;
  }

  .createBtn, .uploadBtn {
    position: absolute;
    bottom: 10%;
  }

  .calculateHashlinkCol, .convertCsvCol {
    margin-top: 50px;
    min-height: 180px;
  }

  .fileHashlink, .convertedFileUrl {
    padding-top: 10px;
  }

  .newFormCol, .calculateHashlinkCol {
    border-right: 1px solid #ced4da;
  }

  .fileCol, .convertCsvCol {
    border-left: 1px solid #ced4da;
  }
</style>
