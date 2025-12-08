import { Link } from 'react-router';
import styles from './Homepage.module.css';

export default function Homepage() {
    return (
        <div className='homepage'>
            <nav className={styles.navContainer}>
                <Link to='/homepage'>Homepage</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
            </nav>
            <div className={styles.titleContainer}>
                <h1>The Awesome Shop</h1>
                <h2>Welcome to our shop!</h2>
            </div>
        </div>
    );
}