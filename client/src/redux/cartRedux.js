import {createSlice} from "@reduxjs/toolkit";
import products from "../components/Products";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        _id : "",
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        loadCart:(state, action) =>{
            console.log("load card", action.payload)
            state._id = action.payload._id;
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.quantity = action.payload.quantity;
        },
        addProduct: (state, action) => {
            let isPresent = false;
            state.products.forEach(item => {
                if (item._id === action.payload._id && item.color === action.payload.color && item.size === action.payload.size) {
                    isPresent = true;
                    item.quantity += action.payload.quantity;
                }
            })
            if (!isPresent) {
                state.quantity += 1;
                state.products.push({...action.payload, color: action.payload.color, size: action.payload.size});
            }
            state.total += action.payload.price * action.payload.quantity;
        },
        emptyCart: (state, action) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
            state._id = null;
        },
        increaseQuantity: (state, action) => {
            state.products.forEach(item => {
                if (item._id === action.payload._id && item.color === action.payload.color && item.size === action.payload.size) {
                    item.quantity += 1;
                    state.total += item.price;
                }
            })
        },
        decreaseQuantity: (state, action) => {
            state.total -= action.payload.price;
            state.products.forEach(item => {
                if (item._id === action.payload._id && item.color === action.payload.color && item.size === action.payload.size) {
                    item.quantity -= 1;

                }
            })
        },
        removeProduct:(state, action)=>{
            state.total -= action.payload.price * action.payload.quantity;
            state.products = state.products.filter(item => item._id !== action.payload._id);
            state.quantity -= 1;
        }
    }
})

export const {addProduct, emptyCart, increaseQuantity, decreaseQuantity, removeProduct, loadCart} = cartSlice.actions
export default cartSlice.reducer;