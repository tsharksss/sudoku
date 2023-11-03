import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { showNumber } from '../logic/tableSlice';

export const TableGame = () => {
    const dispatch = useDispatch()
    const { table, step } = useSelector(state => state.table)

    const handleChangeNumber = (value, id) => {
        console.log(`${id} = "${value}"`)
        // if (event.target.innerText === '') {
        //     dispatch(showNumber())
        // }
    }

    const handleCreateTable = useMemo(() => {
        const rows = [];

        for (let i = 0; i < table.length; i++) {
            const cells = [];

            for (let j = 0; j < table[i].length; j++) {
                const cell = table[i][j];
                const key = Object.keys(cell)[0];
                const value = cell[key];

                cells.push(
                    <td key={key}>
                        <button onClick={(event) => handleChangeNumber(event.target.value, key)}>
                            {value}
                        </button>
                    </td>
                );
            }

            rows.push(<tr key={i}>{cells}</tr>);
        }

        return rows;
        // return table.map((objects, index) => {
        //     <tr key={'tr' + index}>
        //         {objects.map(items => {
        //             for (const [key, value] of Object.entries(items)) {
        //                 return (
        //                     <td key={key}><button onClick={(event) => handleChangeNumber(event.target.value, key)}>{value}</button></td>
        //                 )
        //             }
        //         })}
        //     </tr>
        // });
    }, [table]);

    return (
        <div className='wrapper'>
            <table className='table_game'>
                {handleCreateTable}
            </table>
        </div>
    )
}
