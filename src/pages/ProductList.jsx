import { Announcement } from "../components/Announcement";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Products } from "../components/Products";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import styled from "styled-components";

import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.span`
  padding: 30px;
`;

const FilterText = styled.span`
  padding: 20px;
  font-weight: 600;
  ${mobile({ padding: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px", width: "100%" })}
`;

const Option = styled.option`
  border: 3px;
`;

export const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e)=>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name] : value 
    });
    console.log(filters);
  }


  return (
    <div>
      <Announcement />
      <Navbar />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" defaultValue={"DEFAULT"} onChange={handleFilters}>
            <Option value="DEFAULT" disabled>
              Color
            </Option>
            <Option>Red</Option>
            <Option>Yellow</Option>
            <Option>Pink</Option>
            <Option>Green</Option>
            <Option>Gray</Option>
            <Option>Voilet</Option>
          </Select>
          <Select name="size" defaultValue={"DEFAULT"} onChange={handleFilters}>
            <Option value={"DEFAULT"} disabled>
              Size
            </Option>
            <Option value={"s"}>S</Option>
            <Option value={"m"}>M</Option>
            <Option value={"l"}>L</Option>
            <Option value={"xl"}>XL</Option>
            <Option value={"xxl"}>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Product</FilterText>
          <Select defaultValue="newest"  onChange={(e)=>{setSort(e.target.value)}}>
            <Option value="newest">
              Newest
            </Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};
