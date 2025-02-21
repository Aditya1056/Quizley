import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import styles from './Test.module.css';

import QuestionA from './QuestionA';
import QuestionB from './QuestionB';
import Modal from '../UI/Modal/Modal';

import usePreventRefresh from '../../hooks/usePreventRefresh';

import { useAuthContext } from '../../store/AuthContext';

const formatTime = (time) => {

    let min = Math.floor(time / 60);
    let sec = time % 60;

    min = '0' + min;

    if(sec < 10){
        sec = '0' + sec;
    }

    return `${min}:${sec}`;
}

const Test = (props) => {

    const auth = useAuthContext();

    const navigate = useNavigate();

    const [selectedSectionA, setSelectedSectionA] = useState([]);
    const [selectedSectionB, setSelectedSectionB] = useState([]);

    const [timer, setTimer] = useState(300);

    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const sectionA = auth.sectionA;
    const sectionB = auth.sectionB;

    usePreventRefresh();

    const toggleSectionASelected = (id, value) => {

        let existingIndex = selectedSectionA.findIndex((data, index) => {
            return data.id === id;
        });

        if(existingIndex === -1){
            setSelectedSectionA((prev) => {
                return [...prev, {id, value}];
            });
        }
        else{

            let existingItem = selectedSectionA[existingIndex]; 

            let updatedList = selectedSectionA.filter((data) => {
                return data.id !== id;
            });

            if(existingItem.value !== value){
                updatedList.push({id, value});
            }

            setSelectedSectionA(updatedList);
        }
    }

    const handleSectionBSelected = (id, value) => {

        let existingIndex = selectedSectionB.findIndex((data, index) => {
            return data.id === id;
        });

        if(existingIndex === -1){
            setSelectedSectionB((prev) => {
                return [...prev, {id, value}];
            });
        }
        else{

            let updatedList = selectedSectionB.filter((data) => {
                return data.id !== id;
            });

            if(value){
                updatedList.push({id, value});
            }

            setSelectedSectionB(updatedList);
        }
    }

    const closeConfirmModal = () => {
        setShowSubmitModal(false);
    }

    const openConfirmModal = () => {
        setShowSubmitModal(true);
    }

    const submitQuiz = () => {

        let score = 0;

        selectedSectionA.forEach((data, index) => {

            const item = sectionA.find((info, ind) => {
                return info.id === data.id;
            });

            if(item && data.value === item.correct){
                score++;
            }
        });

        selectedSectionB.forEach((data, index) => {
            const item = sectionB.find((info, ind) => {
                return info.id === data.id;
            });

            if(item && data.value == item.correct){
                score++;
            }
        });

        let test = {
            id: new Date().toISOString(),
            sectionA: selectedSectionA,
            sectionB: selectedSectionB,
            score
        }

        auth.addTest(test);
        navigate(`/test/${test.id}`);
    }

    useEffect(() => {

        const decrement = () => {

            if(timer === 0 || timer < 0){
                submitQuiz();
            }
            else{
                setTimer((time) => (time - 1));
            }
        }

        const testTimer = setTimeout(decrement, 1000);

        return () => {
            clearTimeout(testTimer);
        }

    }, [timer]);

    let progress = (timer / 300) * 100;

    return (

        <>
            <AnimatePresence>
            {
                showSubmitModal && 
                <Modal>
                    <div className={styles['confirm-content']} >
                        <p>Do you really want to end the quiz?</p>
                    </div>
                    <div className={styles['control-btns']} >
                        <button type="button" className={styles['end-btn']} onClick={submitQuiz} >End</button>
                        <button type="button" className={styles['cancel-btn']} onClick={closeConfirmModal} >Cancel</button>
                    </div>
                </Modal>
            }
            </AnimatePresence>
            <div className={styles['test']} >

                <div className={styles['timer']} >
                    <div 
                        className={styles['show-time']} 
                        style={{background: `conic-gradient(rgb(168, 176, 201) ${progress}%, #ddd ${progress}% 100%)`}} 
                    >
                        <p className={styles['timer-text']} >Time Left</p>
                        <p className={styles['timer-time']} >{formatTime(timer)}</p>
                    </div>
                </div>

                <div className={styles['sectiona_header']} >
                    <div className={styles['sectiona_header_content']} >
                        <h4>Section <span>A</span></h4>
                    </div>
                    <div className={styles['sectiona_header_attempted']} >
                        <div className={styles['sectiona_attempted']} >
                            <div style={{width:`${(selectedSectionA.length / 5) * 100}%`}} className={styles['sectiona_bar']} />
                        </div>
                        <div className={styles['sectiona_attempted_count']} >
                            {selectedSectionA.length}/5
                        </div>
                    </div>
                </div>
                {
                    sectionA.map((question, index) => {

                        let item = selectedSectionA.find((data, index) => {
                            return question.id === data.id;
                        });

                        return (
                            <QuestionA 
                                key={question.id} 
                                id={question.id} 
                                question={question.q} 
                                correct={question.correct} 
                                options={question.options} 
                                selectionHandler={toggleSectionASelected} 
                                selectedValue={item ? item.value : undefined} 
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
                            <div style={{width:`${(selectedSectionB.length / 5) * 100}%`}} className={styles['sectionb_bar']} />
                        </div>
                        <div className={styles['sectionb_attempted_count']} >
                            {selectedSectionB.length}/5
                        </div>
                    </div>
                </div>
                {
                    sectionB.map((question, index) => {

                        let item = selectedSectionB.find((data, index) => {
                            return question.id === data.id;
                        });

                        return (
                            <QuestionB 
                                key={question.id} 
                                id={question.id} 
                                question={question.q} 
                                correct={question.correct} 
                                selectionHandler={handleSectionBSelected} 
                                selectedValue={item ? item.value : undefined}
                            />
                        );
                    })
                }
                <div className={styles['quiz-controls']} >
                    <button type="button" className={styles['submit-btn']} onClick={openConfirmModal} >Submit</button>
                </div>
            </div>
        </>
    );
}

export default Test;