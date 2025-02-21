import { useState } from 'react';

import { RiArrowLeftDoubleFill } from "react-icons/ri";

import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import styles from './SingleTestHistory.module.css';

import Modal from '../UI/Modal/Modal';
import QuestionA from '../Test/QuestionA';
import QuestionB from '../Test/QuestionB';

import { useAuthContext } from '../../store/AuthContext';

const SingleTestHistory = (props) => {

    const auth = useAuthContext();

    const navigate = useNavigate();

    const sectionA = auth.sectionA;
    const sectionB = auth.sectionB;

    const [showResultModal, setShowResultModal] = useState(true);

    const closeResultModal = () => {
        setShowResultModal(false);
    }

    const goBackHandler = () => {
        navigate('/overview');
    }

    const test = auth.tests.find((data) => {
        return data.id === props.id;
    });

    if(!test){
        return (
            <h4 className={styles['fallback']} >Test not found!</h4>
        );
    }

    return (
        <>
            <AnimatePresence>
            {
                showResultModal && 
                <Modal>
                    <div className={styles['result-content']} >
                        <h4 className={styles['result-content-header']} >You have completed this test!</h4>
                        <p className={styles['result-content-score']} >Score : {test.score} / 10</p>
                    </div>
                    <div className={styles['control-btns']} >
                        <button type="button" className={styles['ok-btn']} onClick={closeResultModal} >Ok</button>
                    </div>
                </Modal>
            }
            </AnimatePresence>
            <div className={styles['single-test-history']} >

                <div className={styles['sectiona_header']} >
                    <div className={styles['sectiona_header_content']} >
                        <h4>Section <span>A</span></h4>
                    </div>
                    <div className={styles['sectiona_header_attempted']} >
                        <div className={styles['sectiona_attempted']} >
                            <div style={{width:`${(test.sectionA.length / 5) * 100}%`}} className={styles['sectiona_bar']} />
                        </div>
                        <div className={styles['sectiona_attempted_count']} >
                            {test.sectionA.length}/5
                        </div>
                    </div>
                </div>
                {
                    sectionA.map((question, index) => {

                        let item = test.sectionA.find((data, index) => {
                            return question.id === data.id;
                        });

                        return (
                            <QuestionA 
                                key={question.id} 
                                id={question.id} 
                                question={question.q} 
                                correct={question.correct} 
                                options={question.options} 
                                selectedValue={item ? item.value : undefined} 
                                disabled={true}
                            />
                        );
                    })
                }
                <div className={styles['sectionb_header']} >
                    <div className={styles['sectionb_header_content']} >
                    <h4>Section <span>B</span></h4>
                    </div>
                    <div className={styles['sectionb_header_attempted']} >
                        <div className={styles['sectionb_attempted']} >
                            <div style={{width:`${(test.sectionB.length / 5) * 100}%`}} className={styles['sectionb_bar']} />
                        </div>
                        <div className={styles['sectionb_attempted_count']} >
                            {test.sectionB.length}/5
                        </div>
                    </div>
                </div>
                {
                    sectionB.map((question, index) => {

                        let item = test.sectionB.find((data, index) => {
                            return question.id === data.id;
                        });

                        return (
                            <QuestionB 
                                key={question.id} 
                                id={question.id} 
                                question={question.q} 
                                correct={question.correct} 
                                selectedValue={item ? item.value : undefined} 
                                disabled={true} 
                            />
                        );
                    })
                }
            </div>
            <div className={styles['back-home']} >
                <button 
                    className={styles['home-btn']} 
                    onClick={goBackHandler} 
                >
                    Go Back <RiArrowLeftDoubleFill className={styles['back-icon']} />
                </button>
            </div>
        </>
    );
}

export default SingleTestHistory;