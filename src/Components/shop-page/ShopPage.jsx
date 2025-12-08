import { Link } from 'react-router';
import styles from './ShopPage.module.css';
import { useState } from 'react';
import useProductAPI from '../../hooks/useProductsAPI';

export default function ShopPage() {
    const { products, error, loading } = useProductAPI();
    const [itemCount, setItemCount] = useState(0);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A Network error was encountered</p>;

    return (
        <div className='shop'>
            <nav className={styles.navContainer}>
                <Link to='/homepage'>Homepage</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
            </nav>
        </div>
    )
}