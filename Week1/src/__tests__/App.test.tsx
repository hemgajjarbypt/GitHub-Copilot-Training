import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders Calculator and History panel', () => {
    render(<App />);
    expect(screen.getByLabelText('Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Calculation History')).toBeInTheDocument();
  });

  test('updates history after calculation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('2+3 = 5')).toBeInTheDocument();
  });

  test('history shows multiple calculations', () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('2+2 = 4')).toBeInTheDocument();
    expect(screen.getByText('1+1 = 2')).toBeInTheDocument();
  });
});