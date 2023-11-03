import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../index.css'
import { TableGame } from '../Components/tableGame'
import { SettingGame } from '../Components/settingGame'
import { ShowInputNumber } from '../Components/showInputNumber'
import { GameButtons } from '../Components/gameButtons'
import { defaultTableSize } from '../utils'

export const HomePage = () => {

    const { showNumber, table } = useSelector(state => state.table)

    const [laoding, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
    }, [table])

    return (
        <div className='container'>
            <h1 className='title'>Судоку</h1>
            <SettingGame setLoading={setLoading} />
            <div className="wrapper_game">
                {!laoding ? <TableGame /> : 'Загрузка...'}
                <GameButtons/>
            </div>
            {showNumber && <ShowInputNumber />}
        </div>
    )
}
