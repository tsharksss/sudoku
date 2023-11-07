import React, {useEffect, useState, useMemo, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../index.css'
import {hideNumber, setNumber, validate} from '../logic/tableSlice'
import {group} from "../utils";

export const ShowInputNumber = () => {
    const modalRef = useRef();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dispatch = useDispatch()
    const [valid, setValid] = useState([])
    const {tableInput, showNumber, table} = useSelector(state => state.table)

    const handleSelectedNumber = (number) => {
        dispatch(setNumber(number))
    }

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            dispatch(hideNumber())
        }
    };

    useEffect(() => {
        if (showNumber) {
          document.addEventListener('mousedown', handleOutsideClick);
        } else {
          document.removeEventListener('mousedown', handleOutsideClick);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, [showNumber, hideNumber])

    const handleCreateNumbers = useMemo(() => {
        const groupNumbers = group(numbers, 3)
        const rows = []
        for (let i = 0; i < groupNumbers.length; i++) {
            const cells = []
            for (let j = 0; j < groupNumbers[i].length; j++) {
                cells.push(
                    <td key={'td' + j + i}>
                        <button
                            className={valid.includes(groupNumbers[i][j]) ? "button_number" : "button_number disabled"}
                            onClick={() => handleSelectedNumber(groupNumbers[i][j])}
                            disabled={!valid.includes(groupNumbers[i][j])}>{groupNumbers[i][j]}
                        </button>
                    </td>
                )
            }
            rows.push(<tr key={'tr' + i}>{cells}</tr>)
        }
        return rows
    }, [valid])
    const handleCheckEmptyNumber = () => {
        setValid([])
        for (let i = 0; i < numbers.length; i++) {
            if (validate(table, tableInput.row, tableInput.col, numbers[i])) {
                // console.log(numbers[i])
                setValid(prev => [...prev, numbers[i]])
            }
        }
    }

    useEffect(() => {
        handleCheckEmptyNumber()
    }, [showNumber])

    return (
        <div className="modal" ref={modalRef}>
            <div className='modal__header'>
                <h3>Выберите число</h3>
                <button onClick={() => dispatch(hideNumber())} className="close-modal"><span
                    className="exit_dot">&times;</span></button>
            </div>
            <div className='number_wrapper'>
                <table>
                    {handleCreateNumbers}
                </table>
            </div>
        </div>
    )
}
