import { Link } from 'react-router';
import styles from './CartPage.module.css';

export default function CartPage() {
    
    return (
        <div className='cart'>
            <nav className={styles.navContainer}>
                <Link to='/homepage'>Homepage</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
            </nav>
        </div>
    )
}