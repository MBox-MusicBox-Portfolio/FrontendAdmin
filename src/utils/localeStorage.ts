
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