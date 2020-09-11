import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import { vuexModulesPlugin } from 'odca-form';

Vue.use(Vuex);


export default new Vuex.Store({
  namespaced: true,
  modules,
  plugins: [vuexModulesPlugin],
  strict: process.env.NODE_ENV !== 'production'
});
