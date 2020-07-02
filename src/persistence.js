export function save_form(title, formData) {
  const form = get_form(title);
  if (form) {
    return form;
  } else {
    return localStorage.setItem(title, JSON.stringify(formData));
  }
}

export function get_form(title) {
  return localStorage.getItem(title);
}

export function update_form(id, title, formData) {
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

export function delete_schema(schemaName) {
  let schemas = get_schemas()
  schemas = schemas.filter(el => el.name != schemaName);
  localStorage.setItem('schemas', JSON.stringify(schemas));
  localStorage.removeItem(schemaName);
}
