import styles from './Input.module.css';

import { MdErrorOutline } from "react-icons/md";

const Input = (props) => {

    let formItemClasses = styles['form-item__input'];

    if(props.isInvalid){
        formItemClasses = formItemClasses + ' ' + styles['error'];
    }

    return (
        <>
            <div className={formItemClasses} >
                <input 
                    type={props.type} 
                    value={props.value} 
                    id={props.id} 
                    onChange={props.onChange} 
                    onBlur={props.onBlur} 
                    min={props.min ? props.min : undefined} 
                    max={props.max ? props.max : undefined} 
                    step={props.step ? props.step : undefined} 
                    placeholder={props.placeholder ? props.placeholder : undefined} 
                    disabled={props.disabled ? props.disabled : false} 
                />
            </div>
            {
                props.isInvalid && 
                (
                    <div className={styles['form-item__error']}>
                        <p><MdErrorOutline className={styles['error-icon']} /> {props.errorContent}</p>
                    </div>
                )
            }
        </>
    );

}

export default Input;