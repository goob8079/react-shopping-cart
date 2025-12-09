import ItemCounter from "../ItemCounter/ItemCounter";

export default function CartItem(props) {
    const { title, description, category, price, image, amount } = props;

    return (
        <section>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            <ItemCounter 
                amount={amount}
                onAmountChange={props.onAmountChange}
                onIncrease={props.onIncrease}
                onDecrease={props.onDecrease}
            />
            <div>
                <p>{category}</p>
                <p>${price.toFixed(2)}</p>
                <button
                    onClick={props.onRemove}
                >   
                    Remove
                </button>
            </div>
        </section>
    )
}