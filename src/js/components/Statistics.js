export class Statistics {
    constructor(days, query, news) {
        this.days = days;
        this.query = query.toLowerCase();
        this.news = news;
    }

    toIsoDate = (date) => {
        date = date.toISOString();
        date = date.split('T')[0];
        return date;
    }
    
    calcMentions = () => {
        const isoDays = this.days.map(item => {
            return item = this.toIsoDate(item);
        })

        const resultsArr = isoDays.map(day => {
            let titleCounter = 0;
            let descriptionCounter = 0;

            this.news.filter(newsItem => {
               if (newsItem.title.toLowerCase().includes(this.query) && newsItem.publishedAt.includes(day)) {
                   titleCounter++;
               }
            })
            this.news.filter(newsItem => {
               if (newsItem.description.toLowerCase().includes(this.query) && newsItem.publishedAt.includes(day)) {
                   descriptionCounter++;
               }
            })
            return titleCounter + descriptionCounter;
        })
        return resultsArr;
    }
}