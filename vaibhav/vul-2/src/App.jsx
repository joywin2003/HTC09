// App.js
import React, { useState } from 'react';
import ReportViewer from './components/ReportViewer';
import DataForm from './components/Dataform';
import './App.css'; // Importing the CSS file

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDataFetch = (data) => {
    setJsonData(data);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
  
    <div className="hea">
      <h1>GUARD AI</h1>
    <div className='holder'>
    <div className="container">
      
      <DataForm onDataFetch={handleDataFetch} onLoading={handleLoading} />
      <div className="viewer-container">
      {loading ? (
              <div className="loading">
                <p>Cloning repository...</p>
                <p>Performing analysis for vulnerabilities...</p>
                <p>Generating report...</p>
                <p>This may take a moment. Please wait.</p>
              </div>
            ) : (
              jsonData ? <ReportViewer jsonData={jsonData} /> : null
            )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default App;
