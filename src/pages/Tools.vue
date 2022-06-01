<template>
  <q-page class="q-pa-md">
    <q-card class="converter-card">
      <q-card-section>
        <div class="text-h5">XLS to OCA Converter</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-file
          v-model="rootFile"
          label="Select OCA root file"
          accept=".xls,.xlsx"
          filled />
        <q-file
          v-model="referenceFiles"
          label="Select OCA references files"
          accept=".xls,.xlsx"
          multiple />

        <q-file
          v-model="credentialLayoutFile"
          label="Select Credential Layout file"
          accept=".yml,.yaml" />
        <q-file
          v-model="formLayoutFile"
          label="Select Form Layout file"
          accept=".yml,.yaml" />

        <br />

        <q-btn color="primary" :disable="!rootFile" @click="convert">
          Convert
        </q-btn>
        <br />
        <!-- eslint-disable vue/no-v-html -->
        <span v-html="convertionResult" />
        <!-- eslint-enable vue/no-v-html -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { AxiosInstance } from 'axios'

export default defineComponent({
  name: 'Tools',
  setup() {
    const currentInstance = getCurrentInstance()
    if (!currentInstance) {
      return
    }
    const $axios = currentInstance.appContext.config.globalProperties
      .$axios as AxiosInstance
    const rootFile = ref()
    const referenceFiles = ref([])
    const credentialLayoutFile = ref()
    const formLayoutFile = ref()
    const convertionResult = ref('')

    const ocaConverterUrl = 'https://tool.oca.argo.colossi.network'

    /* eslint-disable */
    const convert = async () => {
      const formData = new FormData()
      formData.append('file', rootFile.value)
      referenceFiles.value.forEach((file: File) =>
        formData.append('referencesFiles[]', file)
      )

      if (credentialLayoutFile.value) {
        formData.append('credentialLayoutFile', credentialLayoutFile.value);
      }
      if (formLayoutFile.value) {
        formData.append('formLayoutFile', formLayoutFile.value);
      }

      try {
        const response = await $axios.post(ocaConverterUrl, formData)
        convertionResult.value = `Success! <a href="${ocaConverterUrl}/${response.data}">Click here to download OCA Bundle</a>`
      } catch (e) {
        console.error(e)
        convertionResult.value = `Failure! Open dev console for more informaion`
      }
    }
    /* eslint-enable */

    return {
      convert,
      convertionResult,
      rootFile,
      referenceFiles,
      credentialLayoutFile,
      formLayoutFile
    }
  }
})
</script>

<style>
.converter-card {
  min-width: 20vw;
  max-width: 40vw;
}
</style>
