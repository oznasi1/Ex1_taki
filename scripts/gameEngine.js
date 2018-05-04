function GameEngine() {

    this.Running = false; 
    this.UI = null;       
    this.Deck = new Deck();
    this.Players = new Players();
    this.Pile = new Pile();
    this.ActionManager = new ActionManager(this.Pile);
    var s_gameTimer = 0;
    this.timeInterval = null;

    this.timer = function(){
        s_gameTimer += 1;
    };

    this.initEngine = function (i_UI, i_NumberOfHuman, i_NumberOfBots) {
        s_gameTimer = 0;
        this.timeInterval = setInterval(this.timer, 1000);
        this.Running = true; // will enable/disable click events
        this.UI = i_UI; //will help us print to screen
        this.Deck.init();
        this.Pile.init(this.Deck);
        this.Players.init(this, this.Pile, this.Deck, i_NumberOfHuman, i_NumberOfBots); // 1 bot, 1 human
        this.ActionManager.init();
        this.UI.Render(this.Deck, this.Pile, this.Players); //new
    };

    this.hasMoreCards = function (i_CurrPlayer) {

        var result = false;
        var cards = i_CurrPlayer.getCards();
        var pileColor = this.Pile.getTopCardColor();

        for(var i = 0; i < cards.length; i++) {

            if (cards[i].getColor() === pileColor){
                result = true;
                break;
            }
        }

        return result;
    };

    this.Deck_OnClick = function (event) {

        if (this.Running) {
            this.DeckClick();

            var isDeckEmpty = (this.Deck.Cards.length === 0);
            if(isDeckEmpty){
                var pileCards = this.Pile.getCards();
                this.Deck.createDeckFromPile(pileCards);
            }
        }
    };

    this.DeckClick = function(){

            var cardFromDeck = this.Deck.getTopCardFromDeck();
            var currPlayer = this.Players.getCurrentPlayer();
            currPlayer.addCard(cardFromDeck);
            this.Players.nextPlayerTurn();
            this.UI.Render(this.Deck, this.Pile, this.Players);
            this.Players.startTurn();
    };
    
    this.getTimer = function(){
        return s_gameTimer;
    }
    //info:
    //-1 = falid
    // 0 = added card
    // 1 = change color
    // 2 = taki
    // // 3 = stop
    this.Card_OnClick = function (event) {

        if (this.Running) {
            var cardIndex = event.target.id;
            this.CardClick(cardIndex);
        }

    };

    this.CardClick = function(i_CardIndex){

        this.startTurn(i_CardIndex);
        this.endTurn();
        this.update(); //deck cards = 1 =>> shffle + check winner losser
        this.Players.startTurn();
    };

    this.update = function () {

        var winnerIndex = this.checkForWinner();
        if (winnerIndex != null) {
            clearInterval(this.timeInterval);
            this.Running = false;
            this.UI.RenderWinnerScreen(this.Players.getPlayersList(), winnerIndex, s_gameTimer);
        }
    };

    this.checkForWinner = function(){

        var winnerIndex = null;
        var playersList = this.Players.getPlayersList();

        for (var i = 0; i < playersList.length; i++) {

            if (playersList[i].getCards().length === 0) {
                winnerIndex = i;
                break;
            }
        }

        return winnerIndex;
    }

    this.startTurn = function (i_CardIndex) {

        var gameState = this.ActionManager.getCurrentGameState();

        switch (gameState) {
            case eGameState["normal"]: //try to add card to pile
                var currPlayer = this.Players.getCurrentPlayer();
                var card = currPlayer.getCards()[i_CardIndex];
                this.ActionManager.AddCardToPile(currPlayer, card);
                break;

            case eGameState["change_colorful"]: //change the pile color
                var newPileColor = i_CardIndex; /////////in this call i_CardIndex == new color
                this.Pile.setTopCardColor(newPileColor);
                var topPileCard = this.Pile.getTopCardFromPile();
                topPileCard.setAttributes("card_change_"+ i_CardIndex);
                topPileCard.setColor(i_CardIndex);
                this.ActionManager.setDefaultState();  //return to normal state & isValidCard = true
                break;

            case eGameState["taki"]:
                var currPlayer = this.Players.getCurrentPlayer();
                var card = currPlayer.getCards()[i_CardIndex];
                this.ActionManager.AddCardToPileWhenTaki(currPlayer, card); //try to add card to pile
                break;

            case eGameState["stop"]: //switch to next player but don't start his turn if he is a bo

                break;
        }
    };

    this.endTurn = function () {

        //render end
        var turnResult = this.ActionManager.getTurnResult();

        switch (turnResult) {
            case -1:        //failed to add card to pile
                this.UI.ShowError();
                break;

            case eGameState["normal"]: //render after player play and then change to next player
                this.Players.nextPlayerTurn(); //add delay to the bot algo
                this.UI.Render(this.Deck, this.Pile, this.Players);
                break;

            case eGameState["change_colorful"]:  //user or bot need to pick color
                this.UI.Render(this.Deck, this.Pile, this.Players);
                this.UI.ShowColorPicker();
                break;

            case eGameState["taki"]:
                if (!this.hasMoreCards(this.Players.getCurrentPlayer())) // run out of Cards in the same color
                {
                    this.ActionManager.setDefaultState();
                    this.Players.nextPlayerTurn();
                    this.UI.Render(this.Deck, this.Pile, this.Players);
                }
                else{
                    this.Players.getCurrentPlayer().setPlayingToFalse();
                    this.UI.Render(this.Deck, this.Pile, this.Players);
                }

                break;

            case eGameState["stop"]:
                this.Players.nextPlayerTurn();
                this.UI.Render(this.Deck, this.Pile, this.Players);
                this.Players.nextPlayerTurn();
                this.ActionManager.setDefaultState();

                break;
        }

    }
}
