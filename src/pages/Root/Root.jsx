import { motion } from "framer-motion";

import { Outlet } from "react-router-dom";

import { SiQuizlet } from "react-icons/si";

import styles from './Root.module.css';

const Root = (props) => {

    return (
        <>
            <motion.div
                initial={{y: "-100%", opacity: 0}} 
                animate={{y:"0%", opacity: 1}} 
                transition={{duration: 0.5, type:"tween"}} 
                className={styles['nav-bar']} 
            >
                <h3>Quizley <SiQuizlet className={styles['quizley-icon']} /></h3>
            </motion.div>
            <Outlet />
        </>
    );
}

export default Root;