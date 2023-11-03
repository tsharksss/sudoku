export const defaultTableSize = [
    [{ 1: "" }, { 2: "" }, { 3: "" }, { 4: "" }, { 5: "" }, { 6: "" }, { 7: "" }, { 8: "" }, { 9: "" }],
    [{ 10: "" }, { 11: "" }, { 12: "" }, { 13: "" }, { 14: "" }, { 15: "" }, { 16: "" }, { 17: "" }, { 18: "" }],
    [{ 19: "" }, { 20: "" }, { 21: "" }, { 22: "" }, { 23: "" }, { 24: "" }, { 25: "" }, { 26: "" }, { 27: "" }],
    [{ 28: "" }, { 29: "" }, { 30: "" }, { 31: "" }, { 32: "" }, { 33: "" }, { 34: "" }, { 35: "" }, { 36: "" }],
    [{ 37: "" }, { 38: "" }, { 39: "" }, { 40: "" }, { 41: "" }, { 42: "" }, { 43: "" }, { 44: "" }, { 45: "" }],
    [{ 46: "" }, { 47: "" }, { 48: "" }, { 49: "" }, { 50: "" }, { 51: "" }, { 52: "" }, { 53: "" }, { 54: "" }],
    [{ 55: "" }, { 56: "" }, { 57: "" }, { 58: "" }, { 59: "" }, { 60: "" }, { 61: "" }, { 62: "" }, { 63: "" }],
    [{ 64: "" }, { 65: "" }, { 66: "" }, { 67: "" }, { 68: "" }, { 69: "" }, { 70: "" }, { 71: "" }, { 72: "" }],
    [{ 73: "" }, { 74: "" }, { 75: "" }, { 76: "" }, { 77: "" }, { 78: "" }, { 79: "" }, { 80: "" }, { 81: "" }]]

export const group = (array, size) => {
    const result = [];
    let group = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const obj = { [item]: "" };
        group.push(obj);
        if (group.length === size || i === array.length - 1) {
            result.push(group);
            group = [];
        }
    }
    return result;
}

export const startGame = (table, size) => {
    let tableLength = 0;
    for (let i = 0; i < table.length; i++) {
        tableLength += table[i].length
    }
    let board = table;
    solveSudoku(board)
    let i, j;
    for (let k = 0; k <= (tableLength - 1) - parseInt(tableLength / 2); ++k) {
        i = Math.floor(Math.random() * Math.pow(size, 2));
        j = Math.floor(Math.random() * size);
        Object.entries(board[i][j]).map(([key, value]) => {
            if (board[i][j][key] !== '') {
                board[i][j][key] = ''
            }
        })
    }
}

export const isEmpty = (board) => {
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            Object.entries(board[i][j]).map(([key, obj]) => {
                Object.entries(obj).map(([index, value]) => {
                    if (value !== '') {
                        return false
                    }
                })
            })
        }
    }
    return true;
}
var isValidSudoku = function (board, flag = 0) {
    let helper = [[]], k = 0;
    for (let i = 0; i <= board.length - 1; i++) {
        for (let j = 0; j <= board[i].length - 1; j++) {
            if (board[i][j] !== "") {
                helper[k].push(i);
                helper[k].push(j);
                helper[k].push(3 * Math.floor((i + 1) / 3.5) + 1 + Math.floor((j + 1) / 3.5));
                helper[k].push(parseInt(board[i][j]));
                helper.push([]);
                k++;
            }
        }
    }
    if (flag) {
        let indices = new Set();
        for (let i = 0; i <= helper.length - 1; i++) {
            for (let j = i + 1; j <= helper.length - 1; j++) {
                if ((helper[i][3] == helper[j][3]))
                    if ((helper[i][1]) == (helper[j][1]) || (helper[i][2]) == (helper[j][2]) || (helper[i][0]) == (helper[j][0])) {
                        indices.add(helper[i][0] * 9 + helper[i][1] + 1);
                        indices.add(helper[j][0] * 9 + helper[j][1] + 1);
                    }


            }
        }
        return indices;
    }
    for (let i = 0; i <= helper.length - 1; i++) {
        for (let j = i + 1; j <= helper.length - 1; j++) {
            if ((helper[i][3] == helper[j][3]))
                if ((helper[i][1]) == (helper[j][1]) || (helper[i][2]) == (helper[j][2]) || (helper[i][0]) == (helper[j][0]))
                    return false;

        }
    }
    return true;
};
var cellRange = function (board, i, j, key) {
    let nums = [];
    for (let k = 1; k <= 9; k++) {
        board[i][j][key] = k;
        if (isValidSudoku(board)) nums.push(k);
        board[i][j][key] = "";
    }
    return nums;
};
var minRange = function (table) {
    let board = Object.assign([], table)
    console.log(board)
    let min = 9, ii, jj, choices;
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            Object.entries(board[i][j]).map(([key, value]) => {
                board[i][j][key] = 1
                if (value === "") {
                    let val = cellRange(board, i, j, key);
                    console.log(val)
                    if (val.length <= min) {
                        min = val.length;
                        ii = i;
                        jj = j;
                        choices = val;
                    }
                }
            })
        }
    }
    if (isEmpty(board)) {
        ii = Math.floor(Math.random() * 9);
        jj = Math.floor(Math.random() * 9);
        return { ii, jj, choices }
    }
    return { ii, jj, choices };
};
const solveSudoku = (board) => {
    console.log(minRange(board))
    let { ii, jj, choices } = minRange(board);
    if (ii === undefined) return true;
    for (let choice of choices) {
        board[ii][jj] = choice.toString();
        if (solveSudoku(board)) return board;
    }
    board[ii][jj] = "";
    return false;
};
