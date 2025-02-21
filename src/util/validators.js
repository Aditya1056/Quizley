export const minLengthValidator = ({val, minLength}) => {

    if(val && minLength && val.trim().length >= minLength){
        return true;
    }

    return false;
}