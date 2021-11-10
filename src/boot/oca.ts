import { boot } from 'quasar/wrappers'
import init from 'oca.js-form-core'

export default boot(async () => {
  await init()
})
