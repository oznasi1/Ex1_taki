const NUM_OF_HUMAN = 1;
const NUM_OF_BOT = 1;


function GameUI() {

    var m_Engine = new GameEngine();
    this.turnPic;

    this.initGame = function () {

        m_Engine.initEngine(this, NUM_OF_HUMAN, NUM_OF_BOT);
        document.getElementById("menuWrapper").style.display = "none";
        document.getElementById("gameWrapper").style.display = "block";

    };

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function renderPile(pile) {

        document.getElementById("pile").innerHTML = "";

        var pileCards = pile.getCards();
        var numOfLoops = pileCards.length;

        for (var i = 0; i < numOfLoops; i++) {
            var img = new Image();
            img.setAttribute("class", (pileCards[i].getAttributes() + " overLapCard"));
            var top = getRndInteger(0, 5);
            var left = getRndInteger(0, 5);
            var right = getRndInteger(0, 5);
            var bottom = getRndInteger(0, 5);
            var angle = getRndInteger(0, 360);
            img.style.transform = "rotate(" + angle + "deg)";
            img.style.margin = top + "px " + left + "px" + right + "px " + bottom + "px";
            document.getElementById("pile").appendChild(img);
        }

        renderError();
        renderColorPicker();
    }

    function renderDeck(deck) {
        document.getElementById("deck").innerHTML = "";

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

    function renderPlayers(playersList) {

        renderPlayer(playersList[0], "player");
        renderPlayer(playersList[1], "bot");
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
            var cardToAdd = player.getCards()[i];
            img.setAttribute("class", cardToAdd.getAttributes() + " overLapCard");
            playerDiv.appendChild(img);

            if (playerDivName === "player") //if we create the player we will add click event
            {
                document.getElementById(playerDivName).addEventListener("click", card_OnClick); //this is the normal click event
            }
        }
    }

    function renderTurns(i_CurrentPlayer) {

        this.turnPic = new Image();

        switch (i_CurrentPlayer) {
            case "human":
                this.turnPic.setAttribute("class", "playerTurn");
                document.getElementById("pile").appendChild(this.turnPic);
                break;
            // case "bot":
            //     this.turnPic.setAttribute("class", "botTurn");
            //     document.getElementById("pile").appendChild(this.turnPic);
            //     break;
        }
    }

    function renderError(){

        var img = new Image();
        img.setAttribute("class", "notValidAction");
        img.setAttribute("id", "error_screen")
        img.style.display  = "none";
        document.getElementById("pile").appendChild(img);
    }

    this.Render = function (deck, pile, players) { //human or bot
        renderDeck(deck);
        renderPile(pile);
        renderPlayers(players.getPlayersList(), deck);
        renderTurns(players.getCurrentPlayer().getId());
    };

    function card_OnClick(e) {
        m_Engine.Card_OnClick(e);
    };

    function deck_OnClick(e) {
        m_Engine.Deck_OnClick();
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    this.ShowError = async function () {

        document.getElementById("error_screen").style.display = "block";
        await sleep(1000);
        document.getElementById("error_screen").style.display = "none";
    };

    function renderColorPicker () {
        //"red", "blue", "green", "yellow"
        var colorPicker = document.createElement("div");
        colorPicker.setAttribute("id", "colorPicker");
        colorPicker.setAttribute("class", "btn-group screen_center");
        colorPicker.style.display = "none";

        var button1 = document.createElement("button");
        button1.setAttribute("id", "red");
        button1.setAttribute("class", "btn-group button red");
        button1.addEventListener("click", card_OnClick);
        button1.addEventListener("click", HideColorPicker);
        colorPicker.appendChild(button1);

        var button2 = document.createElement("button");
        button2.setAttribute("id", "blue");
        button2.setAttribute("class", "btn-group button blue");
        button2.addEventListener("click", card_OnClick);
        colorPicker.appendChild(button2);

        var button3 = document.createElement("button");
        button3.setAttribute("id", "green");
        button3.setAttribute("class", "btn-group button green");
        button3.addEventListener("click", card_OnClick);
        colorPicker.appendChild(button3);

        var button4 = document.createElement("button");
        button4.setAttribute("id", "yellow");
        button4.setAttribute("class", "btn-group button yellow");
        button4.addEventListener("click", card_OnClick);
        colorPicker.appendChild(button4);

        // document.getElementById("gameWrapper").appendChild(colorPicker);
        document.getElementById("pile").appendChild(colorPicker);
    }

    this.ShowColorPicker = function(){
        document.getElementById("colorPicker").style.display = "block";
    }

    function HideColorPicker(){
        document.getElementById("colorPicker").style.display = "none";
    }


}
