import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';

function App() {
  const [city, setCity] = useState('');
  const [count, setCount] = useState(null);
  const [data, setData] = useState([]);

  // Load CSV file automatically when the app starts
  useEffect(() => {
    fetch('/ufoData.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true, // Assumes the first row contains column names
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
          }
        });
      })
      .catch(error => console.error("Error loading CSV:", error));
  }, []);

  // Function to count occurrences of the entered city
  const handleSearch = () => {
    if (!data.length) {
      alert("CSV file not loaded.");
      return;
    }

    const cityCount = data.filter(entry => entry.city?.toLowerCase() === city.toLowerCase()).length;
    setCount(cityCount);
  };

  return (
    <div className="App">
      {/* Big Glowing Title - Now Separate */}
      <div className="title-container">
        <h1 className="big-title">ARE YOU SAFE FROM ALIENS?</h1>
        <h2 className="subtitle">CHECK THE RISK OF YOUR CITY BELOW</h2>
      </div>

      {/* Search Box Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {count !== null && <p>Instances of {city}: {count}</p>}
      </div>

      {/* Alien Image */}
      <img src="/images/alien.jpeg" alt="Alien" className="alien-image" />
    </div>
  );
}

export default App;
