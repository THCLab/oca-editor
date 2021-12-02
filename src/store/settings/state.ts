export interface SettingsStateInterface {
  dataVaultUrls: string[]
  language: string
}

function state(): SettingsStateInterface {
  return {
    dataVaultUrls: [
      'https://data-vault.argo.colossi.network/api/v2/files'
    ],
    language: 'en'
  }
}

export default state
