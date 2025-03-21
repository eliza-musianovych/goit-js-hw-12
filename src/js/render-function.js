import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: `alt`,
    captionDelay: 250,
});

export function createMarkup(response) {
gallery.innerHTML = "";

const markup = response.hits
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<li class="gallery-item">
    <a class="gallery-link" href="${webformatURL}">
    <img
    class="gallery-image"
    src="${largeImageURL}"
    alt= "${tags.split(`, `).slice(0, 3).join(`, `)}"
    width="360px"
    height="200px"
    />
    </a>
    <ul class="image-titles">
    <li>Likes<br>${likes}</br></li>
    <li>Views<br>${views}</br></li>
    <li>Comments<br>${comments}</br></li>
    <li>Downloads<br>${downloads}</br></li>
    </ul>
    </li>`)
    .join("");

gallery.insertAdjacentHTML("beforeend", markup);

lightbox.refresh();
}