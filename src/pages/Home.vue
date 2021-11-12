<template>
  <q-page class="q-pa-md">
    <div class="column items-center justify-evenly" style="height: 100vh">
      <div class="col-1">
        <q-file v-model="file" label="Pick OCA zip file" filled />
      </div>

      <div class="col-10">
        <q-spinner v-if="loading" color="primary" size="5em" />
        <Form
          v-if="structure && !loading"
          :key="structure"
          class="form"
          :structure="structure"
          default-language="pl_PL" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { components } from 'oca.js-form-quasar'
const { Form } = components
import { createStructure, resolveFromZip } from 'oca.js-form-core'

export default defineComponent({
  name: 'Home',
  components: { Form },
  setup() {
    const structure = ref()
    const file = ref()
    const loading = ref(false)

    watch(file, async newFile => {
      loading.value = true
      const oca = await resolveFromZip(newFile)
      loading.value = false
      structure.value = createStructure(oca)
    })

    return {
      structure,
      loading,
      file
    }
  }
})
</script>

<style lang="scss">
.form {
  width: 40vw;
  min-width: 300px;
  max-width: 600px;
}
</style>
