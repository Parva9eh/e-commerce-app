import {useContext, useEffect, useState, Fragment} from "react";
import {useParams} from 'react-router-dom';
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, Title} from './category.styles';
import Spinner from "../../components/spinner/spinner.components";

const Category = () =>{
    const {category} = useParams();
    const {categoriesMap, loading} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])
    
    return(
        <Fragment>
            {
                loading ? <Spinner /> : (
                    <Fragment>
                        <Title>{category.toUpperCase()}</Title>
                        <CategoryContainer>
                            {products &&
                                products.map((product)=><ProductCard key={product.id} product={product} />)}
                        </CategoryContainer>
                    </Fragment>
                )
            }
            
        </Fragment>
    )
}

export default Category;