
var faceDownAttribute = "card_back";

function Card(i_Color, i_Id, card_atrributes, actionCard) {
    //attributes[1] is the valid attribute

    this.color = i_Color;
    this.id = i_Id;
    this.cardAtrribute = card_atrributes;
    this.isUp = false;
    this.isActionCard = actionCard;
    this.attributes = ["card", faceDownAttribute];

    this.makeCardFaceUp = function () {
        this.attributes[1] = this.cardAtrribute;
        this.isUp = true;
    }

    this.makeCardFaceDown = function () {
        this.attributes[1] = faceDownAttribute;
        this.isUp = false;
    }

    this.getAttributes = function () {
        var attributesStr = this.attributes[0] + " " + this.attributes[1];
        return attributesStr;
    }

    this.setAttributes = function (newAttribute) {
        this.attributes[1] = newAttribute;
    }

    this.getColor = function(){
        return this.color;
    }

    this.setColor = function (i_Color) {
        this.color = i_Color;
    }

    this.getId = function(){
        return this.id;
    }

    this.isUp = function(){
        return this.isUp;
    }

    this.isActionCard = function(){
        return this.isActionCard;
    }
}

