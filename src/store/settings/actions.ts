import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { SettingsStateInterface } from './state'

const actions: ActionTree<SettingsStateInterface, StateInterface> = {
  updateDataVaultUrl({ commit, rootState }, value: string[]) {
    rootState.$ocaJs.updateDataVaults(value)
    commit('updateDataVaultUrl', value)
  },
  updateLanguage({ commit }, value: string) {
    commit('updateLanguage', value)
  }
}

export default actions
