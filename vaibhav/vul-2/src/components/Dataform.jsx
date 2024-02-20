// components/DataForm.js
import React, { useState } from 'react';

function DataForm({ onDataFetch, onLoading }) {
  const [access_token, setAccessToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repository, setRepository] = useState('');

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      onLoading(true);
      const response = await fetch(`http://localhost:8000/?access_token=${access_token}&owner=${owner}&repository=${repository}`);
      const data = await response.json();
      onDataFetch(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={fetchData}>
      <input
        type="text"
        placeholder="Access Token"
        value={access_token}
        onChange={(e) => setAccessToken(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Repository"
        value={repository}
        onChange={(e) => setRepository(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Analyze</button>
    </form>
  );
}

export default DataForm;
