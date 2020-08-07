import "../../pages/analysis.css";
import "../../../node_modules/normalize.css/normalize.css"

import {ASKED, WEEK_NEWS, TOTAL_NEWS, TITLES, WHISKERS, MONTH, DAYS, NOW, NEWS, QUERY} from '../constants/constants.js';
import {renderQuery, renderQuantity, renderMentions, renderDays} from '../utils/utils.js';
import {Statistics} from '../components/Statistics.js';

(function analysisApp() {

    let days = [1,2,3,4,5,6,7];
    days = days.map((item, index) => {
        return item = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()+(-index+1));
    });

    const stats = new Statistics(days, QUERY, NEWS)

    renderMentions(stats.calcMentions(), WHISKERS);
    renderQuery(ASKED, QUERY);
    renderQuantity(NEWS, QUERY.toLowerCase(), TOTAL_NEWS, WEEK_NEWS, TITLES);
    renderDays(MONTH, DAYS, NOW);

}());