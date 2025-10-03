import React from 'react';
import Calculator from './components/Calculator';
import './styles/theme.css';

const App: React.FC = () => {
  const [history, setHistory] = React.useState<string[]>([]);

  const handleNewCalculation = (expression: string, result: string) => {
    setHistory(prev => [expression + ' = ' + result, ...prev]);
  };

  return (
    <div className="app">
      <div className="main-content">
        <Calculator onNewCalculation={handleNewCalculation} />
        <div className="history-panel" aria-label="Calculation History">
          <h2>History</h2>
          <ul>
            {history.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;