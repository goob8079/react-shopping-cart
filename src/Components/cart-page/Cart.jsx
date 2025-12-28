import { Link, useOutletContext } from 'react-router';
import styles from './Cart.module.css';
import { useState } from 'react';

export default function Cart() {
    const { cart, setCart, handleDeleteFromCart, totalCostCalculation } = useOutletContext();
    const [showOverlay, setShowOverlay] = useState(false);

    function handleCheckout() {
        setCart([]);
        setShowOverlay(true);

        setTimeout(() => setShowOverlay(false), 1000);
    }

    return (
        <div className={styles.cartPage}>
            <h2>My Cart</h2>
            <div className={styles.cart}>
                {cart.length === 0 ? (
                    <p className='empty-cart'>Your cart is empty!</p>
                ) : (
                    <div>
                        <ul className={styles.cartList}>
                            {cart.map((item) => {
                                return (
                                    <li key={item.product.id} className={styles.cartItem}>
                                        <div>
                                            <div className='item-info'>
                                                <div className='item-img'>
                                                    <img src={item.product.image} alt={item.product.title} />
                                                </div>
                                                <div className='item-details'>
                                                    <h3>{item.product.title}</h3>
                                                    <p>Price: {item.product.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className={styles.itemActions}>
                                                <div className={styles.quantity}>
                                                    <button onClick={() => {
                                                        setCart((prevCart) => {
                                                            const updatedCart = prevCart.map((prevItem) => 
                                                                prevItem.product.id === item.product.id
                                                                ? { ...prevItem, amount: Math.max(item.amount - 1, 1) }
                                                                : prevItem
                                                            );
                                                            return updatedCart;
                                                        })
                                                    }}>-</button>
                                                    <p className='item-amount'>Amount: {item.amount}</p>
                                                    <button onClick={() => {
                                                        setCart((prevCart) => {
                                                            const updatedCart = prevCart.map((prevItem) => 
                                                                prevItem.product.id === item.product.id
                                                                ? { ...prevItem, amount: item.amount + 1 }
                                                                : prevItem
                                                            );
                                                            return updatedCart;
                                                        })
                                                    }}>+</button>
                                                </div>
                                                <div>
                                                    <button className={styles.removeBtn} onClick={() => handleDeleteFromCart(item.product)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={styles.checkout}>
                            <div className='checkout-total'>
                                <p className='total'>Total Cost: ${totalCostCalculation}</p>
                            </div>
                            {/* have button disabled when the cart length or total cost = 0 */}
                            <button 
                                className='checkout-btn' 
                                disabled={cart.length === 0 || totalCostCalculation === 0}
                                onClick={handleCheckout}
                            >
                                Purchase Items
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showOverlay && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        Your item(s) has been purchased!
                        <button 
                            className={styles.closeBtn}
                            onClick={() => setShowOverlay(false)}
                        >x</button>
                    </div>
                </div>
            )}
        </div>
    );
}