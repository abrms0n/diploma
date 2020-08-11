export class CommitCardList {
    constructor(container) {
      this._container = container;
    }
    render = (array) => {
      array.forEach((card) => {
        this._container.append(card.cardElement)
      })
    }
  }
