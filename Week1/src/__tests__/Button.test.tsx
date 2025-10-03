import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
    it('renders the button with the correct label', () => {
        const { getByText } = render(<Button label="1" onClick={() => {}} />);
        expect(getByText('1')).toBeInTheDocument();
    });

    it('calls the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button label="1" onClick={handleClick} />);
        fireEvent.click(getByText('1'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies the correct class for operator', () => {
        const { getByText } = render(<Button label="+" onClick={() => {}} className="button operator" />);
        expect(getByText('+')).toHaveClass('button operator');
    });

    it('applies the correct class for clear', () => {
        const { getByText } = render(<Button label="C" onClick={() => {}} className="button clear" />);
        expect(getByText('C')).toHaveClass('button clear');
    });
});