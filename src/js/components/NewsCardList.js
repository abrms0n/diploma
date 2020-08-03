export class NewsCardList {
    constructor(container) {
      this.container = container;
    }
    render = (array) => {
      array.forEach((card) => {
        this.container.append(card.cardElement)   // здесь будет метод для отрисовки по три карточки
      })
    }

    addCard(card) {
      this.container.appendChild(card.create());
    }
  }
