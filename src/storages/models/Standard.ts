export default class Standard {
  name: string;
  description: string;
  attributes: string[];
  deletable: boolean;

  constructor(name: string, description: string, attributes: string[], deletable: boolean = true) {
    this.name = name
    this.description = description
    this.attributes = attributes
    this.deletable = deletable
  }

  static deserialize(json: any) {
    return new Standard(json.name, json.description, json.attributes)
  }

  isValid() {
    if (!this.name || !this.attributes) { return false }
    if (!Array.isArray(this.attributes)) { return false }
    if (this.attributes.some(attr => typeof attr !== 'string')) { return false }
    return true
  }
}
