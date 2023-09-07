import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(term)
    );

    setFilteredItems(filtered);
  };

  return (
    <div >
      <div id="search-container" style={{display:"flex",justifyContent:"center",alignItems:"center" , marginTop:"10px"}}>
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          value={searchTerm}
          style={{padding:"2px 10px ", boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}
          onChange={handleSearchChange}
        />
      </div>
      <ol id="item-list">
        {filteredItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
