import { createSlice } from "@reduxjs/toolkit";

import { defaultTableSize, group } from '../utils'

const initialState = {
    table: defaultTableSize,
    row: 3,
    showNumber: false
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setRow: (state, action) => {
            state.row = action.payload
        },
        creatTable: (state, action) => {
            state.table = action.payload
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
export const { creatTable, showNumber, hideNumber, setRow } = tableSlice.actions

export default tableSlice.reducer
