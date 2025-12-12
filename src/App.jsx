import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import useProductAPI from './hooks/useProductsAPI';
import styles from './App.module.css';

function App() {
  const { products, error, loading } = useProductAPI();
  const [cart, setCart] = useState([]);

  function handleAddToCart(product, amount) {
    const alreadyInCart = cart.find(item => item.product.id === product.id);

    if (alreadyInCart) {
        const updatedCart = cart.map(item => 
            item.product.id === product.id ? {
                ...item, amount: item.amount + 1 }
            : item
        );
        setCart(updatedCart);
    } else {
        setCart([...cart, {product: product, amount: amount}]);
    }
  }

  function handleDeleteFromCart (product) {
    const updatedCart = cart.filter(item => item.product.id !== product.id);
    setCart(updatedCart);
  }

  function totalCostCalculation() {
    return cart.reduce((total, item) => total + item.product.price * item.amount, 0).toFixed(2);
  }

  // using Outlet to provide props (outlet context) to children (rest of the pages)
  return (
    <>
      <nav className={styles.navContainer}>
          <Link to='/homepage'>Homepage</Link>
          <Link to='/shop'>Shop</Link>
          <Link to='/cart'>Cart</Link>
      </nav>
      <Outlet 
        context={{
          products,
          error,
          loading,
          handleAddToCart,
          cart,
          setCart,
          handleDeleteFromCart,
          totalCostCalculation
        }}
      />
    </>
  );
}

export default App
