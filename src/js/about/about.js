import "../../pages/about.css";
import "../../../node_modules/normalize.css/normalize.css"

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import {CommitCard} from '../components/CommitCard.js';
import {CommitCardList} from '../components/CommitCardList.js';
import {GitHubApi} from '../modules/GitHubApi.js';
import {GITHUB_URL_DEV, GITHUB_URL, COMMITS_LIST, SLIDER, PRELOADER, ERROR_BOX} from '../constants/constants.js';
import {rusifyDate, renderLoading, renderCommitError} from '../utils/utils.js'

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
        slidesOffsetBefore: 104,
        initialSlide: 2
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
    baseUrl: (isDev ? GITHUB_URL_DEV : GITHUB_URL)
  });

  const COMMIT_CARD_LIST = new CommitCardList(COMMITS_LIST);

  function renderCommitCards() {
    renderLoading(true, SLIDER, PRELOADER);
    api.getCommits()
    .then((data) => {
    const bit = data.slice(0, 50); 
        const commits = bit.map(item => {                        
            item = new CommitCard(item.commit.committer.name, rusifyDate(item.commit.committer.date), item.html_url, item.author.avatar_url, item.commit.committer.email, item.commit.message, COMMITS_LIST);
            item.create();
            return item
        });
        COMMIT_CARD_LIST.render(commits);

    })
    .catch((err) => {
      console.log(`Error is: ${err}`);
      renderError(SLIDER, ERROR_BOX);
    })
    .finally(() => renderLoading(false, SLIDER, PRELOADER))
  }
  
  renderCommitCards();

}());



