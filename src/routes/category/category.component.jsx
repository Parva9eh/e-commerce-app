import {useEffect, useState, Fragment} from "react";
import {useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, Title} from './category.styles';
import { selectCategoriesMAp } from "../../store/categories/category.selector";

const Category = () =>{
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMAp);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])
    
    return(
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
                {products &&
                    products.map((product)=><ProductCard key={product.id} product={product} />)}
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;