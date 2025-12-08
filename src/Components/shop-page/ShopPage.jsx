import { Link } from 'react-router';
import styles from './ShopPage.module.css';
import { useState } from 'react';
import useProductAPI from '../../hooks/useProductsAPI';
import ProductCard from '../ProductCard/ProductCard';

export default function ShopPage() {
    const { products, error, loading, onClickAddToCart } = useProductAPI();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A Network error was encountered</p>;

    return (
        <div className='shop'>
            <nav className={styles.navContainer}>
                <Link to='/homepage'>Homepage</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
            </nav>
            <h2>Shop</h2>
            <div>
                {products.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id}
                            {...product}
                            onClickAddToCart={onClickAddToCart}
                        />
                    )
                })}
            </div>
        </div>
    )
}