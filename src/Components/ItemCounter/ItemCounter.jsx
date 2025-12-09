import styles from './ItemCounter.module.css';

export default function ItemCounter({
    amount,
    onAmountChange,
    onIncrease,
    onDecrease
}) {
    return (
        <div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input 
                    type="number" 
                    id='amount'
                    name='amount'
                    min={1}
                    value={amount}
                    onChange={onAmountChange}
                />
            </div>
            <div>
                <button
                    aria-label='Increase amount'
                    onClick={onIncrease}
                >
                    +
                </button>
                <button
                    aria-label='Decrease amount'
                    onClick={onDecrease}
                >
                    -
                </button>
            </div>
        </div>
    )
}