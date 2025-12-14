import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Homepage from "../Components/homepage/Homepage";
import userEvent from "@testing-library/user-event";
import React from "react";

// create a mock router, since the actual react-router-dom doesn't need to be tested
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

const mockProducts = [
    {
        id: 1,
        title: 'Item 1',
        description: 'Description 1',
        category: 'Category A',
        price: 5,
        image: 'img1.jpg'
    },
    {
        id: 2,
        title: 'Item 2',
        description: 'Description 2',
        category: 'Category B',
        price: 12,
        image: 'img2.jpg'
    },
    {
        id: 3,
        title: 'Item 3',
        description: 'Description 3',
        category: 'Category C',
        price: 9,
        image: 'img3.jpg'
    },
]

describe('Homepage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders product cards and allows interaction', async () => {
        // mock function that does nothing but records every call
        const handleAddToCart = vi.fn();

        // the test uses this whenever useOutletContext is called instead of the real router context
        useOutletContext.mockReturnValue({
            products: mockProducts,
            handleAddToCart,
            loading: false,
            error: false,
        });

        const user = userEvent.setup();
        render(<Homepage />);

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        
        const addBtns = screen.getAllByRole('button', { name: /add to cart/i })
        await user.click(addBtns[0]);

        expect(handleAddToCart).toHaveBeenCalled();
    });

    it('renders 3 product cards', () => {
        useOutletContext.mockReturnValue({
            products: mockProducts,
            handleAddToCart: vi.fn(),
            loading: false,
            error: false,
        });

        render(<Homepage />);

        // check for h3 elements on the screen (the titles on the product cards)
        const headings = screen.getAllByRole('heading', { level: 3 });
        expect(headings.length).toBeGreaterThan(0);
        expect(headings.length).toBeLessThanOrEqual(3);
    });

    it('allows user to change amount and add to cart on product cards', async () => {
        const handleAddToCart = vi.fn();

        useOutletContext.mockReturnValue({
            products: mockProducts,
            handleAddToCart,
            loading: false,
            error: false,
        });

        const user = userEvent.setup();

        render(<Homepage />);

        const increaseBtns = screen.getAllByText('+');
        const addBtns = screen.getAllByText(/add to cart/i);

        // increase amount of product
        await user.click(increaseBtns[0]);
        await user.click(increaseBtns[0]);

        // add item to cart
        await user.click(addBtns[0]);

        expect(handleAddToCart).toHaveBeenCalledTimes(1);

        const [product, amount] = handleAddToCart.mock.calls[0];
        expect(product).toBeDefined();
        expect(amount).toBe(3);
    });

    it('shows overlay after adding item to cart', async () => {
        useOutletContext.mockReturnValue({
            products: mockProducts,
            handleAddToCart: vi.fn(),
            loading: false,
            error: false,
        });

        const user = userEvent.setup();

        render(<Homepage />);

        const addBtn = screen.getAllByText(/add to cart/i)[0];
        await user.click(addBtn);

        expect(screen.getByText(/item added to cart/i)).toBeInTheDocument();
    });
})