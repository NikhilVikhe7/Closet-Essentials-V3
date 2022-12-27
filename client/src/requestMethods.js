import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL
let TOKEN = "";

const updateToken =(token)=>{
    TOKEN = token;
}


export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken}`}
})

export {TOKEN, updateToken};