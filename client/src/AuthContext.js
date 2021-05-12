import * as React from "react";

export {AuthProvider, useUser};

const INITIAL_STATE = {
    isAuthenticated: false,
    username: null,
    code: null,
    role: null,
    presidio: null
}

const AuthContext = React.createContext({INITIAL_STATE, userDispatch});

function AuthProvider({children}) {
    const [state, dispatch] = React.useReducer(userDispatch, INITIAL_STATE);
    
    return <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>;
    
}

function useUser() {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useUser deve essere usato con un AuthProvider');
    }

    return context;
}

function userDispatch(state, action) {
    var newState = {...state};

    switch (action.type) {

        case 'login':
            newState.username = action.payload.username;
            newState.code = action.payload.code;
            newState.role = action.payload.role;
            newState.presidio = action.payload.presidio;
            newState.isAuthenticated = true;
        break;

        case 'logout':
            newState = {...INITIAL_STATE};
        break;
        
        default:
            throw new Error(`Azione \"${action.type}\" non gestita`)
        break;
    }
    
    return newState;

}