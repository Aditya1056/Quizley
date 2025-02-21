import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import { BsFillInfoCircleFill } from "react-icons/bs";

import styles from './UserOverview.module.css';

import History from './History';
import Modal from "../UI/Modal/Modal";

import { useAuthContext } from '../../store/AuthContext';

const UserOverview = (props) => {

    const navigate = useNavigate();

    const auth = useAuthContext();

    const [showConfirmQuiz, setShowConfirmQuiz] = useState(false);

    const showConfirmModal = () => {
        setShowConfirmQuiz(true);
    }

    const closeConfirmModal = () => {
        setShowConfirmQuiz(false);
    }

    const openQuiz = () => {
        navigate('/quiz');
    }

    return (
        <>
            <AnimatePresence>
                {
                    showConfirmQuiz && 
                    <Modal>
                        <div className={styles['confirm-content']} >
                            <p>Do you really want to start the quiz?</p>
                        </div>
                        <div className={styles['control-btns']} >
                            <button type="button" className={styles['start-btn']} onClick={openQuiz} >Start</button>
                            <button type="button" className={styles['cancel-btn']} onClick={closeConfirmModal} >Cancel</button>
                        </div>
                    </Modal>
                }
            </AnimatePresence>
            <div className={styles['overview']} >
                <div className={styles['header']}>
                    <h3>Hello {auth.username}, 
                        {(auth.tests && auth.tests.length > 0) && ` Give another attempt to improve your score and skills!`} 
                        {(!auth.tests || auth.tests.length === 0) && ` Give your 1st attempt to check your knowledge!`}
                    </h3>
                    <button type="button" className={styles['quiz-btn']} onClick={showConfirmModal} >Start Quiz</button>
                    <p><BsFillInfoCircleFill className={styles['info-icon']} />This is a time based quiz and each question carry one mark</p>
                </div>
                {
                    auth.tests && auth.tests.length > 0 && <History />
                }
            </div>
        </>
    );
}

export default UserOverview;