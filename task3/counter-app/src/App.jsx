// =============================================================================
//  Counter App — Advanced counter with configurable step and animation feedback.
//  Concepts: useState, useEffect, controlled inputs, conditional styling.
// =============================================================================

import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Counter value.
  const [counter, setCounter] = useState(0);
  // Step size used by +/- buttons.
  const [step, setStep] = useState(1);
  // Toggles a short scale animation whenever the counter changes.
  const [animate, setAnimate] = useState(false);

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  // Run a small "pulse" animation whenever the counter value changes.
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 150);
    return () => clearTimeout(timeout);
  }, [counter]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Advanced Counter</h1>

      <h2
        style={{
          fontSize: '40px',
          margin: '20px 0',
          transition: 'transform 0.15s',
          transform: animate ? 'scale(1.3)' : 'scale(1)',
          color: counter > 0 ? 'green' : counter < 0 ? 'red' : 'black',
        }}
      >
        {counter}
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{
            padding: '8px',
            width: '80px',
            textAlign: 'center',
            marginLeft: '10px',
          }}
        />
      </div>

      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' }}
          onClick={() => setCounter(counter + step)}
        >
          + {step}
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#f44336', color: 'white' }}
          onClick={() => setCounter(counter - step)}
        >
          - {step}
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#555', color: 'white' }}
          onClick={() => setCounter(0)}
        >
          Reset
        </button>
      </div>

      <h3 style={{ marginTop: '40px', color: '#666' }}>By: Monopoly63</h3>
    </div>
  );
};

export default App;