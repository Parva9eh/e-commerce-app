import { useContext, Fragment} from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.components';

const CategoriesPreview = () => {
    const {categoriesMap, loading} = useContext(CategoriesContext);
    return(
        <Fragment>
            {   loading ? (<Spinner />) :(
                Object.keys(categoriesMap).map((title)=>{
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}/>
            }))
            }
        </Fragment>
    )
}
export default CategoriesPreview;