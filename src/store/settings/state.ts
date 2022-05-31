export interface SettingsStateInterface {
  dataVaultUrls: string[]
  ocaRepositoryUrls: string[]
  language: string
}

function state(): SettingsStateInterface {
  return {
    dataVaultUrls: ['https://data-vault.argo.colossi.network/api/v2/files'],
    ocaRepositoryUrls: ['https://repository.oca.argo.colossi.network'],
    language: 'en'
  }
}

export default state
