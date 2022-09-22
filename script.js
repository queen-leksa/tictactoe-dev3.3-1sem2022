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

let data = f.playGame(step, board, field, chars, n, startFlag, sliderEl);
step = data.step;
startFlag = data.flag;

sizeEl.addEventListener("input", (e) => {
    n = +e.target.value;
    if (!startFlag) {
        field = f.setField(n, board, []);
        f.setStat(`Выбрано поле ${n}x${n}`, statistics, statsEl);
        let data = f.playGame(step, board, field, chars, n, startFlag, sliderEl);
        step = data.step;
        startFlag = data.flag;
    }
});


/*
    TODO: 1) Собирать статистику по ходам
            x сделал ход в ячейку №1
            -|x|-
            0|x|-
            -|-|-
          2) Выводить уведомление о конце игры 
            - игра останавливается и перерисовывается в соответствии с n
          3) Научить кнопку работать
          4) Создать в поле со статистикой кнопку сброса статистики (очищение localStorage)
            - localStorage.removeItem("statistics");
*/