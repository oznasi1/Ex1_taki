var eGameState = { "normal": 0, "change_colorful": 1, "taki": 2, "stop": 3 };

function ActionManager(i_Pile) {

    this.Pile = i_Pile;
    this.gameState = null;
    this.isValidCard = null;
    this.isActionCard = null;
    this.TakiColor = null;

    this.init = function () {

        this.gameState = eGameState["normal"];
        this.isValidCard = false;
        this.isActionCard = false;
    };

    function isActionCardFunc(i_Card) {

        return (i_Card.getId() === "change_colorful" || i_Card.getId() === "taki" || i_Card.getId() === "stop");
    };

    this.checkValidCard = function (i_Card) {

        return (this.Pile.getTopCardColor() === NO_COLOR ||
            i_Card.getColor() === this.Pile.getTopCardColor() ||
            i_Card.getId() === this.Pile.getTopCardId() ||
            i_Card.getId() === "change_colorful");
    };

    this.AddCardToPileWhenTaki = function (i_CurrPlayer, i_Card) {

        this.isValidCard = (i_Card.getColor() === this.TakiColor || (this.Pile.getTopCardId() === "taki" && i_Card.getId() === "taki"));

        if (this.isValidCard) {

            this.Pile.addCard(i_Card);
            i_CurrPlayer.removeCard(i_Card);

            if (i_Card.getId() === "taki") {
                this.TakiColor = i_Card.getColor();
            }
        }
    };


    this.AddCardToPile = function (i_CurrPlayer, i_Card) {

        this.isValidCard = this.checkValidCard(i_Card);
        if (this.isValidCard)
        {
            this.Pile.addCard(i_Card);
            i_CurrPlayer.removeCard(i_Card);

            this.isActionCard = isActionCardFunc(i_Card);
            if (this.isActionCard)
            {
                this.gameState = eGameState[i_Card.getId()];
                if (this.gameState === eGameState["taki"])
                {
                    this.TakiColor = i_Card.getColor();
                }
            }
        }
    }


this.getTurnResult = function () {
    var result = -1; //not added sign

    if (this.isValidCard) {
        result = eGameState["normal"];
        if (this.isActionCard) {
            result = this.gameState;
        }
    }

    return result;
};


this.setDefaultState = function () {
    this.gameState = eGameState["normal"];
    this.isValidCard = true;
    this.isActionCard = false;
};

this.getCurrentGameState = function () {
    return this.gameState;
};
}
