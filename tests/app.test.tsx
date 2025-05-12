import { render, screen, waitFor } from '@testing-library/react';
import { assert } from 'chai';
import { StoreProvider } from '../src/store-provider';
import App from '../src/app';

describe('App Component', () => {
  test('рендерит карточки продуктов после загрузки', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>,
    );

    assert.exists(screen.getByText(/Интернет-магазин/i));

    await waitFor(() => {
      const buttons = screen.getAllByText(/Добавить в корзину/i);
      assert.isAbove(buttons.length, 0);
    });
  });
});
