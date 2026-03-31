import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    // 장바구니: [{ id, name, price, qty, restaurantId, restaurantName }]
    const [cart, setCart] = useState([]);
    const [cartRestaurant, setCartRestaurant] = useState(null); // 현재 담긴 음식점

    /** 메뉴 담기 */
    const addToCart = useCallback((item, qty, restaurant) => {
        // 다른 음식점 메뉴가 담겨있으면 초기화
        setCartRestaurant((prev) => {
            if (prev && prev.id !== restaurant?.id) {
                setCart([]);
            }
            return restaurant ?? prev;
        });

        setCart((prev) => {
            // 이미 같은 음식점이 아닌 경우 초기화 체크
            const existing = prev.find((c) => c.id === item.id);
            if (existing) {
                return prev.map((c) =>
                    c.id === item.id ? { ...c, qty: c.qty + qty } : c
                );
            }
            return [...prev, { ...item, qty }];
        });
    }, []);

    /** 수량 업데이트 (+1 / -1) */
    const updateQty = useCallback((id, delta) => {
        setCart((prev) =>
            prev
                .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
                .filter((item) => item.qty > 0)
        );
    }, []);

    /** 장바구니 비우기 */
    const clearCart = useCallback(() => {
        setCart([]);
        setCartRestaurant(null);
    }, []);

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    return (
        <CartContext.Provider value={{
            cart, cartRestaurant, cartCount,
            addToCart, updateQty, clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};