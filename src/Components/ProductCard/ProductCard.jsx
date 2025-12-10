import { useState } from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, handleAddToCart }) {
    const [amount, setAmount] = useState(1);

    function handleIncrease() {
        setAmount(prevAmount => prevAmount + 1);
    }

    function handleDecrease() {
        setAmount(prevAmount => (prevAmount <= 1 ? 1 : prevAmount - 1));
    }

    return (
        <section className={styles.productCard}>
            <div className='top'>
                <img src={product.image} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </div>
            <div className='footer'>
                <p>{product.category}</p>
                <p>${product.price.toFixed(2)}</p>
                <p>Amount: {amount}</p>
                <button onClick={handleIncrease}>+</button>
                <button onClick={handleDecrease}>-</button>
                <br />
                <button onClick={() => {
                    handleAddToCart(product, amount);
                    setAmount(1);
                }}>
                    Add to Cart
                </button>
            </div>
        </section>
    )
}