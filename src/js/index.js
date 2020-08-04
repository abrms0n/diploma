import "../pages/index.css";
import "../../node_modules/normalize.css/normalize.css"

import {NewsApi} from './modules/NewsApi.js';
import {NewsCard} from './components/NewsCard.js';
import {NewsCardList} from './components/NewsCardList.js';
import {PAGE_SIZE_NEWS_API, NEWS_URL_DEV, NEWS_URL, NEWS_API_TOKEN, ERROR_BOX, CARDS_BOX, NEWS_LIST, TODAY, SEARCH_FORM, SEARCH_INPUT} from './constants/constants.js';
import {rusifyDate, getLastWeek, renderError, renderLoading} from './utils/utils.js'
import { SearchInput } from './components/SearchInput';

const isDev = process.env.NODE_ENV === 'development';

(function indexApp() {

    const NEWS_CARD_LIST = new NewsCardList(NEWS_LIST);
    const WEEK_AGO = getLastWeek(TODAY);
    const API = new NewsApi({
        baseUrl: (isDev ? NEWS_URL_DEV : NEWS_URL),
        headers: {
            Authorization: NEWS_API_TOKEN
        }
    });

    function saveNewsToLocalStorage() {
        renderLoading(true, CARDS_BOX, ERROR_BOX);
        API.getNews()
        .then((data) => {
            const bit = data.articles.slice(0, 100);
            localStorage.news = JSON.stringify(bit);
        })
        .catch((err) => {
            console.log(`Error is: ${err}`);
            renderError(CARDS_BOX, ERROR_BOX);
        })
        .finally(() => renderLoading(false, CARDS_BOX, ERROR_BOX))
    }


    function renderNewsCards() {
        const news = JSON.parse(localStorage.news).map(item => {                        
            item = new NewsCard(item.title, rusifyDate(item.publishedAt), item.url, item.urlToImage, item.description, item.source.name, NEWS_CARD_LIST);
            item.create();
            return item
        });
        
        NEWS_CARD_LIST.render(news);
    }
    

    // const SEARCH_INPUT = new SearchInput(callBack);    // колбэк ф-я, исполняемая при сабмите формы поиска. В ней описывается взаимодействие с API, списком картчек и локальным хранилищем.


    function submit() {
        NEWS_CARD_LIST.innerHTML = '';
        localStorage.clear();
        SEARCH_FORM.addEventListener('submit', function(event) {
            event.preventDefault();
            API.options.baseUrl = `${NEWS_URL}/v2/everything?apiKey=${NEWS_API_TOKEN}&q='${SEARCH_INPUT.value}'&from=${WEEK_AGO}&to=${TODAY}`;
            saveNewsToLocalStorage();
            renderNewsCards();
        });
    }

    submit();


    


    
}());