import axios, { AxiosError } from "axios";
import * as cookie from "./cookies";
import SourceJson from './source.json';
import {useToast} from 'vue-toastification';

let toast = useToast();
let config = {
  headers: { 
    'Authorization': cookie.GetCookie("JWTAdminKey") as string
  }
}; 

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


/**
 * Пагинация пользователей
 * @param page 
 * @param size 
 * @returns 
 */
export async function UserPagination(page: Number, size: Number) {
  try{
    if(typeof page === 'number' && typeof size === 'number')
    {
      const response = await axios.get(SourceJson.Users.user_pagination + `?Page=${page}&Size=${size}`, config);
      if (response)
      {
        return response;
      }else{
        toast.error("Axios module ::: UserPagination : Данные не вернулись с сервера. Проверь роут и правильность передаваемых параметров!"); 
        return;
      }
    }else{
        toast.error("Axios module ::: UserPagination : Тип входящего аргумента должен быть типа number!"); 
        return ;
    }
  }catch(err:any){
       toast.error(`Axios module ::: UserPagination  exceptions: ${err.error}`); 
       return;
  }
  
}

/**
 * Пагинация ролей 
*/

export async function RolePagination(Page:number, Size:number) {
  try{
    if(Page && typeof Page === 'number' && typeof Size === 'number')
    {
      const response = await axios.get(SourceJson.RolePagination.role_pagination +`?Page=${Page}&Size=${Size}`,config);
      if(response)
      {
        return response.data;
      }else{
        toast.error("Axios module ::: RolePagination func : Данные не вернулись с сервера. Проверь роут и правильность передаваемых параметров!"); 
      } 
    }else{
       toast.error("Axios module ::: RolePagination func : Тип входящего аргумента должен быть типа number!"); 
    }
  }catch(err:any){
       toast.error(`Axios module ::: RolePagination  exceptions: ${err}`); 
  }
}

/**
 * Меняет роль пользователя. 
 * @param userId 
 * @param roleId 
 * @param roleName 
 * @returns 
 */

export async function ChangeRole(userId:string, roleId:string, roleName: string)
{
   try{
      const response = await axios.post(SourceJson.ChangeRole.userRoleChange + `${userId}/changerole`,{"id": roleId, "name": roleName}, config);
      if (response)
      {
        return response;
      }else{
        toast.error("Axios module ::: ChangeRole func : Данные не вернулись с сервера. Проверь роут и правильность передаваемых параметров!"); 
      }
   }catch(err:any){
     return `Axios module ::: ChangeRole : ${err}`
   }
}

/**
 * Получает первые две буквы имени и генерит картинку по умолчанию
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
