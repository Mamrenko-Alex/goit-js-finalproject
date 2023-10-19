import { galleryItems } from './gallery-items.js';
// Change code below this line

// common cheking
console.log(galleryItems);

// Create gallery function
function createGalleryItem(items) {
    return items.map(({ preview, original, description }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`
    ).join('')
}
const galleryMarkup = createGalleryItem(galleryItems);

// Get gallery list
const galleryList = document.querySelector('.gallery')

// Print galery
galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

// Create listener
galleryList.addEventListener('click', handlerCklickOnGallery)

function handlerCklickOnGallery(event) {
    event.preventDefault()

    if (event.currentTarget === event.target) {
        return
    }

    const currentImageSource = event.target.dataset.source
    const currentImage = galleryItems.find(({ original }) => original === currentImageSource)
    createModalWindow(currentImage)

}

function createModalWindow({ preview, original, description }) {
    const instance = basicLightbox.create(
    `<div class="modal">
        <li class="gallery__item">
            <img
            class="gallery__image"
            src="${original}"
            alt="${description}"
            />
        </li>
    </div>`)

    instance.show()

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        instance.close();
      }
    });
}