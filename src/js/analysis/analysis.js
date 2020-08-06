import "../../pages/analysis.css";
import "../../../node_modules/normalize.css/normalize.css"

import {ASKED, WEEK_NEWS, TITLES, WHISKERS, MONTH, DAYS, NOW} from '../constants/constants.js';

(function analysisApp() {

    function renderQuantity() {
        const news = JSON.parse(localStorage.news);
        const queryStr = localStorage.query.toLowerCase();

        const results = news.filter(item => {
            return item.title.toLowerCase().includes(queryStr)
        }) 

        const str = news.length.toString();
        WEEK_NEWS.textContent = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        TITLES.textContent = results.length;
    }

    function renderQuery() {
        ASKED.textContent = `Вы спросили «${localStorage.query}»`
    }

    function renderPercents(args) {
        WHISKERS.forEach((item, index) => {
            item.setAttribute('style', `width: ${args[index]}%`);
            item.textContent = args[index];
        })
    };

    function renderWeekDay(date) {
        return `${date.toLocaleString('ru', {day: 'numeric'})}, ${date.toLocaleString('ru', {weekday: 'short'})}`
    }

    function renderDays() {
        let today = new Date();
        today = today.toLocaleString('ru', {month: 'long'});
        MONTH.textContent = `дата (${today})`
        DAYS.forEach((item, index) => {
            item.textContent = renderWeekDay(new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(index-7)))
        })
    }

    renderPercents([5,2,12,55,66,33,100]);
    renderQuery();
    renderQuantity();
    renderDays();

}());