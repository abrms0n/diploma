export class NewsCard {
    constructor(title, date, link, imageLink, text, source, container) {
      this._title = title;
      this._date = date;
      this._link = link;
      this._imageLink = imageLink;
      this._text = text;
      this._source = source;
      this._container = container;
    }

    create = () => {
      const card = document.createElement('a');
      card.classList.add('card');
      card.setAttribute('href', this._link);
      card.setAttribute('target', "_blank");

      const cardPicBox = document.createElement('div');
      cardPicBox.classList.add('card__pic-box');

      const cardPic = document.createElement('img');
      cardPic.classList.add('card__pic');
      cardPic.setAttribute('src', this._imageLink);
      if (this._imageLink === null) {
        cardPic.setAttribute('src', './images/noimage.jpg')
      }
      cardPic.setAttribute('alt', this._title)

      const cardInfo = document.createElement('div');
      cardInfo.classList.add('card__info');

      const cardDate = document.createElement('p');
      cardDate.classList.add('card__date');
      cardDate.textContent = this._date;

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('page-title');
      cardTitle.classList.add('page-title_size_sm');
      cardTitle.classList.add('page-title_type_card');
      cardTitle.textContent = this._title;

      const cardText = document.createElement('p');
      cardText.classList.add('card__intro');
      cardText.textContent = this._text;

      const cardSource = document.createElement('p');
      cardSource.classList.add('card__source');
      cardSource.textContent = this._source;

      card.appendChild(cardPicBox);
      cardPicBox.appendChild(cardPic);
      card.appendChild(cardInfo);
      cardInfo.appendChild(cardDate);
      cardInfo.appendChild(cardTitle);
      cardInfo.appendChild(cardText);
      cardInfo.appendChild(cardSource);

      this.cardElement = card;

      return card;
    }
  }
