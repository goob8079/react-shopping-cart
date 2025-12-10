import { Link, useOutletContext } from 'react-router';
import styles from './Cart.module.css';

export default function Cart() {
    const { cart, setCart, deleteFromCart, totalCostCalculation } = useOutletContext();

    return (
        <div className='cart'>
            <nav className={styles.navContainer}>
                <Link to='/homepage'>Homepage</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
            </nav>
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
                                                <button className='remove-btn' onClick={() => deleteFromCart(item.product)}>
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
                            <button 
                                className='checkout-btn' 
                                disabled={cart.length === 0 || totalCostCalculation() === 0}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}