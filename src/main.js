import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTimes, faLock, faUnlock, faEdit, faTrash, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { router } from "./router"
import store from '@/store'


library.add(faPlus, faTimes, faLock, faUnlock, faEdit, faTrash, faLanguage)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.router = router
Vue.config.productionTip = false

new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
