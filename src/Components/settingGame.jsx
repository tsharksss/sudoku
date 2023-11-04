import React from 'react'
import {useDispatch} from 'react-redux'
import {changeLevel, generateTable, setRow} from '../logic/tableSlice'

export const SettingGame = () => {
    const dispatch = useDispatch()
    const handleTableSize = (size) => {
        setRow(size)
        dispatch(generateTable(Math.pow(size, 2)))
    }

    const handleChangeLevel = (name) => {
        dispatch(changeLevel(name))
    }

    return (
        <div className='settings_wrapper'>
            <div className="setting_wrapper_rows">
                <button onClick={() => handleTableSize(3)}>3x3</button>
                <button onClick={() => window.alert('В разработке')}>6x6</button>
            </div>
            <div className="setting_wrapper_level">
                <button onClick={() => handleChangeLevel('easy')}>Easy</button>
                <button onClick={() => handleChangeLevel('medium')}>Medium</button>
                <button onClick={() => handleChangeLevel('hard')}>Hard</button>
            </div>
        </div>
    )
}
