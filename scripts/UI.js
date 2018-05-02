function Game() {
    var m_Engine;
    var turnPic;

    this.initGame = function () {
        m_Engine = new GameEngine();
        m_Engine.initEngine();
        document.getElementById("menuWrapper").style.display = "none";
        document.getElementById("gameWrapper").style.display = "block";
        render();
    }

    function chooseColor() {

    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function render() {
        renderPile();
        renderDeck();
        renderPlayers();
        renderTurns(m_Engine.getCurrentPlayer());
    }

    function renderPile() {
        /* old pile  - only one card at top 
        document.getElementById("pile").innerHTML = "";
        var img = new Image();
        img.setAttribute("class", (m_Engine.getPile().getTopCardFromPile()).getAttributes());
        document.getElementById("pile").appendChild(img);
        */
        document.getElementById("pile").innerHTML = "";
        var numOfLoops = m_Engine.getPile().getPileCards().length;

        for (var i = 0; i < numOfLoops; i++) {
            var img = new Image();
            img.setAttribute("class", (m_Engine.getPile().getPileCards()[i]).getAttributes() + " overLapCard");
            var top = getRndInteger(0, 5);
            var left = getRndInteger(0, 5);
            var right = getRndInteger(0, 5);
            var bottom = getRndInteger(0, 5);
            var angle = getRndInteger(0, 360);
            img.style.transform = "rotate(" + angle + "deg)";
            img.style.margin = top + "px " + left + "px" + right + "px " + bottom + "px";
            document.getElementById("pile").appendChild(img);

        }
    }

    function renderDeck() {
        document.getElementById("deck").innerHTML = "";
        var deck = m_Engine.getDeck();
        var numOfLoops = deck.getCards().length;

        for (var i = 0; i < numOfLoops; i++) {
            var img = new Image();
            img.setAttribute("class", "card " + "card_back " + "overLapCard");
            var top = i / 3;
            var left = i / 3;
            img.style.margin = top + "px " + left + "px";
            document.getElementById("deck").appendChild(img);

        }
        document.getElementById("deck").addEventListener("click", deck_OnClick);
    }

    function renderPlayers() {
        var players = m_Engine.getPlayers();
        renderPlayer(players[0], "player");
        renderPlayer(players[1], "bot");
    }

    function renderPlayer(player, playerDivName) {
        document.getElementById(playerDivName).innerHTML = "";
        var playerDiv = document.getElementById(playerDivName);
        var numOfCards = player.getCards().length;
        var left = 0;

        for (var i = 0; i < numOfCards; i++) {
            var img = new Image();
            left += (80 / numOfCards);
            img.style.marginLeft = left + "%";
            img.setAttribute("id", i);
            img.setAttribute("class", player.getCards()[i].getAttributes() + " overLapCard");
            playerDiv.appendChild(img);
            document.getElementById(playerDivName).addEventListener("click", playerCard_OnClick);
        }
    }

    function renderTurns(player) {
        turnPic = new Image();
        if (player.getId() === "human") {
            turnPic.setAttribute("class", "playerTurn");
            document.getElementById("pile").appendChild(turnPic);
        }
        else {
            turnPic.setAttribute("class", "");
        }
    }

    function renderTurnsBoforeTheTurn() {
        var NextPlayer = m_Engine.getPlayers()[(m_Engine.getPlayersObj().getCurrentPlayerIndex() + 1) % 2];
        renderTurns(NextPlayer);
    }

    async function showError() {
        var img = new Image();
        img.setAttribute("class", "notValidAction");
        document.getElementById("pile").appendChild(img);
        await sleep(500);
        document.getElementById("pile").removeChild(img);
    }

    function playerCard_OnClick(e) {

        var turnResult = m_Engine.playerCard_OnClick(e);
        render();
        switch (turnResult) {
            case -1:
                showError();
                break;
            case 0:
                renderTurnsBoforeTheTurn();//should update the pic according to the next player
                                           //before the turn start
                m_Engine.continueTheGame(turnResult);
                break;
            case 1:  //user or bot need to pick color
                chooseColor();
                m_Engine.continueTheGame(turnResult);
                break;
            case 2:
                renderTurnsBoforeTheTurn();
                alert("put all your cards with the same color / TAKI");
                m_Engine.continueTheGame(turnResult);
                break;
            case 3:
                m_Engine.continueTheGame(turnResult);
                break;
        }
    }

    function deck_OnClick() {
        m_Engine.deck_OnClick();
        render();
        m_Engine.getPlayersObj().nextPlayerTurn();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
