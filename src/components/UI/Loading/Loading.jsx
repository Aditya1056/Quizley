import React from "react";

import styles from "./Loading.module.css";

import Backdrop from '../Backdrop/Backdrop';

const Loading = () => {

    return (
        <>
            <Backdrop />
            <div className={styles['loading']} >
                <div className={styles['spinner']} />
            </div>
        </>
    );
}

export default Loading;