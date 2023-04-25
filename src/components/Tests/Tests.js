import React, { useState, useEffect } from 'react';

// define the "Sectors" select box options
const sectors = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' }
];

function App() {
  // set up state for storing user input data
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // set up state for storing the list of sectors from the database
  const [sectorsFromDB, setSectorsFromDB] = useState([]);

  // fetch the sectors from the database on component mount
  useEffect(() => {
    fetch('/api/sectors')
      .then(response => response.json())
      .then(data => setSectorsFromDB(data))
      .catch(error => console.log(error));
  }, []);

  // handle the user clicking the "Save" button
  function handleSubmit(event) {
    event.preventDefault();
    
    // validate the user input
    if (!name || !sector || !termsAgreed) {
      alert('Please fill out all required fields');
      return;
    }
    
    // store the user input in the database
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        sector: sector,
        termsAgreed: termsAgreed
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // refill the form using stored data
        setName(data.name);
        setSector(data.sector);
        setTermsAgreed(data.termsAgreed);
      })
      .catch(error => console.log(error));
  }

  // handle the user changing the "Sectors" select box
  function handleSectorChange(event) {
    setSector(event.target.value);
  }

  // handle the user agreeing to the terms
  function handleTermsAgreedChange(event) {
    setTermsAgreed(event.target.checked);
  }

  return (
    <div>
      <h1>My Application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <br />
        <label htmlFor="sector">Sector:</label>
        <select id="sector" value={sector} onChange={handleSectorChange}>
          {sectors.map(sector => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="termsAgreed">
          <input
            id="termsAgreed"
            type="checkbox"
            checked={termsAgreed}
            onChange={handleTermsAgreedChange}
          />
          I agree to the terms and conditions
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
