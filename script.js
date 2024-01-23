"use strict";
var _a, _b, _c;
var counter = 0;
var input = document.getElementById('input');
var messages = document.getElementById('messages');
var sent = document.getElementById('sent');
var container = document.querySelector('.container');
var allSmile = (_b = (_a = document.querySelector(".emoji-list")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("li")) !== null && _b !== void 0 ? _b : null;
var inputField = document.getElementById("input");
var mood = document.getElementById("mood");
var emojiPanel = document.querySelector(".emoji-panel");
var emojiList = document.querySelector(".emoji-list");
var menu = document.querySelector("#menu");
var messagesAll = (_c = messages === null || messages === void 0 ? void 0 : messages.querySelectorAll("li")) !== null && _c !== void 0 ? _c : null;
var openMenu = true;
var editButton = document.getElementById("edit");
var deleteButton = document.getElementById("delete");
var copyButton = document.getElementById("content_copy");
var nav = document.getElementById("nav");
menu === null || menu === void 0 ? void 0 : menu.addEventListener("click", function () {
    if (openMenu === true) {
        if (container) {
            container.style.left = '4%';
            container.style.width = '95%';
            if (nav) {
                nav.style.width = "80%";
                nav.style.left = "10%";
            }
        }
        if (editButton && deleteButton && copyButton) {
            editButton.style.display = "none";
            deleteButton.style.display = "none";
            copyButton.style.display = "none";
        }
        if (messagesAll) {
            for (var l = 0; l <= messagesAll.length; l++) {
                if (l % 2 == 0) {
                    for (var linside = 0; linside <= messagesAll.length; linside++) {
                        if (messagesAll[l] !== messagesAll[linside] && linside % 2 == 0) {
                            messagesAll[linside].style.backgroundColor = "#e8ef3f";
                        }
                    }
                }
            }
        }
        openMenu = false;
    }
    else {
        if (container) {
            container.style.left = '23%';
            container.style.width = '76%';
            if (nav) {
                nav.style.width = "60%";
                nav.style.left = "30%";
            }
        }
        if (editButton && deleteButton && copyButton) {
            editButton.style.display = "none";
            deleteButton.style.display = "none";
            copyButton.style.display = "none";
        }
        if (messagesAll) {
            for (var l = 0; l <= messagesAll.length; l++) {
                if (l % 2 == 0) {
                    for (var linside = 0; linside <= messagesAll.length; linside++) {
                        if (messagesAll[l] !== messagesAll[linside] && linside % 2 == 0) {
                            messagesAll[linside].style.backgroundColor = "#e8ef3f";
                        }
                    }
                }
            }
        }
        openMenu = true;
    }
});
if (allSmile) {
    allSmile.forEach(function (item) {
        item.addEventListener("click", function () {
            var clickedButton = item.querySelector("button");
            if (inputField && clickedButton) {
                inputField.value += clickedButton.textContent;
            }
        });
    });
}
