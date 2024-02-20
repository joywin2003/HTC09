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

function extract(responseText: string): { cwe: string, content: string, description: string }[] {
  const cweCodes: { cwe: string, content: string, description: string }[] = [];

  const regex = /\*\*CWE-(\d+):([^*]+)\*\*\s*\n\n([^*]+)/g;
  let match;

  while ((match = regex.exec(responseText)) !== null) {
    const cweCode: string = `CWE-${match[1]}`;
    const content: string = match[2].trim();
    const description: string = match[3].trim();

    cweCodes.push({ cwe: cweCode, content, description });
  }

  return cweCodes;
}


function formatCWEText(cweObjects: { CWE: string, details: string }[]): string {
  return cweObjects.map(cweObj => `**${cweObj.CWE}:** ${cweObj.details}`).join('\n\n');
}


const ReportViewer: React.FC<ReportViewerProps> = () => {
  return (
    <div>
      {Object.entries(jsonData).map(([path, records]) => (
        <div className="border-2 rounded-lg p-10 m-8" key={path}>
          <h2 className="text-amber-200">Path:<span className="font-bold ">{path}</span></h2>
          {Array.isArray(records) ? (
            records.map((record, index) => (
              <div className="border-2 rounded-lg box p-8 my-10" key={index}>
                <h3 className="text-lg font-medium  mb-2 text-green-300">{record.file_name}</h3>
                <div className="response-container py-4 text-red-600">
                  {extract(record.response_text).map((cweObj, idx) => (
                    <div key={idx}>
                      <p className="font-bold py-4">{cweObj.cwe}:{cweObj.content}</p>
                      <ReactMarkdown className="text-white">{cweObj.description}</ReactMarkdown>
                    </div>
                  ))}
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
};



export default ReportViewer;
