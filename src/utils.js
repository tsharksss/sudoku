export const defaultTableSize = [
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", ""]
]

export const group = (array, size) => {
	const result = [];
	let group = [];
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		const obj = {[item]: ""};
		group.push(obj);
		if (group.length === size || i === array.length - 1) {
			result.push(group);
			group = [];
		}
	}
	return result;
}
//
// var getBoard = function () {
// 	let board = [];
// 	for (let i = 0; i <= 8; i++) {
// 		board.push([]);
// 		for (let j = 0; j <= 8; j++) {
// 			board[i].push(document.getElementById((i * 9 + j + 1).toString()).value);
// 		}
// 	}
// 	return board;
// }
// var boardToTable = function (board, flag) {
// 	let sub = board.flat();
// 	for (let i = 1; i <= 81; i++) {
// 		if (flag) {
// 			document.getElementById(i.toString()).value = sub[i - 1];
// 			if (sub[i - 1]) {
// 				document.getElementById(i.toString()).disabled = true;
// 			}
// 		} else {
// 			document.getElementById(i.toString()).value = sub[i - 1];
// 		}
// 	}
// };
// var clearTable = function () {
// 	for (let i = 1; i <= 81; i++) {
// 		document.getElementById(i.toString()).value = "";
// 		document.getElementById(i.toString()).disabled = false;
// 	}
// };
// var solver = function () {
// 	clearInput();
// 	let board = getBoard();
// 	solveSudoku(board);
// 	boardToTable(board, 0);
// }
// var clearInput = function () {
// 	for (let i = 1; i <= 81; ++i) {
// 		if (document.getElementById(i.toString()).value !== "" && document.getElementById(i.toString()).disabled == false)
// 			document.getElementById(i.toString()).value = "";
// 	}
// }
// var checkInput = function () {
// 	let board = getBoard(),
// 		highlight = [];
// 	let matches = isValidSudoku(board, 1);
// 	if (matches.size !== 0)
// 		for (let index of matches)
// 			highlight.push(index);
//
// 	for (let entry of highlight) {
// 		document.getElementById(entry.toString()).style.backgroundColor = "red";
//
// 		setTimeout(() => {
// 			document.getElementById(entry.toString()).style.backgroundColor = "#9003fc"
// 		}, 3500)
// 	}
// 	if (highlight.length == 0) {
// 		let cells = document.querySelectorAll("input");
// 		for (let cell of cells)
// 			cell.style.backgroundColor = "green";
// 		for (let cell of cells)
// 			setTimeout(() => {
// 				cell.style.backgroundColor = "#9003fc";
// 			}, 2000)
// 	}
// }
