import React, {useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {showNumber} from '../logic/tableSlice';

export const TableGame = () => {
    const dispatch = useDispatch()
    const {table, duplicateTable, tableInput,solutionTable,setNumber} = useSelector(state => state.table)
    const handleChangeNumber = (value, id) => {
        const data = {row: parseInt(id.split('|')[0]), col: parseInt(id.split('|')[1])}
        if (duplicateTable[data.row][data.col] === null) {
            dispatch(showNumber(data))
        }
    }

    useEffect(() => {
        const element = document.getElementById(`${tableInput.row},${tableInput.col}`)
        if (setNumber!== null) {
            element.className = ''
            if (solutionTable[tableInput.row][tableInput.col] !== setNumber) {
                element.className += 'error'
            } else {
                element.className += 'done'
            }
        }
    }, [table])

    const handleCreateTable = useMemo(() => {
        return table.map((array, indexTr) => (
            <tr key={'tr' + indexTr}>
                {array.map((item, indexTd) => {
                    const id = `${indexTr}|${indexTd}`;
                    const idDoc = `${indexTr},${indexTd}`;
                    return (
                        <td key={'td' + indexTr + indexTd}>
                            <button id={idDoc} className={duplicateTable[indexTr][indexTd] !== null ? "complete" : ""}
                                    onClick={() => handleChangeNumber(item, id)}>{item}</button>
                        </td>
                    )
                })}
            </tr>
        ))
    }, [table]);

    return (
        <div className='wrapper'>
            <table className='table_game'>
                {handleCreateTable}
            </table>
        </div>
    )
}
