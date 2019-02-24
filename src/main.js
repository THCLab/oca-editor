import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTimes, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { router } from "./router"

library.add(faPlus, faTimes, faLock, faUnlock)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.router = router 
Vue.config.productionTip = false

new Vue({router, 
  render: h => h(App),
}).$mount('#app')
