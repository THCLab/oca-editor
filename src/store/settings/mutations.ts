import { MutationTree } from 'vuex'
import { SettingsStateInterface } from './state'

const mutation: MutationTree<SettingsStateInterface> = {
  updateOcaRepositoryUrl(state: SettingsStateInterface, value: string[]) {
    state.ocaRepositoryUrls = value
  },

  updateDataVaultUrl(state: SettingsStateInterface, value: string[]) {
    state.dataVaultUrls = value
  },

  updateLanguage(state: SettingsStateInterface, value: string) {
    state.language = value
  }
}

export default mutation
