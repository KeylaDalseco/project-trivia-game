import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Home from '../components/Home';
import App from '../App';
// import Trivia from '../pages/Trivia';

// const fetchApi = {
//   response_code: 0,
//   response_message: 'Token Generated Successfully!',
//   token: '368fb25ac263ca606549e0bacf228e6846e58eb45e2047f6ea7e0d738c6112dd',
// };

// beforeEach(() => {
//   jest.spyOn(global, 'fetch');
//   global.fetch.mockResolvedValue({
//     json: jest.fn().mockResolvedValue(fetchApi),
//   });
// });
// afterEach(jest.restoreAllMocks);

describe('Testando o component Home', () => {
  test('Teste se o component Home está sendo henderizado', () => {
    renderWithRouterAndRedux(<Home />);
    screen.getByRole('banner');
    screen.getByPlaceholderText(/insira seu nome/i);
    screen.getByPlaceholderText(/insira seu email/i);
    screen.getByRole('button', { name: /play/i });
    screen.getByRole('heading', { name: /tela de configuração/i });
    screen.getByRole('button', { name: /configurações/i });
  });
  test('Teste os inputs, se após preenchidos habilita o botão', () => {
    renderWithRouterAndRedux(<Home />);

    const inputName = screen.getByPlaceholderText(/insira seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/insira seu email/i);
    const emailValido = 'testando@gmail.com';
    const name = 'teste';
    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toHaveAttribute('disabled');
    expect(btnPlay).toBeDisabled();
    act(() => userEvent.type(inputName, name));
    act(() => userEvent.type(inputEmail, emailValido));
    expect(btnPlay).not.toBeDisabled();
    expect(btnPlay).toBeVisible();
  });
  test('Teste se após clicar no botão, usuário é direcionado para /trivia', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/insira seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/insira seu email/i);
    const emailValido = 'testando@gmail.com';
    const name = 'teste';
    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toHaveAttribute('disabled');
    expect(btnPlay).toBeDisabled();
    act(() => userEvent.type(inputName, name));
    act(() => userEvent.type(inputEmail, emailValido));
    expect(btnPlay).not.toBeDisabled();
    expect(btnPlay).toBeVisible();
    act(() => userEvent.click(btnPlay));
    act(() => { history.push('/trivia'); });
    const { pathname } = history.location;
    console.log(history);
    expect(pathname).toBe('/trivia');
  });
  // it('deve salvar o token no Local Storage', () => {
  //   renderWithRouterAndRedux(<Trivia />);
  //   const mockToken = 'exemploToken';
  //   expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
  // });
});
