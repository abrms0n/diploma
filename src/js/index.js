import "../pages/index.css";
import "../../node_modules/normalize.css/normalize.css";
import "../images/noimage.jpg";

import { NewsApi } from './modules/NewsApi.js';
import { NewsCard } from './components/NewsCard.js';
import { NewsCardList } from './components/NewsCardList.js';
import { SearchInput } from './components/SearchInput';
import { DataStorage } from './modules/DataStorage.js';
import { TODAY, NEWS_API_TOKEN, NEWS_URL_DEV, NEWS_URL, PAGE_SIZE_NEWS_API, IS_DEV } from './constants/constants.js';
import {rusifyDate, getLastWeek, renderError, renderLoading} from './utils/utils.js'

(function indexApp() {

    const preloader = document.querySelector('.preloader');
    const errorBox = document.querySelector('#error');
    const notFound = document.querySelector('#notFound');
    const cardsBox = document.querySelector('.found');
    const newsList = document.querySelector('.found__cards');
    const showMoreBtn = document.querySelector('#showMore')
    const searchForm = document.querySelector('.search-form');
    const searchFormInput = document.querySelector('.search-form__input');
    const submitBtn = document.querySelector('.button_theme_blue');
    const newsCardList = new NewsCardList(newsList);
    const weekAgo = getLastWeek(TODAY);
    const url = (IS_DEV ? NEWS_URL_DEV : NEWS_URL);
    const newsOptions = {
        baseUrl: `${url}/v2/everything`,
        apiKey: NEWS_API_TOKEN,
        pageSize: PAGE_SIZE_NEWS_API,
        from: TODAY,
        to: weekAgo,
        language: 'ru',
        sortBy: 'popularity'
    }
    const api = new NewsApi(newsOptions);
    const storage = new DataStorage(localStorage);

    function renderNewsCards() {
        searchInput.setSubmitButtonState(submitBtn, true);
        const parsed = storage.parse();
        if (parsed.length === 0) {
            renderError(true, cardsBox, notFound);
        } else {
            renderError(false, cardsBox, notFound);
            const news = parsed.map(item => {                        
                item = new NewsCard(item.title, rusifyDate(item.publishedAt), item.url, item.urlToImage, item.description, item.source.name, newsCardList); 
                item.create();
                newsCardList.cards.push(item);
                return item
            });
            cardsBox.classList.remove(`${cardsBox.classList[0]}_is-hidden`);
            newsCardList.render(newsCardList.getHiddenCards());
            if (newsCardList.cards.length < 1) {
                showMoreBtn.setAttribute('style', 'display: none');
            }
        } 
    }
    
    function saveNewsToLocalStorage() {
        renderLoading(true, cardsBox, preloader);
        searchInput.setSubmitButtonState(submitBtn, false);
        renderError(false, cardsBox, notFound);
        renderError(false, cardsBox, errorBox);
        showMoreBtn.setAttribute('style', 'display: block');
        newsCardList.cards = [];
        storage.clear();
        newsList.textContent = '';
        api.getNews()
        .then((data) => {
            const bit = data.articles.slice(0, PAGE_SIZE_NEWS_API);
            localStorage.news = JSON.stringify(bit);
            localStorage.query = searchFormInput.value;
            localStorage.total = data.totalResults;
            renderNewsCards();
        })
        .catch((err) => {
            console.log(`Error is: ${err}`);
            renderError(true, cardsBox, errorBox);
        })
        .finally(() => renderLoading(false, cardsBox, preloader))
    }

    showMoreBtn.addEventListener('click', () => {
        newsCardList.render(newsCardList.getHiddenCards());
        if (newsCardList.cards.length === 0) {
            showMoreBtn.setAttribute('style', 'display: none');
        }
    })

    function submit(event) {
        event.preventDefault();
        api.options.q = searchFormInput.value;
        saveNewsToLocalStorage();
    }

    const searchInput = new SearchInput(submit, searchForm);
    searchInput.setEventListeners();

    if (storage.check()) {
        searchFormInput.value = storage.storage.query;
        renderNewsCards();
    }

}());