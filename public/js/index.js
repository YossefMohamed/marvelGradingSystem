const model = document.querySelector(".create-class");
const newClass = document.querySelector(".new-class");
const closeModel = document.querySelector(".create-class .close");

newClass.addEventListener("click", () => {
  model.style.display = "flex";
});

closeModel.addEventListener("click", () => {
  model.style.display = "none";
});
