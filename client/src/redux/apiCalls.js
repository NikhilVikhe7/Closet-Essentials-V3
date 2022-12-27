import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import {publicRequest, updateToken, userRequest} from "../requestMethods";
import axios from "axios";
import {loadCart} from "./cartRedux";

export const login = async (dispatch, user) =>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        updateToken(res.data.accessToken);
        console.log(res.data.accessToken);
        const cart = await axios.get(`${process.env.REACT_APP_BASE_URL}/carts/find/${res.data._id}`,{
            headers:{
                "token": `Bearer ${res.data.accessToken}`
            }
        })
        // const cart = await getCart(res.data._id);
        console.log(cart, "cartsss");
        dispatch(loadCart(cart.data));

    }catch (err){
        dispatch(loginFailure())
        prompt("Wrong Credentials");
    }
}

export const getCart = async (id) =>{
    try{
        const res = await userRequest.get(`/carts/find/${id}`);
        return res.data;
    }catch (err){
        console.log(err);
    }
}

// export const updateCart = async (id, quantity, color, size)=>{
//     try{
//         const newProduct = {productId:id, quantity, color,size};
//         console.log(newProduct, "new product")
//         const res = await userRequest.put(`/carts/${id}`, newProduct);
//     }catch (err){
//         console.log(err);
//     }
// }