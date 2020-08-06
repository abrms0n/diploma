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
        sortBy: 'publishedAt'
    }

    const API = new NewsApi(NEWS_OPTIONS);

    function saveNewsToLocalStorage() {
        renderLoading(true, CARDS_BOX, PRELOADER);
        localStorage.clear();
        NEWS_LIST.innerHTML = '';
        API.getNews()
        .then((data) => {
            if (data.articles.length === 0) {
                renderError(CARDS_BOX, NOT_FOUND);
            } else {
                const bit = data.articles.slice(0, 100);
                localStorage.news = JSON.stringify(bit);
                localStorage.query = SEARCH_INPUT.value;
            }
        })
        .catch((err) => {
            console.log(`Error is: ${err}`);
            renderError(CARDS_BOX, ERROR_BOX);
        })
        .finally(() => renderLoading(false, CARDS_BOX, PRELOADER))
    }

    function makeSubArr(arr) {
        let start = 0;
        let subArr = arr.slice(start, start+3)
        start += 3;
        localStorage.start = start;
        return subArr
    }

    function renderSlice(arr, container) {
        let subArr = makeSubArr(arr);
        container.render(subArr); 
    }

    function renderNewsCards() {
        const news = JSON.parse(localStorage.news).map(item => {                        
            item = new NewsCard(item.title, rusifyDate(item.publishedAt), item.url, item.urlToImage, item.description, item.source.name, NEWS_CARD_LIST); 
            
            NEWS_CARD_LIST.cards.push(item);
            item.create();
            return item
        });
        console.log(NEWS_CARD_LIST.cards);
        CARDS_BOX.classList.remove(`${CARDS_BOX.classList[0]}_is-hidden`); 

        NEWS_CARD_LIST.render(news);  // отрисовать все карточки
        // renderSlice(news, NEWS_CARD_LIST)  // отрисовать три карточки
    }

    // нужно создать объект, в который будут записываться объекты карточек
    
    // и создать метод add(), 




    

    // SHOW_MORE.addEventListener('click', renderSlice(NEWS_CARD_LIST, NEWS_CARD_LIST)); // действие по кнопке

    


    // const SEARCH_INPUT = new SearchInput(callBack);    // колбэк ф-я, исполняемая при сабмите формы поиска. В ней описывается взаимодействие с API, списком картчек и локальным хранилищем.


    function submit() {
        SEARCH_FORM.addEventListener('submit', function(event) {
            event.preventDefault();
            API.options.q = SEARCH_INPUT.value;
            saveNewsToLocalStorage();
            setTimeout(() => {
                renderNewsCards();
            }, 1000);
        });
    }

    submit();

    if (localStorage.query) {
        SEARCH_INPUT.value = localStorage.query;
        renderNewsCards();
    }


    


    
}());