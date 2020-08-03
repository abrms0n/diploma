import "../../pages/about.css";
import "../../../node_modules/normalize.css/normalize.css"

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import {CommitCard} from '../components/CommitCard.js';
import {CommitCardList} from '../components/CommitCardList.js';
import {GitHubApi} from '../modules/GitHubApi.js';

const isDev = process.env.NODE_ENV === 'development';

(function aboutApp() {

  const mySwiper = new Swiper('.slider', {
    // Optional parameters
    loop: false,
    speed: 500,
    uniqueNavElements: true,
    pagination: {
      el: '.swiper-pagination',
    },
    scrollbar: false,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesOffsetBefore: 104
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 8,
        slidesOffsetBefore: 40
      },

      320: {
        slidesPerView: 1,
        spaceBetween: 8,
      }
    },
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    }
  })


  const api = new GitHubApi({
    baseUrl: (isDev ? 'http://api.github.com' : 'https://api.github.com')
  });

  const commitsList = document.querySelector('.swiper-wrapper');
  const commitCardList = new CommitCardList(commitsList);
  const slider = document.querySelector('.slider');
  const preloader = document.querySelector('.preloader');
  const errorBox = document.getElementById('error');

  function rusifyDate(date) {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    let rusDate = date.split('T');
    rusDate = rusDate[0];
    rusDate = rusDate.split('-');
    rusDate = `${rusDate[2]} ${months[rusDate[1]-1]}, ${rusDate[0]}`;
    return rusDate;
  }


  function renderCommitsLoading(isLoading) {
    if (isLoading) {
      slider.classList.add('slider_is-hidden');
      preloader.classList.add('preloader_is-visible')
      } else {
      slider.classList.remove('slider_is-hidden');
      preloader.classList.remove('preloader_is-visible')
      }
  }

  function renderCommitError() { 
    slider.classList.add('slider_is-hidden');
    errorBox.classList.add('not-found_is-visible');
  }

  function renderCommitCards() {
    renderCommitsLoading(true);
    api.getCommits()
    .then((data) => {
    const bit = data.slice(0, 50); 
        const commits = bit.map(item => {                        
            item = new CommitCard(item.commit.committer.name, rusifyDate(item.commit.committer.date), item.html_url, item.author.avatar_url, item.commit.committer.email, item.commit.message, commitsList);
            item.create();
            return item
        });
        commitCardList.render(commits);
    })
    .catch((err) => {
    console.log(`Ошибочка вышла: ${err}`);
    renderCommitError();
    })
    .finally(() => renderCommitsLoading(false))
  }
  
  renderCommitCards();

}());



