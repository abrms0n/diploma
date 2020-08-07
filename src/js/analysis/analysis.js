import "../../pages/analysis.css";
import "../../../node_modules/normalize.css/normalize.css"

import {ASKED, WEEK_NEWS, TITLES, WHISKERS, MONTH, DAYS, NOW, NEWS, QUERY} from '../constants/constants.js';
import {calcPercents, renderQuery, renderQuantity, renderPercents, renderDays} from '../utils/utils.js';

(function analysisApp() {


    const days = [];
    days[0] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-1))
    days[1] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-2))
    days[2] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-3))
    days[3] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-4))
    days[4] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-5))
    days[5] = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-6))
    days[6] = NOW;


    renderPercents(calcPercents(days, JSON.parse(localStorage.news)), WHISKERS);
    renderQuery(ASKED);
    renderQuantity(NEWS, QUERY, WEEK_NEWS, TITLES);
    renderDays(MONTH, DAYS, NOW);
    
}());