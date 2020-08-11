export class NewsApi {
    constructor(options) {
        this.options = options;
    }
    
    getNews() {
        return fetch(`${this.options.baseUrl}?apiKey=${this.options.apiKey}&from=${this.options.from}&to=${this.options.to}&pageSize=${this.options.pageSize}&sortBy=${this.options.sortBy}&language=${this.options.language}&q=${this.options.q}`)
        .then(res => {
         if (!res.ok) {
             return Promise.reject(`Error is: ${res.status}`);
         } else {
             return res.json()
         }
       }) 
     }
}