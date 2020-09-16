export function save_form(title, formData, standardName='') {
  const form = get_form(title);
  if (form) {
    return form;
  } else {
    const schema = get_schema(title)
    if(schema) {
      schema.standard = standardName
      update_schema(schema)
    }
    return localStorage.setItem(title, JSON.stringify(formData));
  }
}

export function get_form(title) {
  return localStorage.getItem(title);
}

export function update_form(id, title, formData, standardName='') {
  const schema = get_schema(title)
  if(schema) {
    schema.standard = standardName
    update_schema(schema)
  }
  return localStorage.setItem(title, JSON.stringify(formData));
}

export function save_schema(schemaData) {
  const schemas = get_schemas()
  const schema = schemas.find( (el) => el.name == schemaData.name );
  if (!schema) {
    schemas.push(schemaData);
    localStorage.setItem('schemas', JSON.stringify(schemas))
    return true;
  } else {
    return false;
  }
}

export function get_schemas() {
  return JSON.parse(localStorage.getItem('schemas')) || [];
}

export function get_schema(schemaName) {
  return get_schemas().find(el => el.name == schemaName)
}

export function update_schema(schema) {
  const schemas = get_schemas()
  const schemaIndex = schemas.findIndex(el => el.name == schema.name)
  if(schemaIndex) {
    schemas[schemaIndex] = schema
    localStorage.setItem('schemas', JSON.stringify(schemas))
    return true
  } else {
    return false
  }
}

export function delete_schema(schemaName) {
  let schemas = get_schemas()
  schemas = schemas.filter(el => el.name != schemaName);
  localStorage.setItem('schemas', JSON.stringify(schemas));
  localStorage.removeItem(schemaName);
}
