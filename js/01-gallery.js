import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");

gallery.insertAdjacentHTML("beforeend", markup);

function onhandleEscapeKeydown(instance) {
  return function (e) {
    if (e.code === "Escape") {
      instance.close();
    }
  };
}

const galleryImage = document.querySelectorAll(".gallery__image");
galleryImage.forEach((image) => {
  image.addEventListener("click", onImageClick);
});
function onImageClick(e) {
  e.preventDefault();
  const clickElement = e.target;
  if (clickElement.classList.contains("gallery__image")) {
    const instance = basicLightbox.create(
      `<img src="${clickElement.dataset.source}" width="800" height="600">`,
      {
        onShow: (instance) => {
          document.addEventListener("keydown", handleEscapeKeydown);
        },
        onClose: (instance) => {
          document.removeEventListener("keydown", handleEscapeKeydown);
        },
      }
    );
    const handleEscapeKeydown = onhandleEscapeKeydown(instance);
    instance.show();
  }
}

console.log(galleryItems);
