import { useState } from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, handleAddToCart }) {
    const [amount, setAmount] = useState(1);
    const [showOverlay, setShowOverlay] = useState(false);

    function handleIncrease() {
        setAmount(prevAmount => prevAmount + 1);
    }

    function handleDecrease() {
        setAmount(prevAmount => (prevAmount <= 1 ? 1 : prevAmount - 1));
    }

    function handleAdd() {
        handleAddToCart(product, amount);
        setAmount(1);
        setShowOverlay(true);

        // auto-close after 1 second
        setTimeout(() => setShowOverlay(false), 1000);
    }

    return (
        <section className={styles.productCard}>
            <div className='top'>
                <img src={product.image} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </div>
            <div className={styles.footer}>
                <p>{product.category}</p>
                <p>${product.price.toFixed(2)}</p>
                <div className={styles.amount}>
                    <button onClick={handleIncrease}>+</button>
                    <p>Amount: {amount}</p>
                    <button onClick={handleDecrease}>-</button>
                </div>
                <br />
                <button onClick={handleAdd}>Add to Cart</button>
            </div>
            {showOverlay && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        Item added to cart!
                        <button 
                            className={styles.closeBtn} 
                            onClick={() => setShowOverlay(false)}
                        >x</button>
                    </div>
                </div>
            )}
        </section>
    )
}