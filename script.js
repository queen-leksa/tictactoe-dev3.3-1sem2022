import f from "./js/functions.js";
const board = document.querySelector(".board");
const statsEl = document.querySelector(".stats-box");
const sliderEl = document.querySelector("[type=\"checkbox\"]");
const sizeEl = document.querySelector("[type=\"number\"]");
const btnEl = document.querySelector(".reset");


const field = [];
let n = 3;
const chars = ["⮾", "⦾"];
f.setField(n, board, field);
let stepCnt = n ** 2;
let step = 0;
let startFlag = false;
const statistics = [];

sizeEl.addEventListener("input", (e) => {
    n = +e.target.value;
    if (!startFlag) {
        f.setField(n, board, []);
        statistics.push(`Выбрано поле ${n}x${n}`);
        statsEl.innerHTML += `<div>${statistics[statistics.length - 1]}</div>`
    }
});


// TODO: Создать поле ввода числа на основании которого рисуется поле для игры
const cells = board.querySelectorAll(".board__cell");

cells.forEach((cell, i) => {
    cell.addEventListener("click", function(e) {
        if (stepCnt) {
            if (!field[i]) {
                field[i] = chars[step];
                cell.innerHTML = chars[step];
                let win = f.isWin(field, step, n)
                if (win) {
                    alert(win);
                }
                step = +!step;
                stepCnt--;
            }
        }
    });
});

