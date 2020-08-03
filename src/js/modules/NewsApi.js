export class NewsApi {
    constructor(options) {
        this.options = options;
    }

    getNews() {
        return fetch(`${this.options.baseUrl}/v2/everything`, {
            headers: this.options.headers                 
        })
        .then(res => {
         if (!res.ok) {
             return Promise.reject(`Ошибочка вышла: ${res.status}`);
         } else {
             return res.json()
         }
       }) 
     }
}