"use strict";

export default class SocketController{
    constructor(type, boxManager, messageBoxManager){
        const url = "ws://game-zomb-server.herokuapp.com/";
        this.socket = new WebSocket(url);
        this.addEventsToClientSocket();
        // type: 1 - create room
        // type 2 - connect to room
        this.type = type;

        this.boxManager = boxManager;
        this.messageBoxManager = messageBoxManager;

        this.addEventsOfKeyBoard();
    }

    setCanvasManager(paramCanvas){
        this.canvasManager = paramCanvas;
    }

    sendToServer(messageText){
        try{
            this.socket.send(messageText.toString());
        }catch(err){
            // error of sending message
        }
    }

    addEventsOfKeyBoard(){
        const t = this;

        t.up = false;
        t.down = false;
        t.left = false;
        t.right = false;

        window.onkeydown = function(event){
            const n = event.keyCode;

            if(n === 87) {
                if(t.up === false) {
                    t.sendToServer("KEY@UP@PUSH");
                }
                t.up = true;
            }

            if(n === 83) {
                if(t.down === false) {
                    t.sendToServer("KEY@DOWN@PUSH");
                }
                t.down = true;
            }

            if(n === 65) {
                if(t.left === false) {
                    t.sendToServer("KEY@LEFT@PUSH");
                }
                t.left = true;
            }

            if(n === 68) {
                if(t.right === false) {
                    t.sendToServer("KEY@RIGHT@PUSH");
                }
                t.right = true;
            }
        };

        window.onkeyup = function(event){
            const n = event.keyCode;

            if(n === 87) {
                if(t.up === true) {
                    t.sendToServer("KEY@UP@POP");
                }
                t.up = false;
            }

            if(n === 83) {
                if(t.down === true) {
                    t.sendToServer("KEY@DOWN@POP");
                }
                t.down = false;
            }

            if(n === 65) {
                if(t.left === true) {
                    t.sendToServer("KEY@LEFT@POP");
                }
                t.left = false;
            }

            if(n === 68) {
                if(t.right === true) {
                    t.sendToServer("KEY@RIGHT@POP");
                }
                t.right = false;
            }
        }
    }

    getMessageType(messageParam){
        const message = messageParam.toString();
        let mass = [];
        mass = message.split("@");
        const type = mass[0];
        return type;
    }

    startSendingRubbish(){
        const t = this;
        const myLogin = localStorage.getItem("loginAA");
        this.intervalForRubbish = setInterval(function(){
            console.log("Send rubbish to server");
            t.socket.send("RUBBISH@" + myLogin);
        }, 3000);
    }

    createRoom(){
        this.socket.send("CREATEROOM&" + localStorage.getItem("loginAA"));
    }

    stopSendingRubbish(){
        clearInterval(this.intervalForRubbish);
        console.log("Rubbish interval was DELETED");
    }

    closeAll(){
        this.socket.close();
    }


    getInfoArray(messageParam){
        const message = messageParam.toString();
        let mass = [];
        mass = message.split("@");
        for(let i = 0; i < mass.length; i++){
            mass[i] = mass[i].toString();
        }
        return mass;
    }

