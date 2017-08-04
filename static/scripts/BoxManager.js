"use strict";

import ElementGetter from "./ElementGetter.js";

export default class BoxManager{
    constructor(){
        this.getterObj = new ElementGetter();
        this.arrayOfBoxes = [];
    }

    addBoxId(s){
        const boxName = s.toString();
        this.arrayOfBoxes.push(boxName);
    }

    hideAllBoxes(){
        for(let i = 0; i < this.arrayOfBoxes.length; i++){
            const boxName = this.arrayOfBoxes[i];
            const boxObj = this.getterObj.getIt(boxName);
            boxObj.hidden = true;
        }
    }

    showBox(s){
        this.hideAllBoxes();
        const boxName = s.toString();
        const boxObj = this.getterObj.getIt(boxName);
        boxObj.hidden = false;
    }
}
