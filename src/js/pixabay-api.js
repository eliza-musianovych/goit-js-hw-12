import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const myApiKey = "49372169-96077d899f4beec9c9139b15f";
const URL = "https://pixabay.com/api/";
const keywordInput = document.querySelector("input");

export async function fetchData(keyword, page) {
const parametrs = new URLSearchParams({
    key: myApiKey,
    q: keyword,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: 15,
});

const response = await axios.get(`${URL}?${parametrs}`);
return response.data
}