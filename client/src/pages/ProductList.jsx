import React, {useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import {mobile} from "../responsive";
import {useLocation} from "react-router-dom";

const Container = styled.div`

`
const Title = styled.h1`
  margin: 20px;
  text-transform: capitalize;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({margin:"0 20px", display:"flex", flexDirection:"column"})}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight:"0"})}
`
const Select = styled.select`
  padding: 8px;
  margin-right: 20px;
  ${mobile({margin:"10px 0"})}
`
const Option = styled.option``
const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2] || "all";
    const [filters, setFilters] = useState({
        color:'Color',
        size:'Size'
    });
    const [sort, setSort] = useState("newest");
    const handleFilters =(e)=>{
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }
    return (
        <Container>
            <Announcement></Announcement>
            <Navbar></Navbar>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter</FilterText>
                    <Select name='color'onChange={handleFilters}>
                        <Option>Color</Option>
                        <Option>BLACK</Option>
                        <Option >WHITE</Option>
                        <Option>RED</Option>
                        <Option>BLUE</Option>
                        <Option>YELLOW</Option>
                        <Option>GREEN</Option>
                        <Option>ORANGE</Option>
                        <Option>GRAY</Option>
                    </Select>
                    <Select name='size' onChange={handleFilters}>
                        <Option >Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        <Option>XXL</Option>
                    </Select>


                </Filter>
                <Filter>
                    <FilterText>Sort</FilterText>
                    <Select onChange={e=>setSort(e.target.value)}>
                        <Option value={"newest"}>Newest</Option>
                        <Option value={"asc"}>Price (asc)</Option>
                        <Option value={"desc"}>Price (desc)</Option>
                        <Option value={"rating"}>Rating</Option>
                        <Option value={"popularity"}>Popularity</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}></Products>
            <NewsLetter></NewsLetter>
            <Footer></Footer>
        </Container>
    );
};

export default ProductList;