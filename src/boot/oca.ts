import { boot } from 'quasar/wrappers'
import init, { OcaJs } from 'oca.js-form-core'

export default boot(async ({ app, store }) => {
  await init()

  const ocaJs = new OcaJs({
    dataVaults: store.state.settings.dataVaultUrls
  })

  app.config.globalProperties.$ocaJs = ocaJs
  store._modules.root.state.$ocaJs = ocaJs
})
