
function Players() {

    this.CurrentPlayerIndex = null;
    this.CurrentPlayer = null;
    this.Players = [];
    this.numOfBot = null;
    this.numOfHumans = null;

    this.init = function (gameEngine, pile, deck, i_HumansNum, i_BotNum) {

        this.numOfHumans = i_HumansNum;
        this.numOfBot = i_BotNum;
        this.createPlayers(gameEngine, pile, deck, i_HumansNum, i_BotNum);
        this.CurrentPlayer = this.Players[0]; // the first human player
        this.CurrentPlayerIndex = 0;
        this.CurrentPlayer.startYourTurn();
    };

    this.createPlayers = function(i_GameEngine, i_Pile, i_Deck, i_HumansNum, i_BotNum) {

        for (var i = 0; i < i_HumansNum; i++) {
            this.createPlayer(i_GameEngine, i_Pile, i_Deck, "human");
        }

        for (var i = 0; i < i_BotNum; i++) {
            this.createPlayer(i_GameEngine, i_Pile, i_Deck, "bot");
        }
    };

    this.createPlayer = function(gameEngine, pile, deck, playerType) {
        var newPlayer = new Player(playerType);

        for (var i = 0; i < NUM_OF_STARTING_CARDS; i++) {
            var lastCard = deck.getTopCardFromDeck();
            newPlayer.addCard(lastCard);
        }
        newPlayer.init(gameEngine, pile);
        this.Players.push(newPlayer);
    };

    this.getPlayersList = function () {
        return this.Players;
    };


    this.getCurrentPlayer = function () {
        return this.CurrentPlayer;
    };
    
    this.nextPlayerTurn = function () {
        this.CurrentPlayer.endYourTurn(); //end currPlayer turn

        this.CurrentPlayerIndex = (++this.CurrentPlayerIndex) % (this.numOfBot + this.numOfHumans);
        this.CurrentPlayer = this.Players[this.CurrentPlayerIndex];
    };

    this.startTurn = function(){
        this.CurrentPlayer.startYourTurn();//start nextPlayar turn
    };

    this.getCurrentPlayerIndex = function(){
        return this.CurrentPlayerIndex;
    }
}
