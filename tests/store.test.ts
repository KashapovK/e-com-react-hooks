import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useStore } from '../src/store';
import { StoreProvider } from '../src/store-provider';
import { Product } from '../src/types';

describe('StoreProvider', () => {
  it('addToCart добавляет товар в корзину', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });

    expect(result.current.cart).toEqual([{ ...product, quantity: 1 }]);
  });

  it('addToCart увеличивает количество товара, если товар уже в корзине', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });
    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });

    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('removeFromCart удаляет товар из корзины', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });
    act(() => {
      result.current.removeFromCart(product.id);
    });

    expect(result.current.cart).toEqual([]);
  });

  it('increaseQuantity увеличивает количество товара в корзине', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });
    act(() => {
      result.current.increaseQuantity(product.id);
    });

    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('decreaseQuantity уменьшает количество товара, если оно больше 1', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });
    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });
    act(() => {
      result.current.decreaseQuantity(product.id);
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('decreaseQuantity удаляет товар из корзины, если quantity равно 1', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
    });
    act(() => {
      result.current.decreaseQuantity(product.id);
    });

    expect(result.current.cart).toEqual([]);
  });

  it('setProducts устанавливает список продуктов', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const products: Product[] = [{ id: '1', name: 'Test Product', price: 100 }];

    act(() => {
      result.current.setProducts(products);
    });

    expect(result.current.products).toEqual(products);
  });
});
