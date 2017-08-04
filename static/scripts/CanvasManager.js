"use strict";

export default class CanvasManager{
    constructor(){
        this.can = document.getElementById('can');
        this.holst = this.can.getContext('2d');

        this.holst.fillStyle = '#FFFFFF';
        this.holst.strokeStyle = '#FFFFFF';
        this.holst.lineWidth = 1;
        this.initImages();

        this.clearHolst();
    }

    initImages(){
        this.fon = new Image();
        this.fon.src = "images/gameFon.png";

        this.mRed = new Image();
        this.mGreen = new Image();
        this.mBlue = new Image();
        this.mRed.src  = "images/monsters/mRed.png";
        this.mGreen.src = "images/monsters/mGreen.png";
        this.mBlue.src = "images/monsters/mBlue.png";

        this.redHero = {
            up: new Image(),
            down: new Image(),
            left: new Image(),
            right: new Image()
        };

        this.greenHero = {
            up: new Image(),
            down: new Image(),
            left: new Image(),
            right: new Image()
        };

        this.blueHero = {
            up: new Image(),
            down: new Image(),
            left: new Image(),
            right: new Image()
        };

        this.redHero.up.src = "images/man/rUp.png";
        this.redHero.down.src = "images/man/rDown.png";
        this.redHero.left.src = "images/man/rLeft.png";
        this.redHero.right.src = "images/man/rRight.png";

        this.greenHero.up.src = "images/man/gUp.png";
        this.greenHero.down.src = "images/man/gDown.png";
        this.greenHero.left.src = "images/man/gLeft.png";
        this.greenHero.right.src = "images/man/gRight.png";

        this.blueHero.up.src = "images/man/bUp.png";
        this.blueHero.down.src = "images/man/bDown.png";
        this.blueHero.left.src = "images/man/bLeft.png";
        this.blueHero.right.src = "images/man/bRight.png";
    }

    printAll(myJSON){
        let x1 = parseInt(myJSON.x1);
        let y1 = parseInt(myJSON.y1);
        let w1 = myJSON.w1.toString();

        let x2 = parseInt(myJSON.x2);
        let y2 = parseInt(myJSON.y2);
        let w2 = myJSON.w2.toString();

        let x3 = parseInt(myJSON.x3);
        let y3 = parseInt(myJSON.y3);
        let w3 = myJSON.w3.toString();

        this.clearHolst();

        for (let i = 0; i < myJSON.vrags.length; i++){
            let vragObj = myJSON.vrags[i];
            const x = parseInt(vragObj.x);
            const y = parseInt(vragObj.y);
            switch(vragObj.type) {
                case 1: this.holst.drawImage(this.mRed, x, y, 50, 50); break;
                case 2: this.holst.drawImage(this.mGreen, x, y, 50, 50); break;
                case 3: this.holst.drawImage(this.mBlue, x, y, 50, 50); break;
            }
        }

        switch(w1){
            case "RIGHT":  this.holst.drawImage(this.redHero.right,x1,y1,50,50);  break;
            case "LEFT":  this.holst.drawImage(this.redHero.left,x1,y1,50,50); break;
            case "UP":  this.holst.drawImage(this.redHero.up,x1,y1,50,50); break;
            case "DOWN": this.holst.drawImage(this.redHero.down,x1,y1,50,50);  break;
        }

        switch(w2){
            case "RIGHT":  this.holst.drawImage(this.greenHero.right,x2,y2,50,50);  break;
            case "LEFT":  this.holst.drawImage(this.greenHero.left,x2,y2,50,50); break;
            case "UP":  this.holst.drawImage(this.greenHero.up,x2,y2,50,50); break;
            case "DOWN": this.holst.drawImage(this.greenHero.down,x2,y2,50,50);  break;
        }

        switch(w3){
            case "RIGHT":  this.holst.drawImage(this.blueHero.right,x3,y3,50,50);  break;
            case "LEFT":  this.holst.drawImage(this.blueHero.left,x3,y3,50,50); break;
            case "UP":  this.holst.drawImage(this.blueHero.up,x3,y3,50,50); break;
            case "DOWN": this.holst.drawImage(this.blueHero.down,x3,y3,50,50);  break;
        }

        const t = this;

        for(let i = 0; i < myJSON.pulls.length; i++){
            let pull = myJSON.pulls[i];
            t.drawPula(pull.x, pull.y, pull.color);
        }

        const score = myJSON.score.toString();
        t.drawScoreOfGame(score);
    }

    clearHolst(){
        // set basic parametrs of holst
        this.holst.fillStyle = '#FFFFFF';
        this.holst.strokeStyle = '#FFFFFF';
        this.holst.lineWidth = 1;
        // draw white field
        this.holst.clearRect(0, 0, 700, 500);
        this.holst.fillRect(0, 0, 700, 500);
        this.holst.drawImage(this.fon,0,0,700,500);
    }

    drawScoreOfGame(score){
        const scoreText = "Killed: " + score;

        // draw black priamougol
        this.holst.fillStyle = '#000000';
        this.holst.strokeStyle = '#000000';
        this.holst.fillRect(0, 0, 700, 30);

        // draw white text
        this.holst.fillStyle = "#FFFFFF";
        this.holst.font = "18px Tahoma";
        this.holst.fillText(scoreText,50,23);

        // set basic parametrs of holst
        this.holst.fillStyle = '#FFFFFF';
        this.holst.strokeStyle = '#FFFFFF';
        this.holst.lineWidth = 1;
    }

    drawPula(xx,yy,color){
        xx = parseInt(xx);
        yy = parseInt(yy);
        color = parseInt(color);

        if(color === 1){
            this.holst.fillStyle = '#FF0000';
            this.holst.strokeStyle = '#FF0000';
        }

        if(color === 2){
            this.holst.fillStyle = '#00C600';
            this.holst.strokeStyle = '#00C600';
        }

        if(color === 3){
            this.holst.fillStyle = '#0000FF';
            this.holst.strokeStyle = '#0000FF';
        }

        this.holst.fillRect(xx, yy, 10, 10);

        // set basic parametrs of holst
        this.holst.fillStyle = '#FFFFFF';
        this.holst.strokeStyle = '#FFFFFF';
        this.holst.lineWidth = 1;
    }
}
