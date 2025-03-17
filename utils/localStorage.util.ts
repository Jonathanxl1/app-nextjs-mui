export function registerItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function deleteItem(key: string) {
  localStorage.removeItem(key);
}
