import { getAllCities } from "./funcs/utils.js";
import { seveInToLocalStorage } from "../utils/utils.js";
const containerPopularCities = document.querySelector(
  "#container-popular__cities"
);
const inputValueSearchBox = document.querySelector(".main__input");
const containerLoader = document.querySelector(".container-loader");
const containerSearchResultCities = document.querySelector(
  ".search-result-cities"
);

let allCities = [];

const hiddenLoaderHandler = () => {
  setTimeout(() => {
    containerLoader.style.display = "none";
  }, 300);
};

const createdPopularCities = (cities) => {
  const dataPopularCities = cities.filter((city) => city.popular == true);

  console.log("dataPopularCities ==> ", dataPopularCities);

  dataPopularCities.map((citys) =>
    containerPopularCities.insertAdjacentHTML(
      "beforeend",
      `
            <li onclick="cityHandler('${citys.id}' , '${citys.name}')"  class="main__cities-item"">
            <p class="main__cities-link">${citys.name}</p>
        </li>
           `
    )
  );
};

// const cityHandler = (CityName , CityID) => {
//   setFromLocalStorage("cities" , [{name:CityName , id:CityID}])

  
//   location.href = `./assest/Pages/main.html?city=${CityName}`
// }

const filtredCities = (e,Cities) => {
    e.preventDefault()
  if (Cities.length) {
    const resultFiltred = allCities.filter((city) =>
      city.name.startsWith(Cities)
    );

    if(resultFiltred.length){

        console.log(resultFiltred);
        containerSearchResultCities.classList.add("active");
        containerSearchResultCities.innerHTML = "";
        resultFiltred.forEach((item) =>
          containerSearchResultCities.insertAdjacentHTML(
            "beforeend",
            `
                        <li onclick="cityHandler('${item.id}' , '${item.name}')">${item.name}</li>
        
                `
          )
        );
    }
    else{
        containerSearchResultCities.innerHTML = '<div class="wrapper-result__not-found"><p>همچین شهری با این مشخصات یافت نشد😥</p></div>'
    }
  }
  else{
    containerSearchResultCities.classList.remove("active");
  }
};

inputValueSearchBox.addEventListener("keyup", (e) =>
  filtredCities(e , e.target.value)
);

window.cityHandler = (CityName , CityID) => {
  seveInToLocalStorage("cities", [{ name: CityID, id: CityName }]);
      location.href = "./assest/pages/main.html";
}

window.addEventListener("load", () => {
  // filtredCities()
  hiddenLoaderHandler();
  getAllCities().then((res) => {
    createdPopularCities(res.data.cities);
    allCities = res.data.cities;
  });
});
