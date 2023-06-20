import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes para obter 90% de cobertura da pagina de Feedback:', () => {
  it('Testando se os elementos de acertos renderizam na tela;', () => {
    renderWithRouterAndRedux(<Feedback />);

    screen.getByRole('heading', { name: /total score:/i });
    screen.getByRole('heading', { name: /questions assertions:/i });
    screen.getByRole('button', { name: /play again/i });
    screen.getByRole('img', { name: /profile\-img/i });
  });
  it('Teste se o botão redirecionado para a rota de Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnPlay = screen.getByRole('button', { name: /play again/i });

    userEvent.click(btnPlay);
    expect(history.location.pathname).toBe('/');

    await screen.findByRole('heading', { name: /tela de configuração/i });
  });

  it('Teste se acertar 3 perguntas a mensagem retornada é Well Done!', () => {
    const initialstate = {
      player: {
        nome: 'Gabriel',
        email: 'gpn@email.com',
        score: 80,
        assertions: 4,
      },
    };
    renderWithRouterAndRedux(<App />, initialstate, '/feedback');
    screen.getByRole('heading', { name: /well done!/i });
  });
});
