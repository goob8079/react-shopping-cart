import { Link, useOutletContext } from 'react-router';
import styles from './Homepage.module.css';
import React, { useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';


export default function Homepage() {
    const { products, handleAddToCart, loading, error } = useOutletContext();

    // generate 3 random products to display as ProductCard components
    const randomProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        // use Fisher-Yates to shuffle a copy of products
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        
        return shuffled.slice(0, 3);
    }, [products]);
    
    if (loading) return <p className={styles.loading}>Loading...</p>;
    if (error) return <p className={styles.error}>A Network error was encountered</p>;

    return (
        <div className={styles.homepage}>
            <div className={styles.titleContainer}>
                <h1>The Awesome Shop</h1>
                <h2>Welcome to our shop!</h2>
                <p>This is where we sell things and stuff</p>
            </div>
            <h2 className={styles.featuredTitle}>Featured Products</h2>
            <div className={styles.featured}>
                {randomProducts.map((product) => {
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
    );
}