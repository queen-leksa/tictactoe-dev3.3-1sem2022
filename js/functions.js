const setField = (n, board, field) => {
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
    console.log(field);

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
}

export default {setField};