import axios, { AxiosError } from "axios";
import * as cookie from "./cookies";
import SourceJson from './source.json';
import {useToast} from 'vue-toastification';
import ErrorJson from '../json/ErrorMessage.json'; 
import { sleep } from "./helpers";

let toast = useToast();

// Authorization header
let header = {
  headers: { 
     'Authorization': cookie.GetCookie("JWTAdminKey") as string
  }
}; 

/**
 * Обработчик статус кодов 
 * HTTP Status code handler 
 * @param response 
 * @returns JSON object or error string value
 */
async function HttpStatusCodeHandler(axiosReq:any) : Promise<any>
{
  switch(axiosReq.request.status)
  {
     case 200: return true;
     case 400: 
       const error = JSON.parse(axiosReq.request.response);
       return `${ErrorJson.AxiosError.StatusCode.BadRequest} :  ${JSON.stringify(error.errors)}`; 
     break;
     case 401: 
       const troublers = JSON.parse(axiosReq.request.response);
       return `${ErrorJson.AxiosError.StatusCode.Unauthorized} : ${axiosReq.response.data}` ; 
     break;
     case 403: 
       const errorAuth = JSON.parse(axiosReq.request.response);
       return `${ErrorJson.AxiosError.StatusCode.Unauthorized} : ${JSON.stringify(errorAuth.value)}`;
     break;
     case 502: 
       return `${ErrorJson.AxiosError.StatusCode.InternalServerError} : ${"Bad gateway"} `;
     break;
  }
}

/* -- Не удалять
export async function Register(username: string, email: string, password: string) : Promise<any> {
  const response = await axios.post(SourceJson.Auth.register, {
    Name: username,
    Email: email,
    Password: password,
  });
  return response;
}
*/

/**
 * Authorization for admin user's
 * Авторизация для админ персонала 
 * @param email 
 * @param password 
 * @returns JSON object with response
 */
export async function Auth(email: string, password: string) : Promise<any> {
  try{
    if(typeof email === 'string' && typeof password === 'string'){
      let status;
         const response = await axios.post(SourceJson.Auth.login, {Email: email, Password: password});
         status = await HttpStatusCodeHandler(response) === true ? response: undefined;
      return status;
    }
  }catch(error:any){
     toast.error("Axios module ::: Auth func" + await HttpStatusCodeHandler(error));
    // return(error.response.data.value);
  }
}

/**
 * Пагинация пользователей
 * Pagination users
 * @param page 
 * @param size 
 * @returns array with users 
 */

export async function UserPagination(page: number, size: number) : Promise<any> {
    try {
      if (typeof page === 'number' && typeof size === 'number') {
        let status;
             const response = await axios.get(SourceJson.Users.user_pagination + `?Page=${page}&Size=${size}`,header);
             status = await HttpStatusCodeHandler(response) === true ? response.data : undefined;
          return status.value;
      }else{
         toast.error("Axios module ::: UserPagination func: " + `${ErrorJson.ErrorWebApplication.InvalidArgumentType} number , number . Your types: ` + typeof page +" и " + typeof size );
      }
    } catch (error: any) {
        toast.error("Axios module ::: UserPagination func: " + await HttpStatusCodeHandler(error));
    }
}

/**
 * Пагинация ролей 
 * Pagination roles 
 * @param Page 
 * @param Size 
 * @returns array with roles name
 */

export async function RolePagination(Page:number, Size:number) : Promise<any> {
  try{
    if(Page && typeof Page === 'number' && typeof Size === 'number')
    {
      let status;
      const response = await axios.get(SourceJson.RolePagination.role_pagination + `?Page=${Page}&Size=${Size}`, header);
         status = await HttpStatusCodeHandler(response) === true ? response.data : undefined;
      return status.value;
    }else{
       toast.error("Axios module ::: UserPagination func: " + `${ErrorJson.ErrorWebApplication.InvalidArgumentType} number , number . Your types: ` + typeof Page +" и " + typeof Size );
    }
  }catch(error:any){
       toast.error(`Axios module ::: RolePagination  exceptions:` +  await HttpStatusCodeHandler(error)); 
  }
}

/**
 * Меняет роль пользователя. 
 * Change user role
 * @param userId 
 * @param roleId 
 * @param roleName 
 * @return response or error object
 */

export async function ChangeRole(userId:string, roleId:string, roleName: string) : Promise<any>
{
   try{
    if (typeof userId === 'string' && typeof roleId === 'string' && typeof roleName === 'string')
    {
      let status;
      let response = await axios.post(SourceJson.ChangeRole.userRoleChange + `${userId}/changerole`,{id: roleId, name: roleName}, header);
         status = await HttpStatusCodeHandler(response) === true ? response.data : undefined;
       return status.success;
    }else{
        toast.error("Axios module ::: ChangeRole func: " + `${ErrorJson.ErrorWebApplication.InvalidArgumentType} string , string , string . Your types: ` + typeof userId +" " + typeof roleId + " " + typeof roleName );
    }
   }catch(error:any){
      toast.error(`Axios module ::: ChangeRole func : ` +  await HttpStatusCodeHandler(error));
   }
}

/**
 * Image generation 
 * Generating images with the first two letters of the username
 * @param firstLetterOfUserName 
 * @returns 
 */
export async function GetUserLetters(firstLetterOfUserName: string) : Promise<any>{
  try{
    const letter = await axios.get(SourceJson.DefaultUserImage.source+`${firstLetterOfUserName}`);
    return letter.request.responseURL; 
  }catch(err:any){
    return `Axios module ::: GetUserLetters : ${err}`
  }
}
