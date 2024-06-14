import {useEffect, useState, Fragment} from "react";
import {useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, Title} from './category.styles';
import { selectCategoriesMap, selectIsCategoriesLoading} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.components";

type CategoryRouteParams = {
    category: string;
}

const Category = () =>{
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const isLoading = useSelector(selectIsCategoriesLoading);
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])
    
    return(
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? <Spinner /> :
                <CategoryContainer>
                    {products &&
                        products.map((product)=><ProductCard key={product.id} product={product} />)}
                </CategoryContainer>
            }
            
        </Fragment>
    )
}

export default Category;