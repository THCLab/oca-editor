export function save_form(title, formData) {
  return localStorage.setItem(title, JSON.stringify(formData));
}

export function get_form(title) {
  return localStorage.getItem(title);
}

export function update_form(id, title, formData) {
  return localStorage.setItem(title, JSON.stringify(formData));
}
