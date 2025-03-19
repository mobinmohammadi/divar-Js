const seveInToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};


const addToParams = (params , value) => {
  let url = new URL(location.href)
  const searchParams = url.searchParams
  searchParams.set(params,value)
  location.href = url.toString()
  url.search = searchParams.toString()
}

const getUrlSearchParams = (params) => {
  const urlParams = new URLSearchParams(location.search)
  return urlParams.get(params)
}
export { seveInToLocalStorage, getFromLocalStorage , addToParams , getUrlSearchParams};