    addEventsToClientSocket(){
        const socket = this.socket;
        const t = this;

        t.flag = false;
        console.log("FlagSocket: " + t.flag);

        socket.onopen = function() {
            console.log("Соединение установлено");
            t.flag = true;
            console.log("FlagSocket: " + t.flag);
            t.startSendingRubbish();
        };

        socket.onclose = function(event) {
            console.log("Соединение закрыто");
            t.flag = false;
            console.log("FlagSocket: " + t.flag);
            t.stopSendingRubbish();
        };

        socket.onmessage = function(event) {
            if(event.data.toString() !==  "ANSWER_RUBBISH") {
                console.log("Получено сообщение: " + event.data);
            }

            const message = event.data.toString();
            const type = t.getMessageType(message);
            const mass = t.getInfoArray(message);

            if(type === "YOUR_ARE"){
                const myId = mass[1];
                console.log("my id: " + myId);
                socket.send("SET_LOGIN@" + localStorage.getItem("loginAA"));
            }

            if(type === "LOGIN_WAS_GET_OK______what_do_you_want"){
                console.log("OPERATION_TYPE");
                if(t.type === 1){
                    t.socket.send("CREATEROOM@" + localStorage.getItem("loginAA"));
                }
                if(t.type === 2){
                    t.socket.send("FINDING_FREE_ROOM");
                }
            }

            if(type === "ROOMSLIST"){
                const contentOfRooms = document.getElementById("roomsListLabel");
                contentOfRooms.innerHTML = "";

                let allRoomsText = "";

                const loginsRoomsString = mass[1].toString();
                let arr = [];
                arr = loginsRoomsString.split("!");
                for(let i = 0; i < arr.length; i++){
                    arr[i] = arr[i].toString();
                    if(arr[i] !== "") {
                        allRoomsText += ("<span class = 'playerRoom'>Комната игрока " + arr[i] + "</span><br>");
                    }
                }
                contentOfRooms.innerHTML = allRoomsText;

                const classMass = document.getElementsByClassName("playerRoom");
                for(let i = 0; i < classMass.length; i++){
                    const element = classMass[i];
                    element.onclick = function(){
                        const s = element.innerHTML;
                        let massiv = [];
                        massiv = s.split(" ");
                        const loginOfRoom = massiv[2].toString();
                        console.log("Выбрать комнату игрока " + loginOfRoom);
                        t.socket.send("WANT_TO_JOIN@" + loginOfRoom);
                    }
                }
            }

            if(type === "ROOM_PLAYERS"){
                let login_1 = mass[1].toString();
                let login_2 = mass[2].toString();
                let login_3 = mass[3].toString();

                if(login_1.length === 0){
                    login_1 = "пусто";
                }

                if(login_2.length === 0){
                    login_2 = "пусто";
                }

                if(login_3.length === 0){
                    login_3 = "пусто";
                }

                if(t.type === 1){
                    document.getElementById("p1").innerHTML = login_1;
                    document.getElementById("p2").innerHTML = login_2;
                    document.getElementById("p3").innerHTML = login_3;
                }

                if(t.type === 2){
                    document.getElementById("ppp1").innerHTML = login_1;
                    document.getElementById("ppp2").innerHTML = login_2;
                    document.getElementById("ppp3").innerHTML = login_3;

                    document.getElementById("MainPlayerName").innerHTML = "Комната игрока " + login_1.toString();
                    t.boxManager.showBox("waitingPlayersRoomForPlayersTwoAndTree");
                }
            }

            if(type === "ROOM_WAS_DELETED"){
                if(t.type === 2){
                    t.socket.close();
                    t.boxManager.showBox("mainMenuBox");
                    t.messageBoxManager.setContent("<h2>Комната была удалена её владельцем.</h2>");
                    t.messageBoxManager.showIt();
                }
            }

            if(type === "START_GAME"){
                console.log("start game with 3 players !!!");
                t.boxManager.showBox("gameCanvasBox");
                t.canvasManager.clearHolst();
            }

            if(type === "GAME_FINISHED"){
                console.log("FINISH game");
                t.socket.close();
                t.boxManager.showBox("mainMenuBox");
                t.messageBoxManager.setContent("<h2>Игра окончена.</h2><p>Один из игроков отключился или был убит.</p>");
                t.messageBoxManager.showIt();
            }

            if(type === "GAME_CONTENT"){
                let s = decodeURIComponent(mass[1].toString());
                let myJSON = JSON.parse(s);
                t.canvasManager.printAll(myJSON);
            }
        };

        socket.onerror = function(error) {
            console.log("Ошибка");
            t.flag = false;
            console.log("FlagSocket: " + t.flag);
            t.stopSendingRubbish();
        };
    }
}