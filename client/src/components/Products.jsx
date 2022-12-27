import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";
import axios from "axios";
import {publicRequest} from "../requestMethods";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(cat !== 'all' ? `/products/?category=${cat}`
                    : "/products/")
                // const res = await axios.get(cat ? `http://localhost:5000/api/products/?category=${cat}`
                //     : "http://localhost:5000/api/products/"
                // );
                setProducts(res.data)
            } catch (err) {

            }
        };
        getProducts();
    }, [cat])


    useEffect(() =>{
        console.log("use effect filter")
        if(cat && filters.color !== 'Color' && filters.size !== 'Size'){
            console.log("use effect filter color != size !=")
            cat && setFilteredProducts(
                products.filter(item => Object.entries(filters).every(([key, value]) =>item[key].includes(value
                )))
            )
        }else if(cat && filters.color !== 'Color' && filters.size === 'Size' ){
            console.log("use effect filter color != size ==")
            setFilteredProducts(
                products.filter(item => item.color.includes(filters.color))
            )
        }else if(cat && filters.color === 'Color' && filters.size !== 'Size'){
            console.log("use effect filter color == size !=")
            setFilteredProducts(
                products.filter(item => item.size.includes(filters.size))
            )
        }else{
            console.log("use effect filter else")
            setFilteredProducts(
                [...products]
            )
        }

    },[products,cat,filters])

    useEffect(()=>{
        let sorted;
        if(sort === "newest"){
            sorted = filteredProducts.sort((a,b) => a.createdAt - b.createdAt );
        }else if(sort === "desc"){
            sorted = filteredProducts.sort((a,b) => a.price - b.price );
        }else if(sort === "asc"){
            sorted = filteredProducts.sort((a,b) => b.price - a.price );
        }
        setFilteredProducts(sorted);
    },[sort])

    return (<Container>

        {cat && filteredProducts.length === 0 ? <h2>Nothing Found</h2> :filteredProducts.map(item => (<Product item={item} key={item.id}/>))}
    </Container>);
};

export default Products;