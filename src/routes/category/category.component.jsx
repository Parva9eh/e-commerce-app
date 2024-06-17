import { useEffect, useState, Fragment } from "react";
import { useParams } from 'react-router-dom';
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, Title} from './category.styles';
import Spinner from "../../components/spinner/spinner.components";
import {gql, useQuery} from '@apollo/client';

const GET_CATEGORY = gql`
    query($title: String!){
        getCollectionsByTitle(title: $title){
            id
            title
            items{
                id
                name
                price
                imageUrl
            }
        }
    }
`

const Category = () =>{
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const {data, error, loading } = useQuery(GET_CATEGORY, {
        variables: {
            title: category
        }
    });
    useEffect(()=>{
        if(data){
            const {getCollectionsByTitle: {items},} = data;
            setProducts(items);
        }
        
    },[category, data]);
    
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