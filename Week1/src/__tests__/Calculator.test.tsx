import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator onNewCalculation={jest.fn()} />);
  });

  test('renders calculator buttons', () => {
    const buttons = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '.', '=', '/', 'C', 'CE'];
    buttons.forEach(button => {
      expect(screen.getByText(button)).toBeInTheDocument();
    });
  });

  test('adds numbers correctly', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('3');
  });

  test('subtracts numbers correctly', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('3');
  });

  test('multiplies numbers correctly', () => {
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('12');
  });

  test('divides numbers correctly', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('4');
  });

  test('handles division by zero', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('Error');
    expect(screen.getByText('Division by zero')).toBeInTheDocument();
  });

  test('handles decimal calculation', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('1.80');
  });

  test('clear input works', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('C'));
    expect(screen.getByTestId('input')).toHaveTextContent('');
    expect(screen.getByTestId('result')).toHaveTextContent('');
  });

  test('clear entry works', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('CE'));
    expect(screen.getByTestId('input')).toHaveTextContent('5');
  });

  test('invalid input shows error', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.keyDown(window, { key: 'A' });
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('result')).toHaveTextContent('Error');
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  test('keyboard input works', () => {
    fireEvent.keyDown(window, { key: '1' });
    fireEvent.keyDown(window, { key: '+' });
    fireEvent.keyDown(window, { key: '2' });
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByTestId('result')).toHaveTextContent('3');
  });
});