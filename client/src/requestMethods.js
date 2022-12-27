import axios from "axios";
import Cookies from "universal-cookie";


const BASE_URL = process.env.REACT_APP_BASE_URL
const cookie = new Cookies();
let TOKEN = cookie.get('token');
// let TOKEN = '';

const updateToken =(token)=>{
    TOKEN = token;
}

// setInterval(()=>{
//     console.log(TOKEN);
//     }
// )


export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})

export {TOKEN, updateToken};