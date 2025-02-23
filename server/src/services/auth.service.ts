import db from "../utils/database"
import hashToken from "../utils/hashToken";





export function findRefreshToken(token : string) {

    return db.refreshToken.findUnique({
        where  : {
             hashedToken : hashToken(token)
        },
    });

}


export function deleteRefreshTokenById(id : string) {




}