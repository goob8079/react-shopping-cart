import { Link } from 'react-router';
import styles from './ShopPage.module.css';
import { useState } from 'react';
import useProductAPI from '../../hooks/useProductsAPI';
import ProductCard from '../ProductCard/ProductCard';

export default function ShopPage() {
    const { products, error, loading } = useProductAPI();
    const [cart, setCart] = useState([]);

    function handleAddToCart(product) {
        const alreadyInCart = cart.find(item => item.product.id === product.id);

        if (alreadyInCart) {
            const updatedCart = cart.map(item => 
                item.product.id === product.id ? {
                    ...item, amount: item.amount + 1 }
                : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, {product: product, amount: 1}]);
        }
    }

    function handleDeleteFromCart (product) {
        const updatedCart = cart.filter(item => item.product.id !== product.id);
        setCart(updatedCart);
    }

    function totalCostCalculation() {
        return cart.reduce((total, item) => total + item.product.price * item.amount, 0);
    }

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
                            addToCart={handleAddToCart}
                        />
                    )
                })}
            </div>
        </div>
    )
}