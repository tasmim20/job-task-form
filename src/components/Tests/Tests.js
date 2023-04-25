import React, { useState, useEffect } from 'react';

const sectors = [
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Construction materials', label: 'Construction materials'},
    { value: 'Food and Beverage', label: 'Food and Beverage'},
    { value: 'Electronics and optics', label: 'Electronics and optics'},
    { value: 'Bakery & Confectionery products', label: 'Bakery & Confectionery products'},
    { value: 'Fish Products', label: 'Fish Products'},
    { value: 'Meat Products', label: 'Meat Products'},
    { value: 'Other', label: 'Other'},
    { value: 'Furniture', label: 'Furniture'},
    { value: 'Bedroom', label: 'Bedroom'},
    { value: 'kitchen', label: 'kitchen'},
    { value: 'Living Room', label: 'Living Room'},
    { value: 'Office', label: 'Office'},
    { value: 'Other(Furniture)', label: 'Other(Furniture)'},
    { value: 'Machinery', label: 'Machinery'},
    { value: 'Machinery components', label: 'Machinery components'},
    { value: 'Maritime', label: 'Maritime'},
    { value: 'Aluminium and steel', label: 'Aluminium and steel'},
    { value: 'Boat building', label: 'Boat building'},
    { value: 'other', label: 'other'},
    { value: 'Plastic and Rubber', label: 'Plastic and Rubber'},
    { value: 'Packaging', label: 'Packaging'},
    { value: 'Plastic goods', label: 'Plastic goods'},
    { value: 'Blowing', label: 'Blowing'},
    { value: 'Moulding', label: 'Moulding'},
    { value: 'others', label: 'others'},
    { value: 'Printing', label: 'Printing'},
    { value: 'Advertising', label: 'Advertising'},
    { value: 'copying', label: 'copying'},
    { value: 'Advertising', label: 'Advertising'},
    { value: 'other', label: 'other'},
    { value: 'Service', label: 'Service'},
    { value: 'Engineering', label: 'Engineering'},
    { value: 'Data processing', label: 'Data processing'},
    { value: 'software hardware', label: 'software hardware'},
    { value: 'Telecommunication', label: 'Telecommunication'},
    { value: 'Tourism', label: 'Tourism'},
    { value: 'Air', label: 'Air'},
    { value: 'Rail', label: 'Rail'},
    { value: 'Road', label: 'Road'},
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
