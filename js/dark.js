const body = document.body;
const darkBtn = document.querySelector("#darkmode-btn");

const mode = localStorage.getItem("mode")
  ? localStorage.getItem("mode")
  : "light";
if (mode == "dark") {
  body.classList.add("dark-mode");
}

darkBtn.addEventListener("click", () => {
  localStorage.getItem("mode") == "dark"
    ? localStorage.setItem("mode", "light")
    : localStorage.setItem("mode", "dark");
  body.classList.toggle("dark-mode");
});
