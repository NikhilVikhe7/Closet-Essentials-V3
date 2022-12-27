import React from 'react';
import {categories} from "../data";
import CategoryItem from "./CategoryItem";
import styled from "styled-components";
import {mobile, tablet} from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({flexDirection: "column", padding:0})};
  ${tablet({flexDirection: "column", transition:" all 1s ease-in-out"})};
  //transition: all 1s ease-in-out;
`
const Categories = () => {
    return <Container>
        {categories.map(data =>(
            <CategoryItem item = {data}></CategoryItem>
        ))}
    </Container>
};

export default Categories;