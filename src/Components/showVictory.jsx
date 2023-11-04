import React from 'react';
import '../index.css'
import {useDispatch} from "react-redux";
import {hideVictory} from "../logic/tableSlice";

export const ShowVictory = () => {
    const dispatch = useDispatch()
    return (
        <div className="modal">
            <div className='modal__header'>
                <h3>Поздравляю</h3>
                <button onClick={() => dispatch(hideVictory())} className="close-modal"><span
                    className="exit_dot">&times;</span></button>
            </div>
            <div className='wrapper_victory'>
                <p>Поздравляем с победой</p>
                <button onClick={() => dispatch(hideVictory())}>Сыйграть ещё?</button>
            </div>
        </div>
    );
}
