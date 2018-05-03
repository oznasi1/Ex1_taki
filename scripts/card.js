
var faceDownAttribute = "card_back";

function Card(eColor, eId, card_atrributes,actionCard) {
    //attributes[1] is the valid attribute

    this.color = eColor;
    this.id = eId;
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

    this.addAttribute = function (newAttribute) {
        this.attributes.push(newAttribute);
    }

    this.getColor = function(){
        return this.color;
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

