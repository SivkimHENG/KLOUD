import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


interface AuthContextType {
  login : () => void
  register : () => void

}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children : ReactNode;
}

export const AuthProvier : FC<AuthProviderProps> = ({children}) => {

  const [token,setToken] = useState(localStorage.getItem("token"));


  _setToken  = (newToken : string) => {
    setToken(newToken);
  }


  

}