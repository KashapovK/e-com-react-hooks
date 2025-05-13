import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { assert } from 'chai';
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

    assert.deepEqual(result.current.cart, [{ ...product, quantity: 1 }]);
  });

  it('addToCart увеличивает количество товара, если товар уже в корзине', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
      result.current.addToCart({ ...product, quantity: 1 });
    });

    assert.equal(result.current.cart[0].quantity, 2);
  });

  it('removeFromCart удаляет товар из корзины', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
      result.current.removeFromCart(product.id);
    });

    assert.deepEqual(result.current.cart, []);
  });

  it('increaseQuantity увеличивает количество товара в корзине', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
      result.current.increaseQuantity(product.id);
    });

    assert.equal(result.current.cart[0].quantity, 2);
  });

  it('decreaseQuantity уменьшает количество товара, если оно больше 1', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const product: Product = { id: '1', name: 'Test Product', price: 100 };

    act(() => {
      result.current.addToCart({ ...product, quantity: 1 });
      result.current.addToCart({ ...product, quantity: 1 });
      result.current.decreaseQuantity(product.id);
    });

    assert.equal(result.current.cart[0].quantity, 1);
  });

it('decreaseQuantity не удаляет товар из корзины, если quantity равно 1', () => {
  const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
  const product: Product = { id: '1', name: 'Test Product', price: 100 };

  act(() => {
    result.current.addToCart({ ...product, quantity: 1 });
    result.current.decreaseQuantity(product.id);
  });

  assert.deepEqual(result.current.cart, [{ ...product, quantity: 1 }]);
});

  it('setProducts устанавливает список продуктов', () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    const products: Product[] = [{ id: '1', name: 'Test Product', price: 100 }];

    act(() => {
      result.current.setProducts(products);
    });

    assert.deepEqual(result.current.products, products);
  });
});
