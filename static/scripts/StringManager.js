"use strict";

export default class StringManager{
    constructor(){
        this.allChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    }

    isNormChar(c){
        const n = this.allChars.indexOf(c);
        return n !== -1;
    }

    stringType(paramS){
        const s = paramS.toString();

        if(s.length === 0){
            return "EMPTY";
        }

        const n = s.length;
        for(let i = 0; i < n; i++){
            const c = s.charAt(i);
            if(this.isNormChar(c) === false){
                return "NO_CORRECT";
            }
        }

        return "OK";
    }
}