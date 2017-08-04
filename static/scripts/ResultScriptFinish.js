/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ElementGetter{
    getIt(s){
        const elementId = s.toString();
        return document.getElementById(elementId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementGetter;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BoxManager_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StringManager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MessageBoxManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AjaxManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SocketController_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CanvasManager_js__ = __webpack_require__(7);










class MainScript{
    constructor(){
        this.boxManager = new __WEBPACK_IMPORTED_MODULE_1__BoxManager_js__["a" /* default */]();
        this.messageBoxManager = new __WEBPACK_IMPORTED_MODULE_3__MessageBoxManager_js__["a" /* default */](this.boxManager);
        this.collectBoxes();
        this.addListenersToButtons();

        this.canvasManager = new __WEBPACK_IMPORTED_MODULE_6__CanvasManager_js__["a" /* default */]();
    }

    collectBoxes(){
        this.boxManager.addBoxId("welcomeBox");
        this.boxManager.addBoxId("avtorizBox");
        this.boxManager.addBoxId("avtorizationBoxForAvtorization");
        this.boxManager.addBoxId("mainMenuBox");
        this.boxManager.addBoxId("waitingPlayersRoom");
        this.boxManager.addBoxId("findRoomBox");
        this.boxManager.addBoxId("waitingPlayersRoomForPlayersTwoAndTree");
        this.boxManager.addBoxId("gameCanvasBox");
    }

    showMenu(){
        this.boxManager.showBox("mainMenuBox");
    }

    addListenersToButtons(){
        const getter = new __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */]();
        const t = this;

        getter.getIt("avtId").onclick = function(){
            t.boxManager.showBox("avtorizationBoxForAvtorization");
        };

        getter.getIt("regBtn").onclick = function(){
            t.boxManager.showBox("avtorizBox");
        };

        getter.getIt("backBtn").onclick = function(){
            t.boxManager.showBox("welcomeBox");
            getter.getIt("avtBox_loginField").value = "";
            getter.getIt("avtBox_passwordField").value = "";
            getter.getIt("avtBox_loginField_avtoriz").value = "";
            getter.getIt("avtBox_passwordField_avtoriz").value = "";
        };

        getter.getIt("backBtn_avtoriz").onclick = function(){
            t.boxManager.showBox("welcomeBox");
            getter.getIt("avtBox_loginField").value = "";
            getter.getIt("avtBox_passwordField").value = "";
            getter.getIt("avtBox_loginField_avtoriz").value = "";
            getter.getIt("avtBox_passwordField_avtoriz").value = "";
        };

        getter.getIt("closeMessageWindBtn").onclick = function(){
            t.messageBoxManager.hideIt();
        };

        getter.getIt("regInSystem").onclick = function(){
            const strManager = new __WEBPACK_IMPORTED_MODULE_2__StringManager_js__["a" /* default */]();

            const loginString = getter.getIt("avtBox_loginField").value;
            const passwordField = getter.getIt("avtBox_passwordField").value;

            const loginResult = strManager.stringType(loginString);
            const passwordResult = strManager.stringType(passwordField);

            if(loginResult !== "OK" || passwordResult !== "OK"){
                let message = "<h2>Ошибка.</h2>";

                if(loginResult === "EMPTY"){
                    message += "<p>";
                    message += "Поле ввода логина пусто.";
                    message += "</p>";
                }
                if(loginResult === "NO_CORRECT"){
                    message += "<p>";
                    message += "Поле ввода логина содержит запретные символы.";
                    message += "</p>";
                }

                if(passwordResult === "EMPTY"){
                    message += "<p>";
                    message += "Поле ввода пароля пусто.";
                    message += "</p>";
                }
                if(passwordResult === "NO_CORRECT"){
                    message += "<p>";
                    message += "Поле ввода пароля содержит запретные символы.";
                    message += "</p>";
                }

                t.messageBoxManager.setContent(message);
                t.messageBoxManager.showIt();
            } else {
                const myAjax = new __WEBPACK_IMPORTED_MODULE_4__AjaxManager_js__["a" /* default */]();
                myAjax.addParam("login",loginString);
                myAjax.addParam("password", passwordField);
                myAjax.sendQuery("scrReg.php",function(s){
                    console.log(s);
                    if(s.indexOf("YES") !== -1){
                        const message = "<h2>Регистрация прошла успешно.</h2>";
                        t.messageBoxManager.setContent(message);
                        t.messageBoxManager.showIt();
                        t.messageBoxManager.allowGoToAvtorization();
                    }
                    if(s.indexOf("NO") !== -1){
                        let message = "<h2>Ошибка.</h2>";
                        message += "<p>Регистрация в системе не выполнена.</p>";
                        message += "<p>Пользователь с таким логином уже есть в базе данных.</p>";
                        t.messageBoxManager.setContent(message);
                        t.messageBoxManager.showIt();
                    }
                });
            }
        };

        getter.getIt("regInSystem_avtoriz").onclick = function(){
            const strManager = new __WEBPACK_IMPORTED_MODULE_2__StringManager_js__["a" /* default */]();

            const loginString = getter.getIt("avtBox_loginField_avtoriz").value;
            const passwordField = getter.getIt("avtBox_passwordField_avtoriz").value;

            const loginResult = strManager.stringType(loginString);
            const passwordResult = strManager.stringType(passwordField);

            if(loginResult !== "OK" || passwordResult !== "OK"){
                let message = "<h2>Ошибка.</h2>";

                if(loginResult === "EMPTY"){
                    message += "<p>";
                    message += "Поле ввода логина пусто.";
                    message += "</p>";
                }
                if(loginResult === "NO_CORRECT"){
                    message += "<p>";
                    message += "Поле ввода логина содержит запретные символы.";
                    message += "</p>";
                }

                if(passwordResult === "EMPTY"){
                    message += "<p>";
                    message += "Поле ввода пароля пусто.";
                    message += "</p>";
                }
                if(passwordResult === "NO_CORRECT"){
                    message += "<p>";
                    message += "Поле ввода пароля содержит запретные символы.";
                    message += "</p>";
                }

                t.messageBoxManager.setContent(message);
                t.messageBoxManager.showIt();
            } else {
                const myAjax = new __WEBPACK_IMPORTED_MODULE_4__AjaxManager_js__["a" /* default */]();
                myAjax.addParam("login",loginString);
                myAjax.addParam("password", passwordField);
                myAjax.sendQuery("scrAvt.php",function(s){
                    console.log(s);
                    if(s.indexOf("AVT_YES") !== -1){
                        let message = "<h2>Авторизация прошла успешно.</h2>";
                        message += "<big><p>Ваш логин: " + loginString +".</p></big>";
                        t.messageBoxManager.setContent(message);
                        t.messageBoxManager.showIt();
                        getter.getIt("closeMessageWindBtn").onclick = function(){
                            t.messageBoxManager.hideIt();
                            localStorage.setItem("loginAA",loginString.toString());
                            localStorage.setItem("passwordAA",passwordField.toString());
                            t.boxManager.showBox("mainMenuBox");
                            getter.getIt("loginInfoLabel").innerHTML = "Ваш логин: " + localStorage.getItem("loginAA");
                        };
                    }
                    if(s.indexOf("AVT_NO") !== -1){
                        let message = "<h2>Ошибка.</h2>";
                        message += "<p>Авторизация не была выполнена.</p>";
                        message += "<p>Вы ввели неверный логин или пароль.</p>";
                        t.messageBoxManager.setContent(message);
                        t.messageBoxManager.showIt();
                    }
                });
            }
        };

        getter.getIt("createRoomBtn").onclick = function(){
            t.boxManager.showBox("waitingPlayersRoom");
            getter.getIt("roomOfPlayerLabel").innerHTML = "Комната игрока " + localStorage.getItem("loginAA");

            t.socketController = new __WEBPACK_IMPORTED_MODULE_5__SocketController_js__["a" /* default */](1,t.boxManager, t.messageBoxManager);
            t.socketController.setCanvasManager(t.canvasManager);

            document.getElementById("p1").innerHTML = "пусто";
            document.getElementById("p2").innerHTML = "пусто";
            document.getElementById("p3").innerHTML = "пусто";

            document.getElementById("p1").innerHTML = localStorage.getItem("loginAA").toString();
        };

        getter.getIt("deleteRoomBtn").onclick = function(){
            t.socketController.closeAll();
            t.boxManager.showBox("mainMenuBox");

            t.messageBoxManager.setContent("<h2>Комната успешно удалена.</h2>");
            t.messageBoxManager.showIt();

            getter.getIt("closeMessageWindBtn").onclick = function(){
                t.messageBoxManager.hideIt();
            };
        };

        getter.getIt("findPlayingRoomBtn").onclick = function(){
            t.boxManager.showBox("findRoomBox");
            t.socketController = new __WEBPACK_IMPORTED_MODULE_5__SocketController_js__["a" /* default */](2,t.boxManager, t.messageBoxManager);
            t.socketController.setCanvasManager(t.canvasManager);
        };

        getter.getIt("stopFindingRooms").onclick = function(){
            t.socketController.closeAll();
            console.log("Поиск комнат окончен");
            t.boxManager.showBox("mainMenuBox");
        };

        getter.getIt("leaveGameRoom").onclick = function(){
            t.socketController.closeAll();
            t.boxManager.showBox("mainMenuBox");
            document.getElementById("ppp1").innerHTML = "____________________";
            document.getElementById("ppp2").innerHTML = "____________________";
            document.getElementById("ppp3").innerHTML = "____________________";
            t.messageBoxManager.setContent("<h2>Вы покинули комнату.</h2>");
            t.messageBoxManager.showIt();
        };

        getter.getIt("leaveGameButton").onclick = function(){
            t.socketController.closeAll();
            t.boxManager.showBox("mainMenuBox");
            document.getElementById("ppp1").innerHTML = "____________________";
            document.getElementById("ppp2").innerHTML = "____________________";
            document.getElementById("ppp3").innerHTML = "____________________";
            console.log("game finished button pressed.");
        }

    }
}


window.onload = function(){
    const mainObj = new MainScript();

    if(localStorage.getItem("loginAA") !== null && localStorage.getItem("loginAA") !== undefined){
        const login = localStorage.getItem("loginAA");
        const password = localStorage.getItem("passwordAA");

        const myAjax = new __WEBPACK_IMPORTED_MODULE_4__AjaxManager_js__["a" /* default */]();
        const getter = new __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */]();

        myAjax.addParam("login",login);
        myAjax.addParam("password",password);
        myAjax.sendQuery("scrAvt.php",function(s) {
            console.log(s);
            if(s.indexOf("AVT_YES") !== -1){
                localStorage.setItem("loginAA",login.toString());
                localStorage.setItem("passwordAA",password.toString());
                mainObj.showMenu();
                getter.getIt("loginInfoLabel").innerHTML = "Ваш логин: " + localStorage.getItem("loginAA");
                console.log("Авторизация при загрузке прошла успешно.");
            } else {
                console.log("Авторизация при загрузке прошла НЕ УСПЕШНО.");
            }
        });
    }
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__ = __webpack_require__(0);




class BoxManager{
    constructor(){
        this.getterObj = new __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */]();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = BoxManager;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class StringManager{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = StringManager;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__ = __webpack_require__(0);




class MessageBoxManager{
    constructor(boxManager){
        this.boxManager = boxManager;
        this.flag = false;
        const objectFinder = new __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */]();
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
            const getter = new __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */]();
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MessageBoxManager;
;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AjaxManager{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = AjaxManager;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class SocketController{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = SocketController;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class CanvasManager{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasManager;



/***/ })
/******/ ]);