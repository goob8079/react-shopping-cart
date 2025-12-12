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
        <div className='cart'>
            <div className='cart-screen'>
                <p><strong>My Cart</strong></p>
                {cart.length === 0 ? (
                    <p className='empty-cart'>Your cart is empty!</p>
                ) : (
                    <div>
                        <ul>
                            {cart.map((item) => {
                                return (
                                    <li key={item.product.id} className='cart-item'>
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
                                            <div className='item-actions'>
                                                <button className='remove-btn' onClick={() => handleDeleteFromCart(item.product)}>
                                                    Remove Item
                                                </button>
                                                <div className='quantity'>
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
                                                                ? { ...prevItem, amount: Math.max(item.amount - 1, 0) }
                                                                : prevItem
                                                            );
                                                            return updatedCart;
                                                        })
                                                    }}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='checkout'>
                            <div className='checkout-total'>
                                <p className='total'>Total Cost: ${totalCostCalculation()}</p>
                            </div>
                            {/* have button disabled when the cart length or total cost = 0 */}
                            <button 
                                className='checkout-btn' 
                                disabled={cart.length === 0 || totalCostCalculation() === 0}
                                onClick={handleCheckout}
                            >
                                Proceed to Payment
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