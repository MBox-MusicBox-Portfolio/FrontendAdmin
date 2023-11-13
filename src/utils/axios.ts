import axios from "axios";
import * as cookie from "./cookies";
import SourceJson from './source.json';

/* Auth */

export async function Register(username: string, email: string, password: string) {
  const response = await axios.post(SourceJson.Auth.register, {
    Name: username,
    Email: email,
    Password: password,
  });
  return response;
}

export async function Auth(email: string, password: string) {
  const response = await axios.post(SourceJson.Auth.login, {
    Email: email,
    Password: password,
  });
    return response;
}

/* Auth */

/* User */

export async function AllUsers(page: Number, size: Number) {
  let config = {
    headers: { 
      'Authorization': cookie.GetCookie("JWTAdminKey")
    }
  };
   
  console.log("ALLUSERS MODULES " + config.headers.Authorization);
  const response = await axios.get(SourceJson.Users.user_pagination + `?Page=${page}&Size=${size}`, config);
  console.log(response.data);
  return response;
}

/* User */