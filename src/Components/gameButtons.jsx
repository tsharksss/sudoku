import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {solutionSudoku, clearMyNumber, generateSudoku} from "../logic/tableSlice";
import {areArraysEqual} from "../utils";

export const GameButtons = () => {
    const dispatch = useDispatch()
    const {table, solutionTable} = useSelector(state => state.table)

    const handleSolution = () => {
        dispatch(solutionSudoku())
    }

    const handleClearMyNumber = () => {
        const result = dispatch(clearMyNumber())
        console.log(result)
    }

    const handleNextGame = () => {
        dispatch(generateSudoku())
    }

    return (
        <div className='wrapper_buttons'>
            <button onClick={() => handleClearMyNumber()} disabled={areArraysEqual(table, solutionTable)}>Clear</button>
            <button onClick={() => handleSolution()} disabled={areArraysEqual(table, solutionTable)}>Solution</button>
            <button onClick={() => handleNextGame()} disabled={!areArraysEqual(table, solutionTable)}>Next</button>
        </div>
    )
}
