import f from "./js/functions.js";
const board = document.querySelector(".board");
const field = [];
let n = 3;
const chars = ["⮾", "⦾"];
f.setField(n, board, field);
let stepCnt = n ** 3;
let step = 0;


// TODO: Создать поле ввода числа на основании которого рисуется поле для игры

const cells = board.querySelectorAll(".board__cell");

cells.forEach((cell, i) => {
    cell.addEventListener("click", function(e) {
        if (stepCnt) {
            if (!field[i]) {
                field[i] = chars[step];
                cell.innerHTML = chars[step];
                step = +!step;
                stepCnt--;
            }
        }
    });
});

