"use strict";

export default class AjaxManager{
    constructor(){
        this.url = "http://prokm.ru/GameColorShooter/";
        this.mass = [];
    }

    addParam(name,value){
        const obj = {};
        obj.name = name.toString();
        obj.value = value.toString();
        this.mass.push(obj);
    }

    sendQuery(scriptName, myFunction){
        let adress = this.url + scriptName + "?";
        for(let i = 0; i < this.mass.length; i++){
            const obj = this.mass[i];
            adress += (obj.name + "=" + obj.value + "&");
        }
        adress += "finish=true";
        console.log(adress);

        const r = new XMLHttpRequest();
        r.open("GET",adress);
        r.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        r.send(null);
        r.onreadystatechange = function() {
            if(r.readyState === 4 && r.status === 200) {
                const answer = r.responseText.toString();
                console.log(answer);
                myFunction.call(this,answer);
            }
        }
    }
}
