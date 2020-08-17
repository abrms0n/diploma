export const IS_DEV = process.env.NODE_ENV === 'development';
export const PAGE_SIZE_NEWS_API = 100;
export const NEWS_API_TOKEN = '506809f93d0443f99a89364270056a79';
export const NEWS_URL_DEV = 'http://nomoreparties.co/news';
export const NEWS_URL = 'https://nomoreparties.co/news';
export const GITHUB_URL_DEV = 'http://api.github.com';
export const GITHUB_URL = 'https://api.github.com';
export const TOTAL_NEWS = localStorage.total;
export const QUERY = localStorage.query;
export const NOW = new Date();
export const TODAY = [NOW.getFullYear(), NOW.getMonth()+1, NOW.getDate()].join('-');
export const HOW_MANY_DAYS = 6;
export const HOW_MANY_COMMITS = 20;




