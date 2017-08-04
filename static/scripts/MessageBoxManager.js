"use strict";

import ElementGetter from "./ElementGetter.js";

export default class MessageBoxManager{
    constructor(boxManager){
        this.boxManager = boxManager;
        this.flag = false;
        const objectFinder = new ElementGetter();
        this.box = objectFinder.getIt("messageBox");
        this.textField = objectFinder.getIt("messageBoxText");
        this.fon = objectFinder.getIt("blackFon");
        this.setPosition();
    }

    setPosition(){
        const t = this;
        this.positionInterval = setInterval(function(){
            const ww = parseInt(document.documentElement.clientWidth);
            const hh = parseInt(document.documentElement.clientHeight);
            const xObj = (ww - 500)/2;
            const yObj = (hh - 400)/2 - 50;
            t.box.style.left = xObj + "px";
            t.box.style.top = yObj + "px";
        }, 50);
    }

    setContent(sParam){
        const s = sParam.toString();
        this.textField.innerHTML = s;
    }

    allowGoToAvtorization(){
        this.flag = true;
    }

    hideIt(){
        if(this.flag === true){
            this.boxManager.showBox("avtorizationBoxForAvtorization");
            const getter = new ElementGetter();
            getter.getIt("avtBox_loginField").value = "";
            getter.getIt("avtBox_passwordField").value = "";
            getter.getIt("avtBox_loginField_avtoriz").value = "";
            getter.getIt("avtBox_passwordField_avtoriz").value = "";
        }
        this.box.hidden = true;
        this.fon.hidden = true;
        this.flag = false;
    }

    showIt(){
        this.box.hidden = false;
        this.fon.hidden = false;
        this.flag = false;
    }
};
