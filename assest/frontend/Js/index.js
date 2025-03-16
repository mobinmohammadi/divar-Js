import {
  fetchPopularCities,
  getAllCities,
  getCookies,
  setCookies,
} from "./funcs/utils.js";

const citySearchInput = document.querySelector(".main__input");
const resultCitiesWrapper = document.querySelector(".search-result-cities");
const containerPopularCities = document.querySelector(
  "#container-popular__cities"
);

const setCitiesInCookie = (citis) => {
  setCookies(citis);
  window.location.href = `./main.html?citis=${citis}`;
};

const wrapperContetntPopularCities = (popularCities) => {
  popularCities.map((cities) =>
    containerPopularCities.insertAdjacentHTML(
      "beforeend",
      `      
    <div class="col-2 d-flex justify-content-center">
      <li class="main__cities-item" onclick="setCitiesInCookie('${cities.href}')">
        <a class="main__cities-link" href="#">
          ${cities.name}
        </a>
      </li>
    </div>
        `
    )
  );
};

let allCities = [];

const citiesSearchHandler = (e) => {

  const titleCities = e.target.value;
  if(citySearchInput){
    const resultSearchCitiesValue = allCities.filter((city) => city.name.startsWith(titleCities));
    resultCitiesWrapper.classList.add("active");
    resultCitiesWrapper.innerHTML = ""
    resultSearchCitiesValue.map((items) =>
    
      resultCitiesWrapper.insertAdjacentHTML(
        "beforeend",
        `
        <li href="${items.href}">${items.name}</li>
        `
      )
    );
    return true
  }
  else{
    resultCitiesWrapper.classList.remove("active");
    return false
  }
  // console.log(resultSearchCitiesValue);
};

citySearchInput.addEventListener("keyup", (e) => citiesSearchHandler(e));

const loadCityPosts = (cityCookie) => {
  console.log(cityCookie);

  if (cityCookie) {
    location.href = `./main.html?citis=${cityCookie}`;
  }
};

window.setCitiesInCookie = setCitiesInCookie;

window.addEventListener("load", async () => {
  const cityCookie = getCookies();
  loadCityPosts(cityCookie);
  allCities = await getAllCities();

  const popularCities = await fetchPopularCities();
  wrapperContetntPopularCities(popularCities);
});
