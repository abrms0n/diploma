export class GitHubApi {
    constructor(options) {
        this.options = options;
    }

    getCommits() {
        return fetch(`${this.options.baseUrl}/repos/abramsea/diploma/commits`, {
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