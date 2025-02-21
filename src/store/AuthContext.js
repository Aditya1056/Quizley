import React, { useContext } from "react";

const AuthContext = React.createContext({
    isLoading:false,
    username:null,
    tests:null,
    sectionA:null,
    sectionB:null,
    enter:() => {},
    addTest:() => {}
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default AuthContext;