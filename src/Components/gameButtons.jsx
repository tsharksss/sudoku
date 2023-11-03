import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, startGame } from '../utils'

export const GameButtons = () => {
    const { table, step } = useSelector(state => state.table)
    return (
        <div className='wrapper_buttons'>
            <button onClick={() => startGame(table, step)}>Start game</button>
            <button onClick={() => isEmpty(table)}>Очитить</button>
            <button>Start game</button>
            <button>Start game</button>
        </div>
    )
}
