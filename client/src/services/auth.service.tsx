

const API_URI = "http://localhost:3000/auth/";

export function register(username : string , email : string, password : string) {

  return fetch(API_URI+ "register",{
    method : "POST",
    headers : {
      "Content-Type" : "application/json",

    },

    body : JSON.stringify({username, email, password})

  })
  
}

export function login(username: string, password : string) :Promise<any> {

  return fetch(API_URI + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ username, password })
  }).then( async (response ) =>{
    if(!response.ok) {
      throw new Error("Login Failed");
    }
    const data = await response.json();
    if(data.accessToken) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  }).catch((err) => {
    console.log("Error login" + err) 
    throw err;
  });
 
}

export function logout() {
  localStorage.removeItem("user");
}
export function getCurrentUser() {

  const userStr =  localStorage.getItem("user");
  if (userStr) {
    return  JSON.parse(userStr);
  }

  return null;

}