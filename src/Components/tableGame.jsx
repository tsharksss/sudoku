import React, {useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {showNumber} from '../logic/tableSlice';

export const TableGame = () => {
  const dispatch = useDispatch()
  const {table} = useSelector(state => state.table)

  const handleChangeNumber = (value, id) => {
    console.log(`${id.split('|')} = "${value}"`)
    if (value === '') {
      dispatch(showNumber())
    }
  }

  const handleCreateTable = useMemo(() => {
    return table.map((array, indexTr) => (
      <tr key={'tr' + indexTr}>
        {array.map((item, indexTd) => {
          const id = `${indexTr}|${indexTd}`;
          return (
            <td key={'td' + indexTr + indexTd}>
              <button onClick={() => handleChangeNumber(item, id)}>{item}</button>
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
