import { Link, useOutletContext } from 'react-router';
import styles from './ShopPage.module.css';
import ProductCard from '../ProductCard/ProductCard';
import React from 'react';

export default function ShopPage() {
    const { products, error, loading, handleAddToCart } = useOutletContext();
    if (loading) return <p className={styles.loading}>Loading...</p>;
    if (error) return <p className={styles.error}>A Network error was encountered</p>;

    return (
        <div className={styles.shopPage}>
            <h2 className={styles.shopTitle}>Products</h2>
            <div className={styles.shop}>
                {products.map((product) => {
                    return (
                        <ProductCard 
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        />
                    )
                })}
            </div>
        </div>
    )
}