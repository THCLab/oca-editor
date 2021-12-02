<template>
  <q-page class="q-pa-md">
    <q-card class="settings-card">
      <q-card-section>
        <div class="text-h5">Settings</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-select
          v-model="defaultLanguage"
          :options="languages"
          label="Default Language"
          use-input
          fill-input
          hide-selected
          input-debounce="0"
          emit-value
          map-options
          options-dense
          dense
          @filter="filterFn" />

        <q-card-section>
          <div class="text-subtitle1">Data Vaults</div>
          <div
            v-for="(_, i) in dataVaultUrls"
            :key="i"
            class="row items-center">
            <q-icon
              name="remove_circle_outline"
              class="col-1 cursor-pointer"
              size="sm"
              left
              @click="removeDataVaultUrl(i)" />
            <q-input
              v-model="dataVaultUrls[i].value"
              class="col"
              label="Data Vault URL"
              dense />
          </div>
          <div class="row items-center" style="height: 40px">
            <q-icon
              name="add_circle_outline"
              class="col-1 cursor-pointer"
              size="sm"
              left
              @click="addDataVaultUrl" />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, Ref } from 'vue'
import { useStore } from 'src/store'
import { languages as l } from '@/languages'

export default defineComponent({
  name: 'Settings',
  setup() {
    const $store = useStore()
    const languages = ref(l)

    const dataVaultUrls = ref(
      $store.state.settings.dataVaultUrls.map(el => ref(el))
    )
    const addDataVaultUrl = () => {
      dataVaultUrls.value.push(ref(''))
    }
    const removeDataVaultUrl = (i: number) => {
      dataVaultUrls.value.splice(i, 1)
    }
    watch(dataVaultUrls.value, async (value: Ref<string>[]) => {
      await $store.dispatch(
        'settings/updateDataVaultUrl',
        value.map(el => el.value)
      )
    })

    const defaultLanguage = computed({
      get: () => $store.state.settings.language,
      set: async val => {
        await $store.dispatch('settings/updateLanguage', val)
      }
    })

    const filterFn = (val: string, update: (callback: () => void) => void) => {
      update(() => {
        const needle = val.toLowerCase()
        languages.value = l.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    }

    return {
      dataVaultUrls,
      defaultLanguage,
      languages,
      filterFn,
      addDataVaultUrl,
      removeDataVaultUrl
    }
  }
})
</script>

<style>
.settings-card {
  min-width: 20vw;
  max-width: 40vw;
}
</style>
