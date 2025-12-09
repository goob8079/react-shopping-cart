import App from "./App";
import Cart from "./Components/cart-page/Cart";
import Homepage from "./Components/homepage/Homepage";
import ShopPage from "./Components/shop-page/ShopPage";

const routes = [
    // App is a layout component since it is the parent component for the rest of the components,
    // it is a place to fetch shared data (products, cart state, and useProductAPI)
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/homepage',
                element: <Homepage />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: 'shop',
                element: <ShopPage />
            }
        ]
    }
];

export default routes;