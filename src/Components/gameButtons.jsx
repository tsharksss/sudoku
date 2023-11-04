import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

export const GameButtons = () => {
	const {table, row} = useSelector(state => state.table)
	const dispatch = useDispatch()
	const [data, setData] = useState(table)
	const isEmpty = (board) => {
		for (let i = 0; i <= 8; ++i)
			for (let j = 0; j <= 8; ++j)
				if (board[i][j] !== "") return false;
		return true;
	}
	const isValidSudoku = (board, flag = 0) => {
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
	const cellRange = (board, i, j) => {
		let nums = [];
		for (let k = 1; k <= 9; k++) {
			board[i][j] = k;
			if (isValidSudoku(board)) nums.push(k);
			board[i][j] = "";
		}
		return nums;
	};
	const minRange = (board) => {
		let min = 9, ii, jj, choices;
		for (let i = 0; i <= 8; i++) {
			for (let j = 0; j <= 8; j++) {
				if (board[i][j] === "") {
					let val = cellRange(board, i, j);
					if (val.length <= min) {
						min = val.length;
						ii = i;
						jj = j;
						choices = val;
					}
				}
			}
		}
		if (isEmpty(board)) {
			ii = Math.floor(Math.random() * 9);
			jj = Math.floor(Math.random() * 9);
			return {ii, jj, choices}
		}
		return {ii, jj, choices};
	};
	const solveSudoku = (board) => {
		let {ii, jj, choices} = minRange(board);
		if (ii === undefined) return true;
		for (let choice of choices) {
			board[ii][jj] = choice.toString();
			if (solveSudoku(board)) return board;
		}
		board[ii][jj] = "";
		return false;
	};
	const startGame = (table, size) => {
		let tableLength = 0;
		for (let i = 0; i < table.length; i++) {
			tableLength += table[i].length
		}
		let board = [...data];
		solveSudoku(board)
		let i, j;
		for (let k = 0; k <= (tableLength - 1) - parseInt(tableLength / 2); ++k) {
			i = Math.floor(Math.random() * Math.pow(size, 2));
			j = Math.floor(Math.random() * 9);
			if (board[i][j] !== "") board[i][j] = "";
			else --k;
		}
		console.log(board)
	}
	return (
		<div className='wrapper_buttons'>
			<button onClick={() => startGame(table, row)}>Start game</button>
			<button onClick={() => isEmpty(table)}>Очитить</button>
			<button>Start game</button>
			<button>Start game</button>
		</div>
	)
}
