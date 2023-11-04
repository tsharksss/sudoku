import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import '../index.css'
import {TableGame} from '../Components/tableGame'
import {SettingGame} from '../Components/settingGame'
import {ShowInputNumber} from '../Components/showInputNumber'
import {GameButtons} from '../Components/gameButtons'
import {generateSudoku} from "../logic/tableSlice";

export const HomePage = () => {
    const dispatch = useDispatch()
    const {showNumber} = useSelector(state => state.table)

    useEffect(() => {
        dispatch(generateSudoku())
    }, [])

    return (
        <div className='container'>
            <h1 className='title'>Sudoku</h1>
            <SettingGame/>
            <div className="wrapper_game">
                <TableGame/>
                <GameButtons/>
            </div>
            {showNumber && <ShowInputNumber/>}
        </div>
    )
}
