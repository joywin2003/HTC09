import React from "react";
import ReactMarkdown from "react-markdown";
import jsonData from "../../../response_1708399507333.json";

interface Record {
  file_name: string;
  response_text: string;
}

interface JsonData {
  [path: string]: Record[];
}

interface ReportViewerProps {
  jsonData: JsonData;
}

const ReportViewer: React.FC<ReportViewerProps> = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-8 px-4">
      {Object.entries(jsonData).map(([path, records]) => (
        <div className="border border-gray-700 rounded-lg p-8 mb-8" key={path}>
          <h2 className="text-xl font-semibold mb-4">Path: <span className="font-bold">{path}</span></h2>
          {Array.isArray(records) && records.length > 0 ? (
            records.map((record, index) => (
              <div className="border border-gray-700 rounded-lg p-4 my-4" key={index}>
                <h3 className="text-lg font-medium mb-2">{record.file_name}</h3>
                <div className="response-container">
                  <ReactMarkdown>{record.response_text}</ReactMarkdown>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No records found for this path.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportViewer;
