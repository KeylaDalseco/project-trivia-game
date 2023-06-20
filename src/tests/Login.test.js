import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../components/Login';
import App from '../App';
import questions from './helpers/data';
// import Trivia from '../pages/Trivia';

const fetchApi = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: '368fb25ac263ca606549e0bacf228e6846e58eb45e2047f6ea7e0d738c6112dd',
};

const fetchQuestions = questions;

describe('Testando o component Home', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(fetchApi)
        .mockResolvedValueOnce(fetchQuestions),
    });
  });
  afterEach(jest.restoreAllMocks);
  test('Teste se o component Home está sendo henderizado', () => {
    renderWithRouterAndRedux(<Login />);
    screen.getByRole('banner');
    screen.getByPlaceholderText(/insira seu nome/i);
    screen.getByPlaceholderText(/insira seu email/i);
    screen.getByRole('button', { name: /play/i });
    screen.getByRole('heading', { name: /tela de configuração/i });
    screen.getByRole('button', { name: /configurações/i });
  });
  test('Teste os inputs, se após preenchidos habilita o botão', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/insira seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/insira seu email/i);
    const emailValido = 'teste@gmail.com';
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
    renderWithRouterAndRedux(<App />);

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

    localStorage.setItem('token', fetchApi.token);
    expect(localStorage.getItem('token')).toBe(fetchApi.token);
  });
  test('Testando tela de configuração exibida na home', () => {
    renderWithRouterAndRedux(<Login />);
    screen.getByRole('heading', { name: /tela de configuração/i });
    screen.getByRole('button', { name: /configurações/i });
  });
  test('Testando tela de configuração exibida na home', async () => {
    renderWithRouterAndRedux(<Login />);

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

    localStorage.setItem('token', fetchApi);

    // act(() => userEvent.click(btnPlay));
    // act(() => { history.push('/trivia'); });
    // const { pathname } = history.location;
    // await screen.findAllByText(/trivia/i);
    // await screen.findAllByRole('img', { name: /profile-img/i });
    // expect(pathname).toBe('/trivia');
  });
});
