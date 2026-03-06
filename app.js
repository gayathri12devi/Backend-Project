let gameseq = [];
let userseq = [];
let score  = [];

let btns = ["one","three","two","four"];
let body = document.querySelector("body");

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function() {
    if(started==false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    },250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function levelUp() {
    userseq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random()*3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkAns(idx) {
    if(userseq[idx]==gameseq[idx]) {
        if(userseq.length == gameseq.length) {
            setTimeout(levelUp,1500);
        }
    } else {
        score.push(level);
        h2.innerHTML = `Game over! Your score was <b>${level}<b> <br> Press any key to start <br> New High Score is ${Math.max(...score)}`;
        body.style.backgroundColor = "red";
        setTimeout(function() {
            body.style.backgroundColor = "white";
        },200);
        reset();
    }
}

function btnPress() {
    console.log("btn was pressed");
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(Btn of allBtns) {
    Btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}