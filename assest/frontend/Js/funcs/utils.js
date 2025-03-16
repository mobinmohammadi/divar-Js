const fetchPopularCities = async () => {
  const res = await fetch("http://localhost:4000/api/cities/popular");
  const popularCities = await res.json();

  return popularCities;
};

const getAllCities = async () => {
  const res = await fetch(`http://localhost:4000/api/cities`);
  const result = await res.json();
  
  return result;
};

const setCookies = (citis) => {
  document.cookie = `cities=${citis}`;
};

const getCookies = () => {
  const cookieName = "cities=";
  const allCookies = document.cookie;
  const spliCookies = allCookies.split(";");
  // console.log(spliCookies);

  let result = null;
  console.log(result);

  spliCookies.forEach((cookie) => {
    if (cookie.indexOf(cookieName) == 0) {
      result = cookie.substring(cookieName.length);
    }
  });
  return result;
};
export { fetchPopularCities, setCookies, getCookies , getAllCities };
