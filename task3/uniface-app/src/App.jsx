// =============================================================================
//  Unicafe Feedback App — collect Good/Neutral/Bad ratings and show stats.
//  Concepts: multiple independent useState hooks, useEffect-driven animations.
// =============================================================================

import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Independent counters: each evolves on its own, so we keep them separate.
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [animate, setAnimate] = useState(false);

  const total = good + neutral + bad;

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'white',
  };

  // Pulse the statistics whenever any counter changes.
  useEffect(() => {
    if (total > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [good, neutral, bad, total]);

  const animatedStyle = {
    transition: 'transform 0.15s',
    transform: animate ? 'scale(1.2)' : 'scale(1)',
  };

  const pct = (n) => (total ? ((n / total) * 100).toFixed(1) : 0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Give Us Your Opinion</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
          onClick={() => setGood(good + 1)}
        >
          Good
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#2196F3' }}
          onClick={() => setNeutral(neutral + 1)}
        >
          Neutral
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#f44336' }}
          onClick={() => setBad(bad + 1)}
        >
          Bad
        </button>
      </div>

      <h2>Details</h2>
      <p style={animatedStyle}>Good: {good} ({pct(good)}%)</p>
      <p style={animatedStyle}>Neutral: {neutral} ({pct(neutral)}%)</p>
      <p style={animatedStyle}>Bad: {bad} ({pct(bad)}%)</p>
      <p style={animatedStyle}>
        <strong>Total Votes: {total}</strong>
      </p>
    </div>
  );
};

export default App;