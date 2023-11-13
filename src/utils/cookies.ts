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
export function SetCookie(key: string, value: string ): void {
  try {
    if(!GetCookie(key))
    {
      console.log("SetCookie func: " + GetCookie(key));
      cookie.setCookie(key, "Bearer "+value, {secure:true, expires: 90, samesite: 'strict'}) 
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
export function GetCookie(key : string): any {
try{
   const cookies =  cookie.getCookie(key);
   if(cookies !== undefined)
   {
      return cookies;
   }else{
      return false; 
   }
  }catch(err){
      console.error("Cookie utils ::: GetCookie function : " , `${err}`); 
  }
}

/**
 * Удаляет cookie
 * @param key  -- имя ключа
 */
export function RemoveCookie(key : string) : void {
 try{
  const cookies = cookie.getCookie(key);
  if(cookies !== null || cookies !== undefined)
  {
      cookie.removeCookie(key);
  }else{
    console.error("Cookie utils ::: GetCookie function : " , `${"Empty params"}`); 
  }
 }catch(err){
    console.error("Cookie utils ::: GetCookie function : " , `${err}`); 
 } 
}
