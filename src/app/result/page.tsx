"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
// import jsonData from "../../../response_1708399507333.json";
import { useSearchParams } from "next/navigation";
import { set } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

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

function extract(
  responseText: string
): { cwe: string; content: string; description: string }[] {
  const cweCodes: { cwe: string; content: string; description: string }[] = [];

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

function formatCWEText(cweObjects: { CWE: string; details: string }[]): string {
  return cweObjects
    .map((cweObj) => `**${cweObj.CWE}:** ${cweObj.details}`)
    .join("\n\n");
}

const ReportViewer: React.FC<ReportViewerProps> = () => {
  const searchParams = useSearchParams();
  const [loader, setLoader] = React.useState(false);
  const accessKey = searchParams.get("accessKey");
  const ownerName = searchParams.get("ownerName");
  const githubLink = searchParams.get("githubLink");
  const [jsonData, setJsonData] = React.useState<JsonData>({});

  useEffect(() => {
    const postData = async () => {
      try {
        console.log(1);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessKey,
            owner: ownerName,
            repository: githubLink,
          }),
          signal: signal,
        };

        setLoader(true);
        const response = await fetch(
          "https://1788-103-89-232-66.ngrok-free.app/LLM",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const response_data = await response.json();
        setJsonData(response_data);
        console.log(jsonData);
        setLoader(false);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    postData();

    return () => controller.abort();
  }, []);

  console.log(accessKey, ownerName, githubLink);
  return (
    <div>
      {jsonData
        ? Object.entries(jsonData).map(([path, records]) => (
            <div className="border-2 rounded-lg p-10 m-8" key={path}>
              <h2 className="text-amber-200">
                Path:<span className="font-bold ">{path}</span>
              </h2>
              {Array.isArray(records) ? (
            records.map((record, index) => (
              <div className="box" key={index}>
                <h3>{record.file_name}</h3>
                {/* Wrap response_text in a separate div with overflow styling */}
                <div className="response-container">
                  <ReactMarkdown children={record.response_text} />
                </div>
              </div>
            ))
          ) : (
            <p>No records found for this path.</p>
          )}
            </div>
          ))
        : ""}
      {loader && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-8 ">
              {/* <Skeleton className="h-24 w-24 rounded-full" /> */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[650px]" />
                <Skeleton className="h-6 w-[600px]" />
              </div>
            </div>
            <div className="flex items-center space-x-8">
              {/* <Skeleton className="h-24 w-24 rounded-full" /> */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[650px]" />
                <Skeleton className="h-6 w-[600px]" />
              </div>
            </div>
            <div className="flex items-center space-x-8">
              {/* <Skeleton className="h-24 w-24 rounded-full" /> */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[650px]" />
                <Skeleton className="h-6 w-[600px]" />
              </div>
            </div>
            <div className="flex items-center space-x-8">
              {/* <Skeleton className="h-24 w-24 rounded-full" /> */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[650px]" />
                <Skeleton className="h-6 w-[600px]" />
              </div>
            </div>
            <div className="flex items-center space-x-8">
              {/* <Skeleton className="h-24 w-24 rounded-full" /> */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-[650px]" />
                <Skeleton className="h-6 w-[600px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportViewer;
