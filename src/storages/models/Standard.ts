export default class Standard {
  name: string;
  description: string;
  attributes: string[];

  constructor(name: string, description: string, attributes: string[]) {
    this.name = name
    this.description = description
    this.attributes = attributes
  }

  static deserialize(json: any) {
    return new Standard(json.name, json.description, json.attributes)
  }

  isValid() {
    if (!this.name || !this.attributes) { return false }
    return true
  }
}
