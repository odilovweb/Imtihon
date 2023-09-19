const aboutContent = document.querySelector(".about-content");
const countryName = window.location.search.slice(3).split(",").join("-");
const dataApi = `https://countries-api-v7sn.onrender.com/countries/slug/${countryName}`;
const overlay = document.querySelector(".overlay");

// Upload About Country Data
uploadAbout = (data) => {
  let img = data.flags.png;
  let alt = data.flags.alt;
  let name = data.name.common;
  let nname = data.name.nativeName;
  let pop = data.population;
  let region = data.region;
  let subregion = data.subregion;
  let cap = data.capital[0];
  let dom = name.slice(0, 2);
  let cur = data.currencies[0];
  let lang = data.languages.join(",");
  let countryBorders = data.borders;
  let borders = [];
  let borderNames = [];
  countryBorders.forEach((bc) => {
    borderNames.push(bc.common);
    commonArr = bc.common.toLowerCase().split(" ");
    if (commonArr > 1) {
      borders.push(commonArr.join(","));
    } else {
      borders.push(commonArr.join());
    }
  });
  aboutContent.innerHTML = `
  <img
  width="500"
  height="400"
  src="${img}"
  alt="${alt}"
/>
<div class="about-post">
  <h1 class="post-title">${name}</h1>
  <div class="country-about">
    <div class="country-about-left">
      <p>
        <span class="about-bold-text">Native Name:</span
        ><span class="about-text">${nname}</span>
      </p>
      <p>
        <span class="about-bold-text">Population:</span
        ><span class="about-text">${pop}</span>
      </p>
      <p>
        <span class="about-bold-text">Region:</span
        ><span class="about-text">${region}</span>
      </p>
      <p>
        <span class="about-bold-text">Subregion:</span
        ><span class="about-text">${subregion}</span>
      </p>
      <p>
        <span class="about-bold-text">Capital:</span
        ><span class="about-text">${cap}</span>
      </p>
    </div>
    <div class="country-about-right">
      <p>
        <span class="about-bold-text">Top Level Domain:</span
        ><span class="about-text">.${dom}</span>
      </p>
      <p>
        <span class="about-bold-text">Currencies:</span
        ><span class="about-text">${cur}</span>
      </p>
      <p>
        <span class="about-bold-text">Languages:</span
        ><span class="about-text">${lang}</span>
      </p>
    </div>
  </div>
  <div class="about-post-bottom">
    <h2 class="post-bottom-title about-bold-text">
      Border Countries:
    </h2>
    <div class="border-countries">
    </div>
  </div>
</div>
  `;

  const borderCountries = document.querySelector(".border-countries");
  borderNames.forEach((el, i) => {
    borderCountries.innerHTML += `
    <a class="btn-effect btn-country btn" href="./about.html?q=${borders[i]}">${el}</a>
    `;
  });
};
const getAboutData = async (resource) => {
  overlay.classList.remove("hidden");
  const req = await fetch(resource);
  if (req.status != 200) {
    throw new Error("Oops :( , something went wrong");
  }
  const data = await req.json();
  overlay.classList.add("hidden");
  return data;
};

getAboutData(dataApi)
  .then((data) => {
    uploadAbout(data);
  })
  .catch((error) => {
    console.log(error);
  });
