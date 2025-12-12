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
                                                                ? { ...prevItem, amount: item.amount + 1 }
                                                                : prevItem
                                                            );
                                                            return updatedCart;
                                                        })
                                                    }}>+</button>
                                                    <p className='item-amount'>Amount: {item.amount}</p>
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
                                                </div>
                                                <div>
                                                    <button className='remove-btn' onClick={() => handleDeleteFromCart(item.product)}>
                                                        Remove Item
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
                                <p className='total'>Total Cost: ${totalCostCalculation()}</p>
                            </div>
                            {/* have button disabled when the cart length or total cost = 0 */}
                            <button 
                                className='checkout-btn' 
                                disabled={cart.length === 0 || totalCostCalculation() === 0}
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