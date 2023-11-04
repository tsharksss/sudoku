import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import '../index.css'
import {TableGame} from '../Components/tableGame'
import {SettingGame} from '../Components/settingGame'
import {ShowInputNumber} from '../Components/showInputNumber'
import {GameButtons} from '../Components/gameButtons'
import {generateSudoku, hideLoading, showVictoryModal} from "../logic/tableSlice";
import {ShowVictory} from "../Components/showVictory";
import {areArraysEqual} from "../utils";

export const HomePage = () => {
    const dispatch = useDispatch()
    const {showNumber, table, errorCount, showVictory, solutionTable, loading} = useSelector(state => state.table)

    useEffect(() => {
        dispatch(generateSudoku())
    }, [])

    useEffect(() => {
        if (areArraysEqual(table, solutionTable)) {
            dispatch(showVictoryModal())
        }
        console.log(areArraysEqual(table, solutionTable))
    }, [table])

    return (
        <div className='container'>
            <h1 className='title'>Sudoku</h1>
            <SettingGame/>
            <h3>Errors counter: {errorCount}</h3>
            <div className="wrapper_game">
                <TableGame/>
                <GameButtons/>
            </div>
            {showNumber && <ShowInputNumber/>}
            {showVictory && <ShowVictory/>}
        </div>
    )
}
