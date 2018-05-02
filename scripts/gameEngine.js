var NUM_OF_CHANGE_COLOR_CARD = 4;
var NUM_OF_STARTING_CARDS = 8;

function GameEngine() {

    var deck;
    var players;
    var pile;
    var actionManager;

    //PUBLIC FUNCTIONS:
    this.initEngine = function (numberOfHuman, numberOfBots) {
        deck = new Deck();
        players = new Players();
        pile = new Pile();
        actionManager = new ActionManager(deck, pile);

        deck.init();
        pile.init(deck);
        players.init(deck, pile.getTopCardFromPile(), 1, 1); // 1 bot, 1 human
        actionManager.init();
        players.getCurrentPlayer().startYourTurnFunc();
    }

    this.getDeck = function () {
        return deck;
    }

    this.getPile = function () {
        return pile;
    }

    this.getPlayers = function () {
        return players.getPlayersArray();
    }

    this.getPlayersObj = function () {
        return players;
    }

    this.getCurrentPlayer = function () {
        return players.getCurrentPlayer();
    }

    this.deck_OnClick = function () {
        var topCard = deck.getTopCardFromDeck();
        players.getCurrentPlayer().addCard(topCard);
        //players.nextPlayerTurn(); moved to ui
    }

    //info:
    //-1 = falid
    // 0 = added card
    // 1 = change color
    // 2 = taki
    // 3 = stop 
    this.playerCard_OnClick = function (event) {

        var gameState = actionManager.getCurrentGameState();
        //start turn
        hasMoreCards = false;
        switch (gameState) {
            case eGameState["normal"]:
                var cardIndex = event.target.id;
                var currPlayer = players.getCurrentPlayer();
                var card = currPlayer.getCards()[cardIndex];
                actionManager.AddCardToPile(currPlayer, card);
                break;
            case eGameState["change_colorful"]:
                var newPileColor = event.target.id;
                pile.setTopCardColor(newPileColor);
                actionManager.setDefaultState();
            case eGameState["taki"]:
                var cardIndex = event.target.id;
                var currPlayer = players.getCurrentPlayer();
                var card = currPlayer.getCards()[cardIndex];
                actionManager.AddCardToPile(currPlayer, card);
                //var hasMoreCards =checkForMoreCardColor();
                break;
            case eGameState["stop"]:
                //handale by switch 2
                break;
        }
        updatePlayerTopCardPile(); //every player need to know what the cuurnet card in pile

        ///***** the taki bug is here
        /*when you press taki and you should stay in taki state
        the function actionManager.getGameResult(); change the state of the 
        game to normal again and it should be like that */
        
        var turnResult = actionManager.getGameResult();

        return turnResult;
    }


    this.continueTheGame = function (turnResult) {
        switch (turnResult) {
            case -1:
                break;
            case eGameState["normal"]:
                players.nextPlayerTurn();
                break;
            case  eGameState["change_colorful"]:  //user or bot need to pick color

                break;
            case eGameState["taki"]:
                var hasMoreCards =checkForMoreCardColor();
                if (!hasMoreCards) {
                    players.nextPlayerTurn();
                    actionManager.setDefaultState();
                }
                else {
                    // if the player has more card we force him to play again
                    players.getCurrentPlayer().startYourTurnFunc();
                }
                break;
            case eGameState["stop"]:
                actionManager.setDefaultState();
                players.jumpNextPlayerTurn();
                break;
        }
    }


    function updatePlayerTopCardPile() {
        var playersArr = players.getPlayersArray();
        for (var i = 0; i < playersArr.length; i++) {
            playersArr[i].setPileTopCard(pile.getTopCardFromPile());
        }
    }

    function checkForMoreCardColor() {
        var result = false;
        var currPlayer = players.getCurrentPlayer();
        var cards = currPlayer.getCards();
        var pileColor = pile.getTopCardColor();

        cards.forEach(card => {

            if (card.getColor() === pileColor || card.getId() === "change_colorful") {
                result = true;
            }
        });
        return result;
    }

    this.getActionManager = function () {
        return actionManager;
    }
}
