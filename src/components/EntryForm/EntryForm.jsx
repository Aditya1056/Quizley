import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { BsFillInfoCircleFill } from "react-icons/bs";

import styles from './EntryForm.module.css';

import Input from "../UI/Input/Input";

import useInput from "../../hooks/useInput";

import { useAuthContext } from '../../store/AuthContext';

import { minLengthValidator } from "../../util/validators";

const EntryForm = (props) => {

    const navigate = useNavigate();

    const auth = useAuthContext();

    const [ isPending, setIsPending ] = useState(false);

    const {
        value: nameValue,
        isValid: nameIsValid,
        isInvalid: nameIsInvalid,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        inputResetHandler: nameResetHandler
    } = useInput(minLengthValidator, 1);

    const formIsValid = nameIsValid;

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setIsPending(true);
        auth.enter(nameValue.trim());
        nameResetHandler();
        setIsPending(false);
        navigate('/overview');
    }

    return (
        <motion.div 
            initial={{y:"80%", opacity:0}} 
            animate={{y:"0%", opacity:1}} 
            transition={{duration:0.5, type:"tween"}} 
            className={styles['entry-form']} 
        >
            <h2>Welcome to Quizley!</h2>
            <form className={styles['form']} onSubmit={formSubmitHandler} >
                <Input 
                    type="text" 
                    value={nameValue}  
                    id="name" 
                    onChange={nameChangeHandler} 
                    onBlur={nameBlurHandler} 
                    placeholder="Enter your name"
                    isInvalid={nameIsInvalid} 
                    errorContent="Name cannot be empty!"
                />
                <div className={styles['form-control']} >
                    <button type="submit" className={styles['enter-btn']} disabled={!formIsValid} >Enter</button>
                </div>
            </form>
            <div className={styles['quizley-des']}>
                <p><BsFillInfoCircleFill className={styles['info-icon']} />Improve your knowledge and skills by participating in quizzes at Quizley</p>
            </div>
        </motion.div>
    );
}

export default EntryForm;