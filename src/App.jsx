import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router';
import useProductAPI from './hooks/useProductsAPI';
import styles from './App.module.css';

function App() {
  const { products, error, loading } = useProductAPI();
  // cart items (data) persists even after refreshing by utilizing localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // when cart updates, it gets saved in localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  // changed from function to useMemo to increase performance
  const totalCostCalculation = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.amount, 0).toFixed(2);
  }, [cart]); 

  // using Outlet to provide props (outlet context) to children (rest of the pages)
  return (
    <div className={styles.layout}>
      <nav className={styles.navContainer}>
          <Link to='/homepage'>Homepage</Link>
          <Link to='/shop'>Shop</Link>
          <Link to='/cart'>Cart</Link>
      </nav>
      <main className={styles.main}>
        <Outlet 
          context={{
            products,
            error,
            loading,
            handleAddToCart,
            cart,
            setCart,
            handleDeleteFromCart,
            totalCostCalculation,
          }}
        />
      </main>
      <footer className={styles.footer}>
          <p>Source Code: <a href="https://github.com/goob8079/react-shopping-cart">Here</a></p>
      </footer>
    </div>
  );
}

export default App