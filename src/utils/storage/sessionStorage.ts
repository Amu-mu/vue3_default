const key = import.meta.env.VITE_APP_STORAGE_KEY;

const getSS = (name: string) => JSON.parse(sessionStorage.getItem(key + name) as string)
const setSS = (name: string,data:Object) => sessionStorage.setItem(key + name, JSON.stringify(data));
const clearSS = (name: string) => sessionStorage.removeItem(key + name);;

export { getSS, setSS, clearSS };