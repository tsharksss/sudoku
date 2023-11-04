import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {BOX_SIZE, defaultTableSize, GRID_SIZE} from '../utils'

export const generateTable = createAsyncThunk('table/generate', (size, {dispatch}) => {
    return generateNewEmptyTable(size)
})

const generateNewEmptyTable = (size) => {
    return new Array(size).fill().map(() => new Array(size).fill(null))
}

const resolveSudoku = (table) => {
    const emptyCell = findEmptyCell(table)
    if (!emptyCell) return true;

    const numbers = getRandomNumbers()

    for (let i = 0; i < numbers.length; i++) {
        if (!validate(table, emptyCell.row, emptyCell.col, numbers[i])) continue;
        table[emptyCell.row][emptyCell.col] = numbers[i]

        if (resolveSudoku(table)) return true;
        table[emptyCell.row][emptyCell.col] = null
    }
}

const findEmptyCell = (table) => {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (table[row][col] === null) return {row, col};
        }
    }
    return null;
}

const getRandomNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = numbers.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }
    return numbers
}

const validate = (table, row, col, value) => {
    return validateColumn(table, row, col, value)
        && validateRow(table, row, col, value)
        && validateBox(table, row, col, value)
}

export const validateColumn = (table, row, col, value) => {
    for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
        if (table[iRow][col] === value && iRow !== row) return false
    }
    return true
}
export const validateRow = (table, row, col, value) => {
    for (let iCol = 0; iCol < GRID_SIZE; iCol++) {
        if (table[row][iCol] === value && iCol !== col) return false
    }
    return true
}
export const validateBox = (table, row, col, value) => {
    const firstRowInBox = row - row % BOX_SIZE;
    const firstColInBox = col - col % BOX_SIZE;
    for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
        for (let iCol = firstColInBox; iCol < firstColInBox + BOX_SIZE; iCol++) {
            if (table[iRow][iCol] === value && iRow !== row && iCol !== col) return false
        }
    }
    return true
}

const removeCells = (table, level = initialState.level) => {
    let DIFFICULTY = 30
    switch (level) {
        case "medium":
            DIFFICULTY = Math.floor(Math.pow(initialState.row, 4) / 1.8);
            break;
        case "hard":
            DIFFICULTY = Math.floor(Math.pow(initialState.row, 4) / 1.2);
            break;
        default:
            DIFFICULTY = Math.floor(Math.pow(initialState.row, 4) / 2.4);
            break;
    }
    const resultGrid = [...table].map(row => [...row]);
    let i = 0
    while (i < DIFFICULTY) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        if (resultGrid[row][col] !== null) {
            resultGrid[row][col] = null;
            i++;
        }
    }
    return resultGrid
}

const initialState = {
    table: defaultTableSize,
    duplicateTable: defaultTableSize,
    solutionTable: defaultTableSize,
    row: 3,
    level: 'easy',
    showNumber: false
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    extraReducers: {
        [generateTable.fulfilled]: (state, action) => {
            state.table = action.payload
        }
    },
    reducers: {
        clearMyNumber: (state) => {
            if (state.table !== state.solutionTable){
                state.table = state.duplicateTable
            } else {
                return false
            }
        },
        solutionSudoku: (state) => {
            state.table = state.solutionTable
        },
        changeLevel: (state, action) => {
            state.table = generateNewEmptyTable(Math.pow(initialState.row, 2))
            state.level = action.payload
            resolveSudoku(state.table)
            state.solutionTable = state.table
            state.table = removeCells(state.table, action.payload)
        },
        generateSudoku: (state) => {
            state.table = generateNewEmptyTable(Math.pow(initialState.row, 2))
            resolveSudoku(state.table)
            state.solutionTable = state.table
            state.table = removeCells(state.table)
            state.duplicateTable = state.table
        },
        setRow: (state, action) => {
            state.row = action.payload
        },
        creatTable: (state) => {
            state.table = generateSudoku(state.table)
        },
        showNumber: (state) => {
            state.showNumber = true
        },
        hideNumber: (state) => {
            state.showNumber = false
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    clearMyNumber,
    solutionSudoku,
    changeLevel,
    generateSudoku,
    showNumber,
    hideNumber,
    setRow
} = tableSlice.actions

export default tableSlice.reducer
