"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";


interface FormDataItem {
    id: number;
    key: string;
    value: string;
  }

export default function Page() {
    const [formData, setFormData] = useState<{ [key: number]: FormDataItem }>({
        0: { id: 0, key: "ENDPOINT URL", value: "" },
        1: { id: 1, key: "", value: "" },
        2: { id: 2, key: "", value: "" },
        3: { id: 3, key: "", value: "" },
      });

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch("https://5600-103-89-232-66.ngrok-free.app/GuardAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (id: number, type: string, value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: {
        ...prevFormData[id],
        [type]: value
      }
    }));
  };
  return (
    <>
    <div className="border-2 rounded-md p-20 m-10">
    <Button><Link href="/">Go Back</Link></Button> 
    <div className="grid place-items-center pb-10 font-bold">
    <h1 className="text-5xl flex items-center">GuardAI</h1>
    </div>
    <form className="flex flex-col items-center justify-between p-24" onSubmit={handleSubmit}>
      {Object.values(formData).map(item => (
        <div key={item.id} className="mb-4 flex items-center">
          <Input
            className="w-50 mr-4"
            id={`key${item.id}`}
            type="text"
            value={item.key}
            onChange={(event) => handleChange(item.id, 'key', event.target.value)}
            placeholder={`Key ${item.id}`}
          />
          <Input
            className="w-50"
            id={`value${item.id}`}
            type="text"
            value={item.value}
            onChange={(event) => handleChange(item.id, 'value', event.target.value)}
            placeholder={`Value ${item.id}`}
          />
        </div>
      ))}
      <Button className="mt-4" type="submit">Start Analyze</Button>
    </form>
    </div>
    </>
  );
}
