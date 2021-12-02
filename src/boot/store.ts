import { boot } from 'quasar/wrappers'

export default boot(async ({ app, store }) => {
  store._modules.root.state.$app = app
})
