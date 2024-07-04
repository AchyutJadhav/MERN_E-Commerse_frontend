import styled from "styled-components"
import { categories } from "../data";
import { CategorieyItem } from "./CategorieyItem";
import {mobile} from "../Responsive"
const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    
    ${mobile({padding: "0", flexDirection: "column"})}
`

export const Categories = () => {
  return (
    <Container>
        {categories.map((item) => (
            <CategorieyItem item={item}  key={item.id}/>
        ))}
    </Container>
  )
}
