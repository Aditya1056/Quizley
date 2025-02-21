import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Loading from "../UI/Loading/Loading";

import { useAuthContext } from "../../store/AuthContext";


const UnAuthProtector = (props) => {

    const auth = useAuthContext();

    const navigate = useNavigate();

    const Component = props.component;

    useEffect(() => {

        if(auth.username && !auth.isLoading){
            navigate('/overview');
        }

    }, [auth.username, auth.isLoading]);

    return (
        <>
            {
                auth.isLoading && <Loading />
            }
            {
                !auth.isLoading && Component
            }
        </>
    );
}

export default UnAuthProtector;