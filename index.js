const allSquare = document.querySelectorAll(".square");
const TBODY = document.querySelector("tbody")
const BTN = document.querySelector("#restart");
const MODAL = document.querySelector(".modal-container");
const MODAL_BTN = document.querySelector("#modalBtn");
const player1Score = document.querySelector("#player1Score")
const player2Score = document.querySelector("#player2Score")

const START = document.querySelector("#start");
const INTRO = document.querySelector("#intro");
const GAME = document.querySelector("#game");

let info = false;
let count = 0;
let player1WinCount = 0;
let player2WinCount = 0;

let winIndex = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

START.addEventListener("click", function() {
    INTRO.classList.add("hide");
    GAME.classList.remove("hide");
})

BTN.addEventListener("click", function () {
    info = false;
    allSquare.forEach((e) => {
        e.innerText = "";
        e.disabled = false;
    })
    for (let i of winIndex) {
        let [element1Style, element2Style, element3Style] = [
            allSquare[i[0]], allSquare[i[1]], allSquare[i[2]]
        ];
        element1Style.classList.remove("border", "border-danger", "text-success");
        element2Style.classList.remove("border", "border-danger", "text-success");
        element3Style.classList.remove("border", "border-danger", "text-success");
    }
})


function addScore(p1, p2) {
    let tr = document.createElement("tr");
    let step = document.createElement("td");
    let player1 = document.createElement("td");
    let player2 = document.createElement("td");
    let message = document.querySelector("#message")

    step.innerHTML = "&#9734;";
    player1.innerText = p1;
    player2.innerText = p2;

    tr.append(step, player1, player2);
    TBODY.append(tr);


    if (TBODY.children.length == 6 ) {
        player1Score.innerText = player1WinCount;
        player2Score.innerText = player2WinCount;

        if (player1WinCount > player2WinCount) {
            message.innerText = "Tebrikler X Kazandı"
        } else if(player1WinCount < player2WinCount) {
            message.innerText = "Tebrikler O Kazandı"
        } else if(player1WinCount == player2WinCount){
            message.innerText = "Oyun Berabere"
        }

        MODAL.classList.remove("hide");
    }
}

MODAL_BTN.addEventListener("click", function () {
    TBODY.innerHTML = "";
    MODAL.classList.add("hide");
    player1WinCount = 0;
    player2WinCount = 0;

    allSquare.forEach((e) => {
        e.innerText = "";
        e.disabled = false;
    })

    for (let i of winIndex) {
        let [element1Style, element2Style, element3Style] = [
            allSquare[i[0]], allSquare[i[1]], allSquare[i[2]]
        ];
        element1Style.classList.remove("border", "border-danger", "text-success");
        element2Style.classList.remove("border", "border-danger", "text-success");
        element3Style.classList.remove("border", "border-danger", "text-success");
    }
})


function score(element) {
    if (element === "X") {
        addScore("Win", "Loss")
        disabled();
        count = 0;
        player1WinCount += 1;
    } else if(element === "O") {
        addScore("Loss", "Win")
        disabled();
        count = 0;
        player2WinCount += 1;
    }
    else if(element === "berabere") {
        addScore("berabere", "berabere")
        disabled();
        count = 0;
    }
}

function win() {
    for (let i of winIndex) {
        let [element1, element2, element3] = [
            allSquare[i[0]].innerText, allSquare[i[1]].innerText, allSquare[i[2]].innerText
        ];
        let [element1Style, element2Style, element3Style] = [
            allSquare[i[0]], allSquare[i[1]], allSquare[i[2]]
        ];
        if (element1 != "" && element3 != "" && element2 != "") {
            if (element1 == element2 && element2 == element3) {
                score(element1);

                element1Style.classList.add("border", "border-danger", "text-success");
                element2Style.classList.add("border", "border-danger", "text-success");
                element3Style.classList.add("border", "border-danger", "text-success");
            }
        }
    }
}

function disabled() {
    allSquare.forEach((e) => {
        e.disabled = true;
    })
}

function enabledBtns() {
    allSquare.forEach((e) => {
        e.innerText = "";
        e.disabled = false;
    })
}

allSquare.forEach(element => {
    element.addEventListener("click", function () {
        if (info) {
            info = false;
            element.innerText = "O";
            element.disabled = true;
        }
        else {
            info = true;
            element.innerText = "X";
            element.disabled = true;
        }
        count += 1;
        if (count === 9) {
            score("berabere")
            disabled();
        }
        win();
        console.log(count)
    })
})



window.onload = enabledBtns;







