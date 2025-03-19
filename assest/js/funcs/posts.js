import {
  addToParams,
  getFromLocalStorage,
  getUrlSearchParams,
} from "../../utils/utils.js";
import {
  calculateRelativeTimedDifference,
  getCateguryPosts,
  getPostsFormCitys,
} from "./utils.js";

const wrapperSinglePagePosts = document.querySelector(".wrapper-posts");
const wrapperAllCategury = document.querySelector(".wrapper-allCategury");

const categuryID = getUrlSearchParams("categuryID");
console.log(categuryID);

let cities = getFromLocalStorage("cities");

console.log(cities[0]);

const postIdForReSearch = cities[0].id;

window.addEventListener("load", () => {
  getPostsFormCitys(postIdForReSearch).then((respons) => {
    console.log(respons);
    const posts = respons.data.posts;
    generatorPosts(posts);
  });

  const generatorPosts = (posts) => {
    if (posts.length) {
      console.log(posts);

      wrapperSinglePagePosts.innerHTML = "";

      posts.map((post) => {
        const date = calculateRelativeTimedDifference(post.createdAt);
        wrapperSinglePagePosts.insertAdjacentHTML(
          "beforeend",
          `
                      <div class="col-4">
                              <div class="product-card">
                                  <div class="product-card__right">
                                      <div class="product-card__right-top">
                                          <a class="product-card__link" href="#">${post.title}</a>
                                      </div>
                                      <div class="product-card__right-bottom">
                                          <span class="product-card__condition">${post.description}</span>
                                          <span class="product-card__price">${post.price} تومان</span>
                                          <span class="product-card__time">${date}</span>
                                      </div>
                                  </div>
                                  <div class="product-card__left">
                                      <i class="product-card__icon bi bi-chat"></i>
                                      <img class="product-card__img img-fluid" alt="بدون عکس" src=${post.pics[0]}>
                                  </div>
                              </div>
                          </div>
                      `
        );
      });

      wrapperSinglePagePosts;
    } else {
      wrapperSinglePagePosts.innerHTML = `<div class="wrapper-emty__container">برای شهر مورد نظر فعلا آگهی جهت نمایش وجود ندارد 😭</div>`;
    }
  };

  getCateguryPosts().then((respons) => {
    console.log("Categurys ==>", respons.data.categories);
    categuryGenereatos(respons.data.categories);
  });

  const categuryGenereatos = (Categories) => {
    if (categuryID) {
      const subCateguries = Categories.filter(
        (categury) => categury._id == categuryID
      );
      console.log("subCateguries ==>", subCateguries);
      subCateguries.map((subCategury) => {
        console.log(subCategury.title)

        wrapperAllCategury.insertAdjacentHTML(
          "beforeend",
          `
                  <a class="sidebar__category-link" href="#" onclick="pageClickdHandler('${subCategury._id}')">
                        <i class="sidebar__category-icon bi bi-house"></i>
                        <p>${subCategury.title}</p>

                        </a>
                  `
        );
      });
    } else {
      Categories.map((categury) =>
        wrapperAllCategury.insertAdjacentHTML(
          "beforeend",
          `
                <a class="sidebar__category-link" href="#" onclick="pageClickdHandler('${categury._id}')">
                                            <i class="sidebar__category-icon bi bi-house"></i>
                                            ${categury.title}
                </a>
                `
        )
      );
    }
    console.log(Categories);
  };

  window.pageClickdHandler = (categuryId) => {
    addToParams("categuryID", categuryId);
    console.log(categuryId);
    
    // getCateguryById(categuryId).then((  result) => console.log(result));
  };
});
