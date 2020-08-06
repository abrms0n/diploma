export const IS_DEV = process.env.NODE_ENV === 'development';
export const PAGE_SIZE_NEWS_API = 100;
export const NEWS_API_TOKEN = '506809f93d0443f99a89364270056a79';
export const NEWS_URL_DEV = 'http://praktikum.tk/news';
export const NEWS_URL = 'https://praktikum.tk/news';
export const GITHUB_URL_DEV = 'http://api.github.com';
export const GITHUB_URL = 'https://api.github.com';
export const COMMITS_LIST = document.querySelector('.swiper-wrapper');
export const SLIDER = document.querySelector('.slider');
export const PRELOADER = document.querySelector('.preloader');
export const ERROR_BOX = document.querySelector('#error');
export const NOT_FOUND = document.querySelector('#notFound');
export const CARDS_BOX = document.querySelector('.found');
export const NEWS_LIST = document.querySelector('.found__cards');
export const SHOW_MORE = document.querySelector('#showMore')
export const MAIN = document.querySelector('.main');
export const NOW = new Date();
export const TODAY = [NOW.getFullYear(),NOW.getMonth()+1,NOW.getDate()].join('-');  
// может быть переделать в toISOString
export const SEARCH_FORM = document.querySelector('.search-form');
export const SEARCH_INPUT = document.querySelector('.search-form__input');
export const ASKED = document.querySelector('#asked');
export const WEEK_NEWS = document.querySelector('#week');
export const TITLES = document.querySelector('#titles');
export const WHISKERS = document.querySelectorAll('.table__whisker');
export const MONTH = document.querySelector('#month');
export const DAYS = document.querySelectorAll('.day');

