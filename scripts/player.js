function Player(i_PlayerId) {

    this.Playing = false;
    this.GameEngine = null;
    this.Pile = null;
    this.Cards = [];
    this.PlayerId = i_PlayerId; // human or bot (next ex change to int)
    this.Stats = new Stats();
    this.startYourTurn = null;
    this.endYourTurn = null;

    this.init = function (i_GameEngine, i_Pile) {

        this.GameEngine = i_GameEngine;
        this.Pile = i_Pile;
        this.Stats = new Stats();
        this.Stats.init();

        if (this.PlayerId === "human" ) {
            for (var i = 0; i < this.Cards.length; i++) {
                this.Cards[i].makeCardFaceUp();
            }
        }

        if (this.PlayerId === "human") {

            this.startYourTurn = function () {
                if(!this.Playing) {
                    this.Playing = true;
                    this.Stats.startTurnTimer();
                }
            };
            this.endYourTurn = function () {
                if(this.Playing) {
                    this.Playing = false;
                    if (this.Cards.length === 1) {
                        this.Stats.incrementNumOfOneCard();
                    }
                    this.Stats.endTurnTimer();
                }
            };
        }
        else if (this.PlayerId === "bot") {

            this.startYourTurn = async function () {

                if(!this.Playing) {

                    this.Playing = true;
                    this.WaitBySec(500);

                    this.Stats.startTurnTimer();
                    var takistate = false;

                    var cardIndex = this.hasCard("change_colorful");
                    if (cardIndex !== -1) {
                        this.GameEngine.CardClick(cardIndex);
                        var randColor = randomColor();
                        this.GameEngine.CardClick(randColor);
                        return;
                    }

                    cardIndex = this.hasCard("stop");
                    if (cardIndex !== -1) {
                        this.GameEngine.CardClick(cardIndex);
                        return;
                    }

                    cardIndex = this.hasCard("taki");
                    if (cardIndex !== -1) {
                        var takistate = true;
                        this.GameEngine.CardClick(cardIndex);
                        return;
                    }
                    cardIndex = this.checkForValidCard();
                    if (cardIndex !== -1) {

                        this.GameEngine.CardClick(cardIndex);
                    }
                    else {
                        if(!takistate) {
                            this.GameEngine.DeckClick();
                        }
                    }
                }
            };

            this.endYourTurn = function () {

                if(this.Playing){
                    this.Playing = false;
                    if (this.Cards.length === 1) {
                        this.Stats.incrementNumOfOneCard();
                    }
                    this.Stats.endTurnTimer();
                }
            };
        }
    };

    this.checkForValidCard = function () {

        var cardIndex = -1;

        for (var i = 0; i < this.Cards.length; i++) {
            if (this.Cards[i].getColor() === this.Pile.getTopCardColor() || this.Cards[i].getId() === this.Pile.getTopCardId()) {
                cardIndex = i;
                break;
            }
        }

        return cardIndex;
    };

    function randomColor() {

        var colorIndex = Math.floor(Math.random() * 4);
        var resColor = null;

        switch (colorIndex) {
            case 0:
                resColor = "red";
                break;
            case 1:
                resColor = "blue";
                break;
            case 2:
                resColor = "green";
                break;
            case 3:
                resColor = "yellow";
                break;
        }

        return resColor;
    };


    this.hasCard = function (i_CardType) {

        var botCards = this.Cards;

        switch (i_CardType) {

            case "change_colorful":

                for (var i = 0; i < botCards.length; i++) {
                    if ((i_CardType === botCards[i].getId())) {
                        return i;
                    }
                }
                return -1;
                break;

            case "stop":
                for (var i = 0; i < botCards.length; i++) {
                    if ((botCards[i].getId() === "stop" && this.Pile.getTopCardId() === "stop") ||
                        (botCards[i].getColor() === this.Pile.getTopCardColor() && botCards[i].getId() === "stop")) {
                        return i;
                    }
                }
                return -1;
                break;

            case "taki":
                for (var i = 0; i < botCards.length; i++) {
                    if (("taki" === botCards[i].getId() && botCards[i].getColor() === this.Pile.getTopCardColor())) {
                        return i;
                    }
                }
                return -1;
                break;
        }
    };

    this.addCard = function (card) {

        if (this.PlayerId === "human") {
            card.makeCardFaceUp();
        }

        this.Cards.push(card);
    };

    this.removeCard = function (card) {

        for (var i = 0; i < this.Cards.length; i++) {
            if (equalTwoCards(this.Cards[i], card)) // the card found
            {
                this.Cards.splice(i, 1);
                break;
            }
        }
    };

    this.getCards = function () {
        return this.Cards;
    };

    this.getStats = function () {
        return this.Stats;
    };

    this.getId = function () {
        return this.PlayerId;
    };

    function equalTwoCards(card1, card2) {
        var isEqual = false;
        if (card1.getColor() === card2.getColor() && card1.getId() === card2.getId()) {
            isEqual = true;
        }
        return isEqual;
    };

    this.WaitBySec = async function (ms) {
        await this.sleep(ms);
    };

    this.sleep = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    this.setPlayingToFalse = function(){
        this.Playing=false;
    }
}
