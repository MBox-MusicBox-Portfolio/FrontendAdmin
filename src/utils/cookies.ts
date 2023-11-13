import * as cookie from "typescript-cookie";
 
/**
 *  Устанавливает значение cookie .
 * @param key -- имя ключа
 * @param value  -- значение
 * @param options  -- опции 
 * Объект options: 
 * Свойство secure и его значения : true/false . Куки отправляются лишь тогда, когда сайт использует HTTPS протокол. 
 * Свойство samesite и его значения: 
 *  -- strict => Куки не будут отправляться при запросах с других доменов.
 *  -- lax    => Куки будут отправляться в том случае, если запрос идет с другого сайта, но только если это "безопасное" навигационное действие, такое как переход по ссылке
 *  -- none   => Безопасность отсутствует . Отправка куки небезопасная 
*/ 
export async function SetCookie(key: string, value: string ): Promise<void> {
  try {
    if (typeof value === 'string') {
      
      await cookie.setCookie(key, "Bearer "+value, {secure:true, expires: 90, samesite: 'strict'}); 
    } else {
      console.error("Cookie utils ::: SetCookie function : Empty or invalid params");
    }
  } catch (err) {
    console.error("Cookie utils ::: SetCookie function:", err);
  }
}

/**
 * Получает значение cookie
 * @param key  -- имя ключа
 * @returns 
 */
export async function GetCookie(key : string) {
try{
   const cookies = await cookie.getCookie(key);
   if(cookie !== null || cookie !== undefined)
   {
      return cookie;
   }else{
      console.error("Cookie utils ::: GetCookie function : " , `${"Empty params "}`); 
   }
  }catch(err){
      console.error("Cookie utils ::: GetCookie function : " , `${err}`); 
}
  
}

/**
 * Удаляет cookie
 * @param key  -- имя ключа
 */
export async function RemoveCoockie(key : string) {
 try{
  const cookies = await cookie.getCookie(key);
  if(cookies !== null || cookies !== undefined)
  {
    await cookie.removeCookie(key);
  }else{
    console.error("Cookie utils ::: GetCookie function : " , `${"Empty params"}`); 
  }
 }catch(err){
    console.error("Cookie utils ::: GetCookie function : " , `${err}`); 
 } 
}

export function SetItem(key: string,value: string) {
    console.log("SetItem says: " + "Bearer " +JSON.stringify(value));
    localStorage.setItem(key, "Bearer " + JSON.stringify(value));
}

export function RemoveItem(key: string) {
    localStorage.removeItem(key);
}

export function GetItem(key: string) {
    var value = localStorage.getItem(key);
    if (value !== null) return value;
    return null;
}
