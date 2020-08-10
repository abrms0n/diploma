  export class NewsCardList {
    constructor(container) {
      this.container = container;
      this.cards = [];
    }
    render = (array) => {
      array.forEach((card) => {
        this.container.append(card.cardElement)
      })
    }

    removeNulls = () => {
      this.cards.forEach(item => {
        if (item.imageLink === null) {
          item.imageLink = '../../images/noimage.jpg';
        }
      })
    }

    getHiddenCards = (count = 3 ) => {
      const arr = this.cards.slice(0, count);
      this.cards = this.cards.slice(count);
      return arr;
    }

}