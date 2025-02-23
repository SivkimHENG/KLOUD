import { useState } from "react";
import { useAuth } from "./auth-context";
import axios from "axios";

export default function useRefreshToken() {

    const { updateUser } = useAuth();

    async function refresh() {
        return await axios.get(REFRESH_TOKEN, {
            headers : {"Content-Type" : "json/application"},
            withCredentials : true,

        }).then( ({data}) => {
                updateUser(data);
                return data;
            }).catch((err) => console.log(err));

    }
    return { refresh };

}
