import { render, screen, waitFor } from '@testing-library/react';
import { StoreProvider } from '../src/store-provider';
import App from '../src/app';

describe('App Component', () => {
  test('рендерит карточки продуктов после загрузки', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>,
    );

    expect(screen.getByText(/Интернет-магазин/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/Добавить в корзину/i).length).toBeGreaterThan(
        0,
      );
    });
  });
});
