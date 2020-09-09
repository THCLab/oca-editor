import Standard from "./models/Standard"

export default class StandardsStorage {
  list: Standard[];

  constructor() {
    const standardsStr = localStorage.getItem('_standards')
    const standards = standardsStr ? JSON.parse(standardsStr) : []
    this.list = standards.map((s: any) => Standard.deserialize(s))
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
