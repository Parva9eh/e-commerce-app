'use client';

import { FC } from 'react';
import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles';
import ProductCard from '@/components/product-card/product-card.component';
import { CategoryItem } from '@/store/categories/category.types';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) =>{
    return(
        <CategoryPreviewContainer>
            <h2>
                <Title href={`/shop/${title}`}>
                   {title.toUpperCase()}
                </Title>
            </h2>
            <Preview>
                {
                    products.filter((_,idx)=>idx<4).map((product)=>
                        <ProductCard key={product.id} product={product} category={title} />
                    )
                }
            </Preview>

        </CategoryPreviewContainer>
)}
export default CategoryPreview;