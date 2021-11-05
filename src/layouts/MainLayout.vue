<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="text-white q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer" />

        <q-space />

        <q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
          <q-toolbar-title shrink class="text-weight-bold">
            OCA Editor
          </q-toolbar-title>
        </q-btn>

        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-blue-2"
      :width="240">
      <q-scroll-area class="fit">
        <q-list padding>
          <div v-for="(modulesBlock, i) in modules" :key="i">
            <q-item
              v-for="module in modulesBlock"
              :key="module.title"
              v-ripple
              :to="module.path"
              clickable>
              <q-item-section avatar>
                <q-icon color="white" :name="module.icon" />
              </q-item-section>
              <q-item-section class="text-white">
                <q-item-label>{{ module.title }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="q-my-md" />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
const modules = [
  [
    {
      title: 'Home',
      icon: 'home',
      path: '/'
    },
    {
      title: 'Schemas',
      icon: 'list_alt',
      path: '/schemas'
    },
    {
      title: 'Standards',
      icon: 'text_snippet',
      path: '/standards'
    },
    {
      title: 'About',
      icon: 'info',
      path: '/about'
    }
  ]
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      modules,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
