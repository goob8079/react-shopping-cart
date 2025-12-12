import { render, screen } from "@testing-library/react";
import ShopPage from "../Components/shop-page/ShopPage";
import { expect, test, vi } from "vitest";
import React from "react";
import * as router from 'react-router';

vi.spyOn(router, 'useOutletContext').mockReturnValue({
    products: [{ id: 1, title: 'apple', price: 2.96 }],
    cart: [],
})

test('renders with outlet context', () => {
    render(<ShopPage />)

    expect(screen.getByText('apple')).toBeInTheDocument()
})