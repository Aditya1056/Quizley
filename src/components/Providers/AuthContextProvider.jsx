import AuthContext from "../../store/AuthContext";

import useAuth from "../../hooks/useAuth";

const AuthContextProvider = (props) => {

    const { isLoading, username, tests, sectionA, sectionB, enter, addTest } = useAuth();

    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                username,
                tests,
                sectionA, 
                sectionB, 
                enter, 
                addTest
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;