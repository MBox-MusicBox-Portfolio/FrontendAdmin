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
      //Authorization: `${GetItem("JWTAdminKey")}`
      'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQ3MWY5Mzg0LWJiNDItNGIyNy04OGQxLTViYzU2NjJkOWY0NCIsIk5hbWUiOiJSaWtodGVyIiwiQXZhdGFyIjpudWxsLCJFbWFpbCI6InNlcmc5ODVleS5yaWtodGVyQG91dGxvb2suY29tIiwiSXNCbG9ja2VkIjpmYWxzZSwiSXNFbWFpbFZlcmlmeSI6dHJ1ZSwiQmlydGhkYXkiOm51bGwsIlJvbGUiOiJhZG1pbiIsImlhdCI6MTY5OTgxNjM4NSwiZXhwIjoxNjk5ODE5OTg1LCJhdWQiOiJjb25maWcuYXVkaWVuY2UiLCJpc3MiOiJjb25maWcuaXNzdWVyIn0.Ucn0I3Kl6vQFtvuqrDJubrwV9vwfAkVENg99AkRH7gc'
    }
  };
   
  console.log("ALLUSERS MODULES " + config.headers.Authorization);
  const response = await axios.get(SourceJson.Users.user_pagination + `?Page=${page}&Size=${size}`, config);
  console.log(response.data);
  return response;
}

/* User */