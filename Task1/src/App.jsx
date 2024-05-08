import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberType, setNumberType] = useState('primes');
  const [response, setResponse] = useState(null);

  const fetchNumbers = async () => {
    const headers = {
      // Has to be genreated again and again as it expires after a duration
      'Authorization': 'Bearer Enter_your_Bearer_token_here'
    };
  
    try {
      const res = await axios.get(`http://20.244.56.144/test/${numberType}`, { headers });
      const numbers = res.data.numbers; 
      setResponse({
        numbers,
        avg: numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length 
      });
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setResponse({ error: "Failed to fetch data. Please check console for details." });
    }
  };
  
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Average Calculator</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <select 
          value={numberType} 
          onChange={(e) => setNumberType(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', borderColor: '#ccc' }}
        >
          <option value="primes">Prime</option>
          <option value="fibo">Fibonacci</option>
          <option value="even">Even</option>
          <option value="rand">Random</option>
        </select>
        <button 
          onClick={fetchNumbers}
          style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Fetch Numbers
        </button>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        {response && (
          <>
            <h2>Results</h2>
            {response.error ? (
              <p style={{ color: 'red' }}>{response.error}</p>
            ) : (
              <>
                <p>Numbers: [{response.numbers.join(', ')}]</p>
                <p>Average: {response.avg.toFixed(2)}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;