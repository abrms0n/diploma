export class CommitCard {
    constructor(name, date, link, imageLink, email, text, container) {
      this.name = name;
      this.date = date;
      this.link = link;
      this.imageLink = imageLink;
      this.text = text;
      this.email = email;
      this.container = container;
    }

    create = () => {
      const card = document.createElement('a');
      card.classList.add('card');
      card.classList.add('card_type_commit');
      card.classList.add('swiper-slide');
      card.setAttribute('href', this.link);

      const cardInfo = document.createElement('div');
      cardInfo.classList.add('card__info');
      cardInfo.classList.add('card__info_type_commit');

      const cardDate = document.createElement('p');
      cardDate.classList.add('card__date');
      cardDate.textContent = this.date;

      const cardAuthor = document.createElement('div');
      cardAuthor.classList.add('card__author');

      const avatar = document.createElement('img');
      avatar.classList.add('card__avatar');
      avatar.setAttribute('src', this.imageLink);
      avatar.setAttribute('alt', this.name);

      const nameBox = document.createElement('div');
      nameBox.classList.add('card__name-box');

      const cardName = document.createElement('h3');
      cardName.classList.add('page-title');
      cardName.classList.add('page-title_size_sm');
      cardName.classList.add('page-title_type_commit');
      cardName.textContent = this.name;

      const cardEmail = document.createElement('p');
      cardEmail.classList.add('card__email');
      cardEmail.textContent = this.email;

      const cardText = document.createElement('p');
      cardText.classList.add('card__intro');
      cardText.textContent = this.text;

      card.appendChild(cardInfo);
      cardInfo.appendChild(cardDate);
      cardInfo.appendChild(cardAuthor);
      cardAuthor.appendChild(avatar);
      cardAuthor.appendChild(nameBox);
      nameBox.appendChild(cardName);
      nameBox.appendChild(cardEmail);
      cardInfo.appendChild(cardText);

      this.cardElement = card;

      return card;
    }
  }
