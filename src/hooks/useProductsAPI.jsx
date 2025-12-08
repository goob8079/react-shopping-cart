import { useEffect, useState } from "react";

export default function useProductAPI() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch data from Fake Store API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error! HTTP status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                setProducts(
                    data.map(product => ({
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        category: product.category,
                        price: product.price,
                        image: product.image,
                    }))
                );
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, []);

    return { products, error, loading };
}