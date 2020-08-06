import "../../pages/analysis.css";
import "../../../node_modules/normalize.css/normalize.css"

import {ASKED, WEEK_NEWS, TITLES, WHISKERS, MONTH, DAYS, NOW} from '../constants/constants.js';
import {renderWeekDay, calcPercents} from '../utils/utils.js';

(function analysisApp() {

    function renderQuantity() {
        const news = JSON.parse(localStorage.news);      // стоит перевести в общую константу
        const queryStr = localStorage.query.toLowerCase();  // и это тоже

        const results = news.filter(item => {
            return item.title.toLowerCase().includes(queryStr)
        }) 

        const str = news.length.toString();
        WEEK_NEWS.textContent = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        TITLES.textContent = results.length;
    }



        // доделать, для сегодня работает, надо сделать на остальные дни недели

    const days = [];
    days[0] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-1))
    days[1] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-2))
    days[2] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-3))
    days[3] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-4))
    days[4] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-5))
    days[5] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-6))


    console.log(calcPercents(NOW))
    // привести в порядок






    function renderQuery() {
        ASKED.textContent = `Вы спросили «${localStorage.query}»`
    }



    function renderPercents(args) {
        WHISKERS.forEach((item, index) => {
            item.setAttribute('style', `width: ${args[index]}%`);
            item.textContent = args[index];
        })
    };

    function renderDays() {
        let today = new Date();
        today = today.toLocaleString('ru', {month: 'long'});
        MONTH.textContent = `дата (${today})`
        DAYS.forEach((item, index) => {
            item.textContent = renderWeekDay(new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(index-6)))
        })
    }

    // привести в порядок!

    renderPercents([calcPercents(days[5]),calcPercents(days[4]),calcPercents(days[3]),calcPercents(days[2]),calcPercents(days[1]),calcPercents(days[0]),calcPercents(NOW)]);

    renderQuery();
    renderQuantity();
    renderDays();



}());