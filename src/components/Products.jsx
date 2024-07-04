import styled from "styled-components";
import { popularProducts } from "../data";
import { Product } from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const Products = ({ cat, filters, sort }) => {
  // console.log(cat, filters, sort)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async (e) => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/product?category=${cat}`:
            "http://localhost:5000/api/product"
        );
        setProducts(res.data);
        // console.log(res.data)
      } catch (err) {}
    };
    getProducts();
  }, [cat]);


  useEffect((cat)=>{

    const filtered = [];

    products.map((item)=>{
      if(item.category.includes("women")){
        filtered.push(item)
      }
    })

    cat?
    setFilteredProducts(filtered):setFilteredProducts(products);
  },[cat,filters, products])

  // useEffect(() => {
  //   console.log(products)
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [products, cat, filters]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};
