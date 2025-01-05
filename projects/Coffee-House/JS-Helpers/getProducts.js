async function getProducts() {
  const location = window.location.href;
  const isRootPath = location.endsWith("coffee-house/");
  const path = isRootPath ? "./products.json" : "../products.json";
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

export default getProducts;
