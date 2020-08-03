import "../pages/index.css";
import "../../node_modules/normalize.css/normalize.css"

import {NewsApi} from './modules/NewsApi.js';
import {NewsCard} from './components/NewsCard.js';
import {NewsCardList} from './components/NewsCardList.js';

const isDev = process.env.NODE_ENV === 'development';

(function app() {

    const preloader = document.querySelector('.preloader');
    const cardsBox = document.querySelector('.found');
    const cardsList = document.querySelector('.found__cards');
    const errorBox = document.getElementById('error');
    const newsCardList = new NewsCardList(cardsList);

    const now = new Date();
    const today = [now.getFullYear(),now.getMonth()+1,now.getDate()].join('-');

    function getLastWeek(date) {
        date = date.split('-');
        date = new Date(date[0], date[1], date[2], -168, 0, 0, 0);
        date = [date.getFullYear(),date.getMonth(),date.getDate()];
        date = date.join('-');
        return date
    }
    
    const sevenDaysAgo = getLastWeek(today);

    const api = new NewsApi({
        baseUrl: (isDev ? 'http://newsapi.org' : 'https://newsapi.org'),
        headers: {
            apiKey: '506809f93d0443f99a89364270056a79',
            from: sevenDaysAgo,
            to: today,
            pageSize : 100,
            'Content-Type': 'application/json'
        }
    });

    function showResults() {
        cardsBox.classList.remove('found_is-hidden');
    }
    
    function renderLoading(isLoading) {
        if (isLoading) {
        cardsBox.classList.add('found_is-hidden');
        preloader.classList.add('preloader_is-visible')
        } else {
        cardsBox.classList.add('found_is-hidden');
        preloader.classList.remove('preloader_is-visible')
        }
    }

    function renderError() { 
        cardsBox.classList.add('found_is-hidden');
        errorBox.classList.add('not-found_is-visible');
    }
    
    function renderNewsCards() {
        renderLoading(true);
        api.getNews()
        .then((data) => {
        const bit = data.slice(0, 100);     
            const news = bit.map(item => {                        
                item = new NewsCard(item.title, rusifyDate(item.publishedAt), item.link, item.urlToImage, item.description, item.source.name, newsCardsList);
                item.create();
                return item
            });
            showResults();
            newsCardList.render(news);
        })
        .catch((err) => {
        console.log(`Ошибочка вышла: ${err}`);
        renderError();
        })
        .finally(() => renderLoading(false))
    }
    
    // renderNewsCards();
    
  
  
}());