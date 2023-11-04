import React from 'react'
import { useDispatch } from 'react-redux'
import { setRow, creatTable } from '../logic/tableSlice'

export const SettingGame = ({ setLoading }) => {
    const dispatch = useDispatch()
    const handleTableSize = (size) => {
        setLoading(true)
        let data = [], timeArray = []
        for (let i = 1; i <= Math.pow(size, size) * size; i++) {
            if (i % Math.pow(size, 2) !== 0) {
                timeArray.push("")
            } else {
                timeArray.push("")
                data.push(timeArray)
                timeArray = []
            }
        }
        console.log(data)
        dispatch(setRow(size))
        dispatch(creatTable(data))
    }

    return (
        <div className='settings_wrapper'>
            <button onClick={() => handleTableSize(3)}>3x3</button>
            <button onClick={() => window.alert('В разработке')}>6x6</button>
            <button onClick={() => window.alert('В разработке')}>9x9</button>
        </div>
    )
}
