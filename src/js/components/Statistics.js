export class Statistics {
    constructor(days, news) {
        this.days = days;
        this.news = news;
    }

    toIsoDate = (date) => {
        date = date.toISOString();
        date = date.split('T')[0];
        return date;
    }
    
    calcPercents = () => {
        const isoDays = this.days.map(item => {
            return item = this.toIsoDate(item);
        })
        const dates = this.news.map(item => {
            return item = item.publishedAt;
        })
        const resultsArr = isoDays.map(day => {
            const results = dates.filter(date => {
                return date.includes(day)
            })
            return results.length;
        })
        return resultsArr;
    }
}