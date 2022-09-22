import f from "./js/functions.js";
const board = document.querySelector(".board");
const statsEl = document.querySelector(".stats-box");
const sliderEl = document.querySelector("[type=\"checkbox\"]");
const sizeEl = document.querySelector("[type=\"number\"]");
const btnEl = document.querySelector(".reset");


let field;
let n = 3;
const chars = ["⮾", "⦾"];
field = f.setField(n, board, []);
let stepCnt = n ** 2;
let step = 0;
let startFlag = false;
let statistics = localStorage.getItem("statistics");
if (statistics) {
    statistics = JSON.parse(statistics);
    statistics.forEach(st => {
        statsEl.innerHTML += `<div>${st}</div>`;
    })
} else {
    statistics = [];
}

sizeEl.addEventListener("input", (e) => {
    n = +e.target.value;
    if (!startFlag) {
        field = f.setField(n, board, []);
        f.setStat(`Выбрано поле ${n}x${n}`, statistics, statsEl);
        step = f.playGame(step, board, field, chars, n);
    }
});

// TODO: Создать поле ввода числа на основании которого рисуется поле для игры
step = f.playGame(step, board, field, chars, n);
