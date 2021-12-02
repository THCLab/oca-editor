import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { SettingsStateInterface } from './state'

const getters: GetterTree<SettingsStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  }
}

export default getters
