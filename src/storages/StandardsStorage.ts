import Standard from "./models/Standard"

const default_standards: Standard[] = [
  new Standard('BIT', 'Blinding Identity Taxonomy', [
      "first_name", "last_name", "mac_address", "name", "entity_name",
      "full_name", "address", "street", "city", "building_number", "email",
      "postal_code", "zip_code", "skype", "linkedin_profile_url",
      "facebook_profile_url", "passport_number", "social_security_number",
      "national_id", "national_insurance_number", "VIN", "IBAN", "credit_card",
      "debit_card", "PIN", "DID", "employee_identifier", "account_identifier",
      "membership_identifier", "institutional_identifier", "case_identifier",
      "user_identifier", "password", "signature", "digital_certificate",
      "photo", "video", "vocal_sound_bits", "birth_date", "transaction_date",
      "chromosomal", "DNA", "RNA", "voice_prints", "iris_scan", "facial_image",
      "ip", "SSID", "bluetooth_mac_address", "GPS_coordinates",
      "browser_fingerprint", "iot_identifier", "IMEI", "IMSI", "text"
    ], false)
]

export default class StandardsStorage {
  list: Standard[];

  constructor() {
    const standardsStr = localStorage.getItem('_standards')
    const standards = standardsStr ? JSON.parse(standardsStr) : []
    this.list = [
      ...default_standards,
      ...standards.map((s: any) => Standard.deserialize(s))
    ]
  }

  add(standard: Standard) {
    if (!standard.isValid()) {
      return { success: false, errors: ['standard is invalid']}
    }
    if (this.findByName(standard.name)) {
      return { success: false, errors: [`${standard.name} standard already exists`]}
    }

    this.list.push(standard)
    this.persist()
    return { success: true }
  }

  remove(standard: Standard) {
    this.list = this.list.filter((s: Standard) => s.name != standard.name)
    this.persist()
    return { success: true }
  }

  all(): Standard[] {
    return this.list
  }

  findByName(name: string) {
    return this.list.find((s: Standard) => s.name == name)
  }

  private persist() {
    localStorage.setItem('_standards', JSON.stringify(this.list))
  }
}
