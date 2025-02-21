import { useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false
}

const reducerFn = (state, action) => {

    const updatedState = {...state};

    if(action.type === 'NEW_VAL'){
        updatedState.value = action.payload;
    }
    else if(action.type === 'BLUR'){
        updatedState.isTouched = true;
    }
    else if(action.type === 'RESET'){
        updatedState.value = "";
        updatedState.isTouched = false;
    }

    return updatedState;
}

const useInput = (validator, minLength) => {

    const [inputState, dispatch] = useReducer(reducerFn, initialInputState);

    const inputIsValid = validator({val: inputState.value, minLength});

    const inputIsInvalid = !inputIsValid && inputState.isTouched;

    const inputChangeHandler = (event) => {
        dispatch({type:'NEW_VAL', payload: event.target.value});
    }

    const inputBlurHandler = (event) => {
        dispatch({type:'BLUR'});
    }

    const inputResetHandler = () => {
        dispatch({type:'RESET'})
    }

    return {
        value: inputState.value,
        isValid: inputIsValid,
        isInvalid: inputIsInvalid,
        inputChangeHandler,
        inputBlurHandler,
        inputResetHandler
    };
}

export default useInput;
