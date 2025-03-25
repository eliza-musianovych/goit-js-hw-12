import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchData } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";

const form = document.querySelector("form");
const keywordInput = document.querySelector("input");
const btnMore = document.querySelector(".button-more");
const loader = document.querySelector(".loader");
const loaderMore = document.querySelector(".more")

let keyword = "";
const limit = 15;
let totalPages = 0;

const btnMoreShow = () => btnMore.style.display = `block`;
const btnMoreHide = () => btnMore.style.display = `none`;

form.addEventListener("submit", reserch);
page = 1;

async function reserch(event) {
    event.preventDefault();
    
    document.querySelector(".gallery").innerHTML = "";

    keyword = keywordInput.value.trim();
  if (!keyword) {
    iziToast.error({
      message: "Please enter a search query before submitting!",
      position: "topRight"
    });
    return;
  }

  loader.style.display = `block`;
  btnMoreHide();

    try {
        const response = await fetchData(keyword, page);
        totalPages = Math.ceil(response.totalHits / limit);
          
        if (response.hits.length === 0) {
            iziToast.error({
              message: "Sorry, there are no images matching your search query. Please try again!",
              position: "topRight",
              closeOnClick: true,
              color: `#fafafb`,
              messageColor: `#fafafb`,
              backgroundColor: '#ef4040',
            });
            btnMoreHide();
            return;
        }
        createMarkup(response);
    
        page += 1;

        if (page > totalPages) {
            btnMoreHide();
            return iziToast.info({
              position: "topRight",
              message: "We're sorry, but you've reached the end of search results."
          })
        } else {
            btnMoreShow();
          }
    } catch (error) {
        iziToast.error({
              message: "Sorry, there are no images matching your search query. Please try again!",
              position: "topRight",
              closeOnClick: true,
              color: `#fafafb`,
              messageColor: `#fafafb`,
              backgroundColor: '#ef4040',
            })
    } finally {
        loader.style.display = `none`;
    };

};

btnMore.addEventListener("click", showMore);

async function showMore() {
    btnMoreHide();
    loaderMore.style.display = `block`;

    try {
    const response = await fetchData(keyword, page);
    totalPages = Math.ceil(response.totalHits / limit);

        createMarkup(response);

        page += 1;
        scrollAfterLoad();

        function scrollAfterLoad() {
            const card = document.querySelector(".gallery-item"); 
            if (card) {
              const galleryItemHeight = card.getBoundingClientRect().height;
              const scrollHeight = galleryItemHeight * 2;
              window.scrollBy({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }          
        if (page > totalPages) {
            btnMoreHide();
            return iziToast.info({
              position: "topRight",
              message: "We're sorry, but you've reached the end of search results."
            });
          } else {
            btnMoreShow();
          }
    } catch (error) {
        iziToast.error({
              message: "Sorry, there are no images matching your search query. Please try again!",
              position: "topRight",
              closeOnClick: true,
              color: `#fafafb`,
              messageColor: `#fafafb`,
              backgroundColor: '#ef4040',
            })
    } finally {
        loaderMore.style.display = `none`;
    };
};

 
