import "../pages/index.css";
import "../../node_modules/normalize.css/normalize.css"

import { NewsApi } from './modules/NewsApi.js';
import { NewsCard } from './components/NewsCard.js';
import { NewsCardList } from './components/NewsCardList.js';
import { SearchInput } from './components/SearchInput';
import { DataStorage } from './modules/DataStorage.js';
import { ERROR_BOX, NOT_FOUND, PRELOADER, CARDS_BOX, NEWS_LIST, TODAY, SEARCH_FORM, SEARCH_INPUT, NEWS_API_TOKEN, NEWS_URL_DEV, NEWS_URL, PAGE_SIZE_NEWS_API, IS_DEV, SHOW_MORE } from './constants/constants.js';
import {rusifyDate, getLastWeek, renderError, renderLoading, checkStorage} from './utils/utils.js'

(function indexApp() {

    const newsCardList = new NewsCardList(NEWS_LIST);
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
        const parsed = storage.parse();
        if (parsed.length === 0) {
            renderError(true, CARDS_BOX, NOT_FOUND);
        } else {
            renderError(false, CARDS_BOX, NOT_FOUND);
            const news = parsed.map(item => {                        
                item = new NewsCard(item.title, rusifyDate(item.publishedAt), item.url, item.urlToImage, item.description, item.source.name, newsCardList); 
                item.create();
                newsCardList.cards.push(item);
                return item
            });
            CARDS_BOX.classList.remove(`${CARDS_BOX.classList[0]}_is-hidden`); 
            newsCardList.render(newsCardList.getHiddenCards());
            if (newsCardList.cards.length < 1) {
                SHOW_MORE.setAttribute('style', 'display: none');
            }
        } 
    }
    
    function saveNewsToLocalStorage() {
        renderLoading(true, CARDS_BOX, PRELOADER);
        renderError(false, CARDS_BOX, NOT_FOUND);
        renderError(false, CARDS_BOX, ERROR_BOX);
        SHOW_MORE.setAttribute('style', 'display: block');
        newsCardList.cards = [];
        storage.clear();
        NEWS_LIST.textContent = '';
        api.getNews()
        .then((data) => {
            const bit = data.articles.slice(0, 100);
            localStorage.news = JSON.stringify(bit);
            localStorage.query = SEARCH_INPUT.value;
            localStorage.total = data.totalResults;
            renderNewsCards();
        })
        .catch((err) => {
            console.log(`Error is: ${err}`);
            renderError(true, CARDS_BOX, ERROR_BOX);
        })
        .finally(() => renderLoading(false, CARDS_BOX, PRELOADER))
    }

    SHOW_MORE.addEventListener('click', () => {
        newsCardList.render(newsCardList.getHiddenCards());
        if (newsCardList.cards.length === 0) {
            SHOW_MORE.setAttribute('style', 'display: none');
        }
    })

    function submit(event) {
        event.preventDefault();
        api.options.q = SEARCH_INPUT.value;
        saveNewsToLocalStorage();
    }

    const searchInput = new SearchInput(submit, SEARCH_FORM);
    searchInput._setEventListeners();

    if (checkStorage()) {
        SEARCH_INPUT.value = localStorage.query;
        renderNewsCards();
    }

}());