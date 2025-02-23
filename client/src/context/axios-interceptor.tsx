import { useEffect } from "react";
import { useAuth } from "./auth-context"
import useRefreshToken from "./refreshtoken-context";
import axios from "axios";


export default function useAxiosPrivate() {

    const { state } = useAuth();
    const { refresh } = useRefreshToken();


    useEffect(() => {

    });

}
