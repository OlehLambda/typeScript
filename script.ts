let counter = 0;
const input: HTMLElement | null = document.getElementById('input');
const messages: HTMLElement | null = document.getElementById('messages');
const sent: HTMLElement | null = document.getElementById('sent');
const container: HTMLElement | null = document.querySelector('.container');
const allSmile: NodeListOf<HTMLLIElement> | null = document.querySelector(".emoji-list")?.querySelectorAll("li") ?? null;
const inputField = document.getElementById("input") as HTMLInputElement;
const mood: HTMLElement | null = document.getElementById("mood")
const emojiPanel: HTMLElement | null = document.querySelector(".emoji-panel");
const emojiList: HTMLElement | null = document.querySelector(".emoji-list");
const menu: Element | null = document.querySelector("#menu")
const messagesAll: NodeListOf<HTMLLIElement> | null = messages?.querySelectorAll("li") ?? null
let openMenu = true
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");
const copyButton = document.getElementById("content_copy");
const nav = document.getElementById("nav")
menu?.addEventListener("click", function () {
    if (openMenu === true){
        if (container) {
            container.style.left = '4%';
            container.style.width = '95%';
            if(nav){
                nav.style.width = "80%"
                nav.style.left = "10%" 
            }
        }
        if (editButton && deleteButton && copyButton) {
            editButton.style.display = "none";
            deleteButton.style.display = "none";
            copyButton.style.display = "none";
        }
        if (messagesAll) {
            for (let l = 0; l <= messagesAll.length; l++) {
                if(l % 2 == 0){
                    for (let linside = 0; linside <= messagesAll.length; linside++) {
                        if (messagesAll[l] !== messagesAll[linside] && linside % 2 == 0) {
                            messagesAll[linside].style.backgroundColor = "#e8ef3f";
                        }
                    }
                }
            }
        }
        openMenu = false
    } else {
        if (container) {
            container.style.left = '23%';
            container.style.width = '76%';
            if(nav){
                nav.style.width = "60%"
                nav.style.left = "30%" 
            }
        }
        if (editButton && deleteButton && copyButton) {
            editButton.style.display = "none"
            deleteButton.style.display = "none"
            copyButton.style.display = "none"
        }
        if (messagesAll) {
            for (let l = 0; l <= messagesAll.length; l++) {
                if(l % 2 == 0){
                    for (let linside = 0; linside <= messagesAll.length; linside++) {
                        if (messagesAll[l] !== messagesAll[linside] && linside % 2 == 0) {
                            messagesAll[linside].style.backgroundColor = "#e8ef3f";
                        }
                    }
                }
            }
        }
        openMenu = true
    }
});
if (allSmile) {
    allSmile.forEach(item => {
        item.addEventListener("click", function () {
            const clickedButton = item.querySelector("button");
            if (inputField && clickedButton) {
                inputField.value += clickedButton.textContent;
            }
        });
    });
}