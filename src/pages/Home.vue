<template>
  <q-page class="row items-center justify-evenly">
    <Form class="form" :structure="structures.test" default-language="en_EN" />

    <Form
      class="form"
      readonly
      :structure="structures.onboarding"
      default-language="pl_PL" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { components } from 'oca.js-form-quasar'
import { createStructure } from 'oca.js-form-core'
import type { Structure } from 'oca.js-form-core'
import { ocaList } from '@/oca_list'
const { Form } = components

export default defineComponent({
  name: 'Home',
  components: { Form },
  setup() {
    const structures: {
      [name: string]: Structure
    } = {}
    Object.entries(ocaList).forEach(([name, oca]) => {
      structures[name] = createStructure(oca)
    })
    return { structures }
  }
})
</script>

<style lang="scss">
.form {
  width: 40vw;
}
</style>
