import React, { useState, useEffect } from 'react';
import '../styles/theme.css';
import Button from './Button';

interface CalculatorProps {
    onNewCalculation?: (expression: string, result: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onNewCalculation }) => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    console.log(input);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if ((/^[0-9]$/).test(key) || ['+', '-', '*', '/', '.'].includes(key)) {
                setInput(prev => prev + key);
                setError(null);
                setResult(null);
            } else if (key === 'Enter') {
                calculateResult();
            } else if (key === 'Backspace') {
                clearEntry();
            } else if (key.toLowerCase() === 'c') {
                clearInput();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleButtonClick = (value: string) => {
        setError(null);
        if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            clearInput();
        } else if (value === 'CE') {
            clearEntry();
        } else {
            // Prevent multiple decimals in a number
            if (value === '.' && /\.(?![^+\-*/]*[+\-*/])/.test(input)) return;
            setInput(prev => prev + value);
        }
    };

    const calculateResult = () => {
        try {
            if (!input.trim()) {
                setResult('Error');
                setError('No input');
                if (onNewCalculation) onNewCalculation(input, 'Error');
                return;
            }
            if (/\/0(?!\d)/.test(input)) {
                setResult('Error');
                setError('Division by zero');
                if (onNewCalculation) onNewCalculation(input, 'Error');
            } else if (/[^0-9+\-*/.]/.test(input)) {
                setResult('Error');
                setError('Invalid input');
                if (onNewCalculation) onNewCalculation(input, 'Error');
            } else {
                // eslint-disable-next-line no-eval
                let evalResult = eval(input);
                if (typeof evalResult === 'number' && !Number.isInteger(evalResult)) {
                    evalResult = evalResult.toFixed(2);
                }
                setResult(evalResult.toString());
                setError(null);
                if (onNewCalculation) onNewCalculation(input, evalResult.toString());
            }
            setInput('');
        } catch (error) {
            setResult('Error');
            setError('Invalid expression');
            if (onNewCalculation) onNewCalculation(input, 'Error');
        }
    };

    const clearInput = () => {
        setInput('');
        setResult(null);
        setError(null);
    };

    const clearEntry = () => {
        setInput(prev => prev.slice(0, -1));
    };

    // Keyboard layout
    const buttons = [
        ['C', 'CE', '', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=', ''],
    ];

    return (
        <div className="calculator" aria-label="Calculator">
            <div className="display" role="region" aria-live="polite">
                <div className="input" data-testid="input">{input}</div>
                <div className="result" data-testid="result">{result !== null ? result : ''}</div>
                {error && <div className="error" aria-live="assertive">{error}</div>}
            </div>
            <div className="buttons-grid">
                {buttons.map((row, rowIdx) => (
                    <div className="button-row" key={rowIdx}>
                        {row.map((label, colIdx) =>
                            label ? (
                                <Button
                                    key={label}
                                    label={label}
                                    onClick={() => handleButtonClick(label)}
                                    className={
                                        label === 'C' ? 'button clear'
                                        : label === 'CE' ? 'button clear-entry'
                                        : ['/', '*', '-', '+', '='].includes(label) ? 'button operator'
                                        : label === '.' ? 'button decimal'
                                        : 'button'
                                    }
                                    aria-label={label}
                                />
                            ) : (
                                <span key={colIdx} className="button-spacer" />
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calculator;