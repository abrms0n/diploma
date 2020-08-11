import "../../pages/analysis.css";
import "../../../node_modules/normalize.css/normalize.css"

import {TOTAL_NEWS, NOW, QUERY, HOW_MANY_DAYS} from '../constants/constants.js';
import {Statistics} from '../components/Statistics.js';

(function analysisApp() {

    const asked = document.querySelector('#asked');
    const weekNews = document.querySelector('#week');
    const titles = document.querySelector('#titles');
    const whiskers = document.querySelectorAll('.table__whisker');
    const month = document.querySelector('#month');
    const daysElems = document.querySelectorAll('.day');
    const news = JSON.parse(localStorage.news);
    let days = [1,2,3,4,5,6,7];
    days = days.map((item, index) => {
        return item = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-index+1));
    });
    const stats = new Statistics(days, QUERY, news)
    
    function renderWeekDay(date) {
        return `${date.toLocaleString('ru', {day: 'numeric'})}, ${date.toLocaleString('ru', {weekday: 'short'})}`
    }
    
    function renderQuery(askedElem, query) {
        askedElem.textContent = `Вы спросили «${query}»`
    }
    
    function renderMentions(days, elements) {
        elements.forEach((item, index) => {
            item.setAttribute('style', `width: ${days[index]}%`);
            item.textContent = days[index];
        })
    };
    
    function renderDays(monthElem, daysElems, nowDate) {
        let today = new Date();
        today = today.toLocaleString('ru', {month: 'long'});
        monthElem.textContent = `дата (${today})`
        daysElems.forEach((item, index) => {
            item.textContent = renderWeekDay(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()+(index-HOW_MANY_DAYS)))
        })
    }
    
    function renderQuantity(news, queryStr, total, weekElem, titlesElem) {
        const results = news.filter(item => {
            return item.title.toLowerCase().includes(queryStr)
        }) 
        const str = total;
        weekElem.textContent = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        titlesElem.textContent = results.length;
    }

    function calcPercents(mentionsArr) {
        let sum = 0;
        for (let i = 0; i < mentionsArr.length; i++) {
            sum += parseInt(mentionsArr[i]);
        }
        const percentsArr = mentionsArr.map(item => {
            return Math.ceil(item / sum * 100);
        })
        return percentsArr;
    }
    
    renderMentions(calcPercents(stats.calcMentions()), whiskers);
    renderQuery(asked, QUERY);
    renderQuantity(news, QUERY.toLowerCase(), TOTAL_NEWS, weekNews, titles);
    renderDays(month, daysElems, NOW);

}());