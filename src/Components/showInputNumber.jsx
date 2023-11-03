import React from 'react'
import { useDispatch } from 'react-redux'
import '../index.css'
import { hideNumber } from '../logic/tableSlice'

export const ShowInputNumber = () => {
    const dispatch = useDispatch()

    const handleSelectedNumber = (number) => {
        console.log(number)
    }

    return (
        <div className="modal">
            <div className='modal__header'>
                <h3>Выберите число</h3>
                <button onClick={() => dispatch(hideNumber())} className="close-modal"><span className="exit_dot">&times;</span></button>
            </div>
            <div className='number_wrapper'>
                <table>
                    <tr>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(1)}>1</button></td>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(2)}>2</button></td>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(3)}>3</button></td>
                    </tr>
                    <tr>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(4)}>4</button></td>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(5)}>5</button></td>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(6)}>6</button></td>
                    </tr>
                    <tr>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(7)}>7</button></td>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(8)}>8</button></td>
                        <td><button className="button_number" onClick={() => handleSelectedNumber(9)}>9</button></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
