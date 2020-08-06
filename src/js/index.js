import "../pages/index.css";
import "../../node_modules/normalize.css/normalize.css"

import {NewsApi} from './modules/NewsApi.js';
import {NewsCard} from './components/NewsCard.js';
import {NewsCardList} from './components/NewsCardList.js';
import {ERROR_BOX, NOT_FOUND, PRELOADER, CARDS_BOX, NEWS_LIST, TODAY, SEARCH_FORM, SEARCH_INPUT, NEWS_API_TOKEN, NEWS_URL_DEV, NEWS_URL, PAGE_SIZE_NEWS_API, IS_DEV, SHOW_MORE} from './constants/constants.js';
import {rusifyDate, getLastWeek, renderError, renderLoading} from './utils/utils.js'
import { SearchInput } from './components/SearchInput';



(function indexApp() {

    const NEWS_CARD_LIST = new NewsCardList(NEWS_LIST);
    const WEEK_AGO = getLastWeek(TODAY);
    const URL = (IS_DEV ? NEWS_URL_DEV : NEWS_URL);

    const NEWS_OPTIONS = {
        baseUrl: `${URL}/v2/everything`,
        apiKey: NEWS_API_TOKEN,
        pageSize: PAGE_SIZE_NEWS_API,
        from: TODAY,
        to: WEEK_AGO,
        language: 'ru',
        sortBy: 'popularity'
    }

    const API = new NewsApi(NEWS_OPTIONS);

    function saveNewsToLocalStorage() {
        renderLoading(true, CARDS_BOX, PRELOADER);
        SHOW_MORE.setAttribute('style', 'display: block');
        NEWS_CARD_LIST.cards = [];
        localStorage.clear();
        NEWS_LIST.textContent = '';
        API.getNews()
        .then((data) => {
            const bit = data.articles.slice(0, 100);
            localStorage.news = JSON.stringify(bit);
            localStorage.query = SEARCH_INPUT.value;
        })
        .catch((err) => {
            console.log(`Error is: ${err}`);
            renderError(true, CARDS_BOX, ERROR_BOX);
        })
        .finally(() => renderLoading(false, CARDS_BOX, PRELOADER))
    }




    function renderNewsCards() {
        const parsed = JSON.parse(localStorage.news);
        if (parsed.length === 0) {
            renderError(true, CARDS_BOX, NOT_FOUND);
        } else {
            renderError(false, CARDS_BOX, NOT_FOUND);
            const news = parsed.map(item => {                        
                item = new NewsCard(item.title, rusifyDate(item.publishedAt), item.url, item.urlToImage, item.description, item.source.name, NEWS_CARD_LIST); 
                item.create();
                NEWS_CARD_LIST.cards.push(item);
                return item
            });

            CARDS_BOX.classList.remove(`${CARDS_BOX.classList[0]}_is-hidden`); 
            NEWS_CARD_LIST.render(NEWS_CARD_LIST.getHiddenCards());
            if (NEWS_CARD_LIST.cards.length < 1) {
                SHOW_MORE.setAttribute('style', 'display: none');
            }
        } 
        
    }

    SHOW_MORE.addEventListener('click', () => {
        NEWS_CARD_LIST.render(NEWS_CARD_LIST.getHiddenCards());
        if (NEWS_CARD_LIST.cards.length === 0) {
            SHOW_MORE.setAttribute('style', 'display: none');
        }
    })

    


    // const SEARCH_INPUT = new SearchInput(callBack);    // колбэк ф-я, исполняемая при сабмите формы поиска. В ней описывается взаимодействие с API, списком картчек и локальным хранилищем.



    SEARCH_FORM.addEventListener('submit', function(event) {
        event.preventDefault();
        API.options.q = SEARCH_INPUT.value;
        saveNewsToLocalStorage();
        setTimeout(() => {
            renderNewsCards();
        }, 700);
    });


    if (localStorage.query) {
        SEARCH_INPUT.value = localStorage.query;
        renderNewsCards();
    }



    


    
}());