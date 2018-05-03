

var NUM_OF_CHANGE_COLOR_CARD = 4;
var NUM_OF_STARTING_CARDS = 8;

var cardID = ["1", "3", "4", "5", "6", "7", "8", "9"
, "stop", "taki", "change_colorful"];// adding 2plus before chanege color
var cardColor = ["red", "blue", "green", "yellow"];
var NO_COLOR = null;

NUM_OF_CHANGE_COLOR_CARD = 4;
var NUM_OF_STARTING_CARDS = 8;

function Deck() {
    
    this.Cards =[];
    this.NumOfCardToWithdraw;

    this.init = function()
    {
        this.NumOfCardToWithdraw = 1;
        this.createDeck();
        this.shuffle();
        this.shuffle();

    };

    this.createDeck = function () {
        for (var i = 0; i < cardColor.length; i++) {
            for (var j = 0; j < cardID.length - 1; j++) { // execept chang_color card
                var cardAtrribute = "card_" + cardID[j] + "_" + cardColor[i];
                var isActionCard = cardID[j]==="taki"||cardID[j]==="stop"||cardID[j]==="2plus"; 

                var card1 = new Card(cardColor[i], cardID[j], cardAtrribute,isActionCard);// maybe we need 2 "new line"
                var card2 = new Card(cardColor[i], cardID[j], cardAtrribute,isActionCard);// maybe we need 2 "new line"

                this.Cards.push(card1);
                this.Cards.push(card2);
            }
        }
        for (var i = 0; i < NUM_OF_CHANGE_COLOR_CARD; i++) {
            var changeColorfulID = cardID[cardID.length - 1];
            var cardAtrribute = "card_" + changeColorfulID;
            var card = new Card(NO_COLOR, changeColorfulID, cardAtrribute)//CHANGE_COLOR
            this.Cards.push(card);
        }
    }

    this.shuffle = function() {
        for (var i = 0; i < this.Cards.length; i++) {
            var rndNo = getRandomInt(0, this.Cards.length-1);
            var card = this.Cards[i];
            this.Cards[i] = this.Cards[rndNo];
            this.Cards[rndNo] = card;
        }
    }

    this.getTopCardFromDeck = function(){
        if(this.Cards.length === 1){// last card
            //this.Cards = getPile(); not exist yet
            this.shuffle();
        }
        return this.Cards.pop();
    }

    this.getCards = function ()
    {
        return this.Cards;
    }

    this.getNumberOfCardToWithdraw = function(){
        return this.NumOfCardToWithdraw;
    }

    this.setNumberOfCardToWithdraw = function(i_numOfCards) {
        this.NumOfCardToWithdraw = i_numOfCards;
    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}


