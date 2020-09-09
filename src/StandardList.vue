<template>
  <b-container class>
    <b-row>
      <b-col align-self="center" offset-md="2" cols="2">
        Choose standard files:
      </b-col>

      <b-col sm="4" lg="81">
        <b-form-file v-model="selectedFiles" size="sm"
          :file-name-formatter="formatNames" accept=".json" multiple />
      </b-col>

      <b-col align-self="center" cols="1">
        <b-button variant="outline-primary" size="sm" @click="uploadFiles"
          :disabled="selectedFiles.length === 0">Upload</b-button>
      </b-col>
    </b-row>
    <br>

    <b-row align-h="center">
      <b-col cols="12">
        <b-table striped hover :fields="attr_fields" :items="standards">
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { SethPhatToaster } from "./config/toaster";
import Standard from "@/storages/models/Standard";
import StandardsStorage from "@/storages/StandardsStorage";
const standardsStorage = new StandardsStorage()

export default {
  name: "standard-list",
  data() {
    return {
      selectedFiles: [],
      standardsStorage: new StandardsStorage(),
      standards: [],
      attr_fields: [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" }
      ]
    };
  },
  watch: {
    'standardsStorage.list.length': {
      handler: function() {
        this.standards = this.standardsStorage.all()
      },
      immediate: true
    }
  },
  methods: {
    uploadFiles() {
      this.selectedFiles.forEach(file => {
        const fr = new FileReader();
        fr.fileName = file.name
        fr.addEventListener("load", e => {
          const standard = Standard.deserialize(JSON.parse(fr.result))
          const result = this.addStandard(standard)
          if (!result.success) {
            SethPhatToaster.error(`${e.target.fileName}: ${result.errors.join(', ')}`)
          }
        });
        fr.readAsText(file)
      })
      this.selectedFiles = []
    },
    addStandard(standard) {
      return this.standardsStorage.add(standard)
    },
    },
    formatNames(files) {
      if (files.length === 1) {
        if (files[0].name.length > 23)
          return `${files[0].name.substring(0, 20)}...`
        else {
          return files[0].name
        }
      } else {
        return `${files.length} files selected`
      }
    }
  },
};
</script>

<style>
</style>
