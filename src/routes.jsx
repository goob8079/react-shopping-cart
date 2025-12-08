import App from "./App";
import CartPage from "./Components/cart-page/CartPage";
import Homepage from "./Components/homepage/Homepage";
import ShopPage from "./Components/shop-page/ShopPage";

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/homepage',
        element: <Homepage />
    },
    {
        path: '/cart',
        element: <CartPage />
    },
    {
        path: 'shop',
        element: <ShopPage />
    }
];

export default routes;