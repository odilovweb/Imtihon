import { updateUi } from "./app.js";
const API = "https://countries-api-v7sn.onrender.com/countries?limit=250";
const overlay = document.querySelector(".overlay");
const getData = async (resource) => {
  overlay.classList.remove("hidden");
  const req = await fetch(resource);
  if (req.status != 200) {
    throw new Error("Oops :( , something went wrong");
  }
  const data = await req.json();
  overlay.classList.add("hidden");
  return [data.data];
};

getData(API)
  .then((data) => {
    updateUi(data.flat().slice(0, 8));
  })
  .catch((error) => {
    console.log(error);
  });

export { getData, API };
