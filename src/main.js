import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchData } from "./js/pixabay-api";
import { createMarkup } from "./js/render-function";

const form = document.querySelector("form");
const keywordInput = document.querySelector("input");
const btnMore = document.querySelector(".button-more");
const loader = document.querySelector(".loader");
const loaderMore = document.querySelector(".more")

let page = 1;
let keyword = "";

const btnMoreShow = () => btnMore.style.display = `block`;
const btnMoreHide = () => btnMore.style.display = `none`;

form.addEventListener("submit", reserch);

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
        if (page > 1) {
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
    
        createMarkup(response);

        page += 1;
        if (page > 1) {
            btnMore.style.display = `block`;
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
        btnMoreShow();
    };
}