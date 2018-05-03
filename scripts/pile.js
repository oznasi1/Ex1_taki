function Pile() {

    this.Cards = [];
    this.Color = null;
    this.CardId = null;

    this.init = function (i_Deck) {
        var card = i_Deck.getTopCardFromDeck();
        this.addCard(card);
    };

    this.addCard = function (i_Card) {
        i_Card.makeCardFaceUp();
        this.Cards.push(i_Card);
        this.Color = i_Card.getColor();
        this.CardId = i_Card.getId();
    };

    this.getTopCardFromPile = function () {
        return this.Cards[this.Cards.length - 1];
    };

    this.getTopCardId = function () {
        return this.CardId;
    };

    this.setTopCardId = function (i_NewCardId) {

        this.CardId = i_NewCardId;
    };

    this.getTopCardColor = function () {
        return this.Color;
    };

    this.setTopCardColor = function (i_NewColor) {
        this.Color = i_NewColor;
    };

    this.getCards = function () {
        return this.Cards;
    }

}

