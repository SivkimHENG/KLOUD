import { createContext, ReactNode, useCallback, useContext, useReducer } from "react"
import { useNavigate } from "react-router-dom"


const initState = {

    user : null,
    token : '',
    expiresAt : ''
}
type User  = {
    email :string
    username? :string
}

export type StateType = {
    user : User | null
    token : string
    expiresAt : string

}

const enum ACTION_TYPES  {
    LOGIN, 
    LOGOUT,
    UPDATE_USER,

}

type Actions = 
        {type  : ACTION_TYPES.LOGIN, payload : StateType} |
        {type  : ACTION_TYPES.LOGOUT, payload : StateType} |
        {type  : ACTION_TYPES.UPDATE_USER, payload : StateType} 


function AuthReducer(state : StateType, action : Actions)  : StateType{
    switch(action.type){
        case ACTION_TYPES.LOGIN:
        return {
                ...state,
                ...action.payload
            }
        case ACTION_TYPES.LOGOUT:
        return {
                ...state,
                ...initState
            }
        case ACTION_TYPES.UPDATE_USER:
        return {
                ...state,
                ...action.payload
            }

        default:
            return state;
            
    }
}


function useAuthReducerType(initState : StateType) {
    const [ state, dispatch] = useReducer(AuthReducer, initState);
    const navigate = useNavigate();


    const login = useCallback((data : StateType) => {
        dispatch({type : ACTION_TYPES.LOGIN, payload : data})
        navigate('/');

    },[]);


    const logout = useCallback(
        () => { dispatch({type: ACTION_TYPES.LOGOUT }) }, [],
    )


    const updateUser = useCallback(
        (data: StateType) => { dispatch({type: ACTION_TYPES.UPDATE_USER, payload: data }) }, [],
    )
    return { state, login, logout, updateUser}

}

type UseCounterContextType =  ReturnType<typeof useAuthReducerType>;



const AuthContext = createContext<UseCounterContextType>({
    state : initState,
    login : () => {},
    logout : () => {},
    updateUser : () => {},

});

export function AuthProvider ({ children } : {children : React.ReactNode}) {


    return (
        <AuthContext.Provider 
            value={useAuthReducerType(initState)} >
            {children}
        </AuthContext.Provider>


    )

}
export default AuthProvider;

export function useAuth() {
    const authContext = useContext(AuthContext);


    if(!authContext) {
        throw new Error ("Use Auth Provider must be used ");
    }
   return authContext;

}

