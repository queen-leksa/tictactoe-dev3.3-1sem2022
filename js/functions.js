const setField = (n, board, field) => {
    field = [];
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${n}, 70px)`;
    board.style.gridTemplateRows = `repeat(${n}, 70px)`;
    // const field = [
    //     ["0","1","2"],
    //     ["3","4","5"],
    //     ["6","7","8"]
    // ]

    for (let i = 0; i < n; i++) {
        // field.push([]);
        for (let j = 0; j < n; j++) {
            // i = 0 ??? => i * n + j => 0 1 2
            /*
                0
                    0 * 3 + 0
                    0 * 3 + 1
                    0 * 3 + 2
                1
                    1 * 3 + 0
                    1 * 3 + 1
                    1 * 3 + 2
                2
                    2 * 3 + 0
                    2 * 3 + 1
                    2 * 3 + 2
            */

            // field[i].push(i * n + j);
            // field.push(i * n + j);
            field.push("");
        }
    }

    // for (let row of field) {
    //     let html = "<div class=\"board__row\">";
    //     for (let cell of row) {
    //         html += `<div class="board__cell">${cell}</div>`;
    //     }
    //     html += "</div>";
    //     board.innerHTML += html;
    // }

    for (let cell of field) {
        board.innerHTML += `<div class="board__cell">${cell}</div>`;
    }
    return field;
}
const isWin = function(field, step, n) {
    /*
        [0,1,2,3,4,5,6,7,8]
        [0,1,2]
        [3,4,5]
        [6,7,8]
        [0,3,6]
        [1,4,7]
        [2,5,8]
        [0,4,8]
        [2,4,6]

        n = 4???
        1) Каждая строка в зависимости от n
        0123
        i % n === 0 => i + j
        4567
        2) Каждый столбец в зависимости от n
        i * n + j
        3) i === j
        4) i === j - i
    */
    // field = [0,1,2,3,4,5,6,7]
    let flag = true;
    for (let i = 0; i < n; i++) {
        flag = true;
        for (let j = 1; j < n; j++) {
            if (field[i * n + j] !== "") {
                if (field[i * n + j] !== field[i * n + (j - 1)]) {
                    flag = false;
                    break;
                }
            } else {
                flag = false;
                break;
            }
        }
        if (flag) {
            return `${step} выиграл`;
        }
    }
    /*
        field = [0,1,2,3,4,5,6,7,8]
        i = 1 j = 0
        1 * 3 + 0 = 3
    */
    for (let j = 0; j < n; j++) {
        flag = true;
        for (let i = 1; i < n; i++) {
            if (field[i * n + j] !== "") {
                if (field[i * n + j] !== field[(i - 1) * n + j]) {
                    flag = false;
                    break;
                }
            } else {
                flag = false;
                break;
            }
        }
        if (flag) {
            return `${step} выиграл`;
        }
    }
    for (let i = 1; i < n; i++) {
        flag = true;
        if (field[i * n + i] !== "") {
            if (field[i * n + i] !== field[(i - 1) * n + (i - 1)]) {
                flag = false;
                break;
            }
        } else {
            flag = false;
            break;
        }
    }
    if (flag) {
        return `${step} выиграл`;
    }
    // i = 1 j = n - 1 - i
    /*
        1 2 3 
        4 5 6 
        7 8 9 
    */
    for (let i = 1; i < n; i++) {
        flag = true;
        if (field[i * n + (n - 1 - i)] !== "") {
            if (field[i * n + (n - 1 - i)] !== field[(i - 1) * n + (n - i)]) {
                flag = false;
                break;
            }
        } else {
            flag = false;
            break;
        }
    }
    if (flag) {
        return `${step} выиграл`;
    }
}
const setStat = function(data, s, tag) {
    s.push(data);
    localStorage.setItem("statistics", JSON.stringify(s));
    tag.innerHTML += `<div>${data}</div>`;
}
const playGame = function(step, board, field, chars, n, startFlag, slider) {
    const cells = board.querySelectorAll(".board__cell");
    cells.forEach((cell, i) => {
        cell.addEventListener("click", function(e) {
            if (!startFlag) {
                startFlag = true;
            }
            if (!field[i]) {
                field[i] = chars[step];
                cell.innerHTML = chars[step];
                let win = isWin(field, step, n)
                if (win) {
                    alert(win);
                }
                step = +!step;
                if (step && !slider.checked) {
                    step = autoStep(step, cells, field, chars, n);
                }
            }
        });
    });
    return {step: 0, flag: startFlag};
}
const autoStep = function(step, cells, field, chars, n) {
    let nums = field.reduce((acc, el, i) => {
        if (el === "") {
            acc.push(i)
        }
        return acc;
    }, []);
    if (nums.length) {
        let index = nums[Math.floor(Math.random() * nums.length)];
        setTimeout(function() {
            field[index] = chars[step];
            cells[index].innerHTML = chars[step];
            let win = isWin(field, step, n)
            if (win) {
                alert(win);
            }
        }, 1000);
        return +!step;
    } else {
        alert("Ничья!")
    }
    // console.log(nums);
}
export default {setField, isWin, setStat, playGame};