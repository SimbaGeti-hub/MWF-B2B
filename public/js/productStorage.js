function saveProducts(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadProducts(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
