import styles from './Error.module.css';

const Error = () => {

    return (
        <div className={styles['error']} >
            <h4>Page not found!</h4>
        </div>
    );
}

export default Error;