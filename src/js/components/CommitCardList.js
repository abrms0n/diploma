export class CommitCardList {
    constructor(container) {
      this.container = container;
    }
    render = (array) => {
      array.forEach((card) => {
        this.container.append(card.cardElement)
      })
    }
  }
