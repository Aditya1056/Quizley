
import { motion } from "framer-motion";

import styles from "./Modal.module.css";

import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {

    return (
        <>
            <Backdrop />
            <div className={styles['modal']} >
                <motion.div 
                    className={styles['modal-content']} 
                    initial={{y:"50%", opacity:0}} 
                    animate={{y:"0%", opacity:1}} 
                    exit={{y:"50%", opacity:0}} 
                    transition={{duration:0.3, type:"tween"}} 
                >
                    {props.children}
                </motion.div>
            </div>
        </>
    );
}

export default Modal;