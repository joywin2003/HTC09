// ReportViewer.js
import React from 'react';
import './ReportViewer.css';

function ReportViewer({ jsonData }) {
  const formatResponseText = (text) => {
    // Replace newline characters with <br> tags
    const formattedText = text.replace(/\n/g, '<br>');
    // Make any text within **bold**
    return formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  };

  return (
    <div>
      {Object.entries(jsonData).map(([path, records]) => (
        <div key={path}>
          <h2>{path}</h2>
          {Array.isArray(records) ? (
            records.map((record, index) => (
              <div className="box" key={index}>
                <h3>{record.file_name}</h3>
                {/* Wrap response_text in a separate div with overflow styling */}
                <div className="response-container">
                  <p dangerouslySetInnerHTML={{ __html: formatResponseText(record.response_text) }} />
                  
                </div>
              </div>
            ))
          ) : (
            <p>No records found for this path.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReportViewer;
