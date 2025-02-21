import { useState } from 'react';

import styles from './QuestionB.module.css';

const QuestionB = (props) => {

    const inputChangeHandler = (event) => {
        props.selectionHandler(props.id, event.target.value);
    }

    return (
        <div className={styles['questionb']} >
            <p className={styles['questionb_content']} >{props.question}</p>
            <input 
                type="number" 
                value={props.selectedValue} 
                onChange={inputChangeHandler} 
                placeholder='Enter your answer here...' 
                disabled={props.disabled} 
            />
            {
                props.disabled && <p className={styles['correct-ans']} >Correct Answer: {props.correct}</p>
            }
        </div>
    );
}

export default QuestionB;