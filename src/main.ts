import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTimes, faLock, faUnlock, faEdit, faTrash, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import router from "@/router"

library.add(faPlus, faTimes, faLock, faUnlock, faEdit, faTrash, faLanguage)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

require('./assets/js/jquery.noty.packaged')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// @ts-ignore
import { initOdcaCommunication } from './odcaCommunication'
initOdcaCommunication()
