import { getData, API } from "./request.js";

const countriesList = document.querySelector(".countries-list");
const regionList = document.querySelectorAll(".regions-item");
const filterApi = "https://countries-api-v7sn.onrender.com/countries?region=";
const filterText = document.querySelector(".filter-header-text");
const searchInp = document.querySelector(".search-inp");
const searchApi = "https://countries-api-v7sn.onrender.com/countries?search=";
const regionFilter = document.querySelector(".filter-region");
const regionsItem = document.querySelector(".regions-list");

//Mouse Hover
regionFilter.addEventListener("mouseover", () => {
  regionsItem.classList.remove("hidden");
});

regionFilter.addEventListener("mouseleave", () => {
  regionsItem.classList.add("hidden");
});

// Create Element
function createElement(element, className) {
  const el = document.createElement(element);
  className && el.classList.add(className);
  return el;
}

// Update UI
function updateUi(data) {
  countriesList.innerHTML = "";
  data.forEach((e) => {
    let element = createElement("li", "country-item");
    let name = e.name.common.toLowerCase().split(" ");
    let link;
    if (name.length > 1) {
      link = name.join(",");
    } else {
      link = name.join();
    }
    const h2 = e.name.common;
    const pop = e.population;
    const reg = e.region;
    const cap = e.capital;
    const img = e.flags.png;
    const alt = e.flags.alt;
    element.innerHTML = `
      <a href="./pages/about.html?q=${link}">
      <img src="${img}" alt="${alt}">
      <div class="country-item-post">
      <h2>${h2}</h2>
      <p><b>Population:</b> ${pop}</p>
      <p><b>Region:</b> ${reg}</p>
      <p><b>Capital:</b> ${cap}</p></div></a>`;
    countriesList.appendChild(element);
  });
}

//Regions Filter
regionList.forEach((item) => {
  item.addEventListener("click", () => {
    searchInp.parentElement.reset();
    filterText.textContent = item.textContent;
    countriesList.innerHTML = "";
    getData(`${filterApi}${item.textContent}`)
      .then((data) => {
        data = data.flat();
        updateUi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

//Search Result
searchInp.addEventListener("input", () => {
  filterText.textContent = "Filter by Region";
  if (searchInp.value) {
    getData(`${searchApi}${searchInp.value.toLowerCase()}`)
      .then((data) => {
        data = data.flat();
        updateUi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    getData(API)
      .then((data) => {
        updateUi(data.flat().slice(0, 8));
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

export { updateUi };
