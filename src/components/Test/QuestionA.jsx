import { useState } from 'react';

import styles from './QuestionA.module.css';

const QuestionA = (props) => {

    const inputChangeHandler = (event) => {
        props.selectionHandler(props.id, event.target.value);
    }

    return (
        <div className={styles['questiona']} >
            <p className={styles['questiona_content']} >{props.question}</p>
            <div className={styles['questiona_options']} >
                {
                    props.options.map((option, index) => {
                        return (
                            <div key={`${props.id}-option-${index}`} className={styles['option']} >
                                <input 
                                    id={option} 
                                    type="radio" 
                                    value={option} 
                                    onChange={inputChangeHandler} 
                                    checked={props.selectedValue === option} 
                                    disabled={props.disabled} 
                                />
                                <label 
                                    className={styles['label']} 
                                    htmlFor={option} 
                                >
                                    {option}
                                </label>
                            </div>
                        );
                    })
                }
            </div>
            {
                props.disabled && <p className={styles['correct-ans']} >Correct Answer: {props.correct}</p>
            }
        </div>
    );
}

export default QuestionA;