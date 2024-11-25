const key = import.meta.env.VITE_APP_STORAGE_KEY;

const getLoc = (name: string) => JSON.parse(localStorage.getItem(key + name) as string)
const setLoc = (name: string,data:Object) => localStorage.setItem(key + name, JSON.stringify(data));
const clearLoc = (name: string) => localStorage.removeItem(key + name);;

export { getLoc, setLoc, clearLoc };