"use strict";

import ElementGetter from "./ElementGetter.js";
import BoxManager from "./BoxManager.js";
import StringManager from "./StringManager.js";
import MessageBoxManager from "./MessageBoxManager.js";
import AjaxManager from "./AjaxManager.js";
import SocketController from "./SocketController.js";
import CanvasManager from "./CanvasManager.js";

class MainScript{
    constructor(){
        this.boxManager = new BoxManager();
        this.messageBoxManager = new MessageBoxManager(this.boxManager);
        this.collectBoxes();
        this.addListenersToButtons();

        this.canvasManager = new CanvasManager();
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
        const getter = new ElementGetter();
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
            const strManager = new StringManager();

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
                const myAjax = new AjaxManager();
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
            const strManager = new StringManager();

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
                const myAjax = new AjaxManager();
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

            t.socketController = new SocketController(1,t.boxManager, t.messageBoxManager);
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
            t.socketController = new SocketController(2,t.boxManager, t.messageBoxManager);
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

        const myAjax = new AjaxManager();
        const getter = new ElementGetter();

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
