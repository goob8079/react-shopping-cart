import { useState } from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({
    id,
    title,
    description,
    category,
    price,
    image,
    addToCart
}) {
    const [amount, setAmount] = useState(1);

    function handleAmountChange(e) {
        let value = e.target.value;
        if (value === '') setAmount('');
        else {
            value = Number(value);
            value <= 1 ? setAmount(1) : setAmount(value);
        }
    }

    function handleIncrease() {
        if (!amount) setAmount(1);
        setAmount(amount + 1);
    }

    function handleDecrease() {
        if (!amount) setAmount(1);
        if (amount <= 1) return;

        setAmount(amount - 1);
    }

    return (
        <section>
            <div>
                <img src={image} />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div>
                <p>{category}</p>
                <p>${price.toFixed(2)}</p>
                <button onClick={() => {
                    addToCart(id, amount);
                    setAmount(1);
                }}>
                    Add to Cart
                </button>
            </div>
        </section>
    )
}