"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const [formData, setFormData] = useState([
    { id: 1, key:'', value: '' },
    { id: 2, key:'', value: '' },
    { id: 3, key:'', value: '' },
  ]);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange = (id: number, type:string, value:string) => {
    const updatedFormData = formData.map(item => {
      if (item.id === Number(id)) {
        return { ...item, [type]: value };
      }
      return item;
    });
    setFormData(updatedFormData);
  };

  return (
    <form className="flex flex-col items-center justify-between p-24" onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center">
        <Input
          className="w-50 mr-4"
          id="key1"
          type="text"
          value={formData[0].key}
          onChange={(event) => handleChange(1, 'key', event.target.value)}
          placeholder="Key 1"
        />
        <Input
          className="w-50"
          id="value1"
          type="text"
          name="accessKey2"
          value={formData[0].value}
          onChange={(event) => handleChange(1, 'value', event.target.value)}
          placeholder="Value 1"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Input
          className="w-50 mr-4"
          id="key2"
          type="text"
          value={formData[1].key}
          onChange={(event) => handleChange(2, 'key', event.target.value)}
          placeholder="Key 2"
        />
        <Input
          className="w-50"
          id="value2"
          type="text"
          name="ownerName"
          value={formData[1].value}
          onChange={(event) => handleChange(2, 'value', event.target.value)}
          placeholder="Value 2"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Input
          className="w-50 mr-4"
          id="key3"
          type="text"
          name="accessKey4"
          value={formData[2].key}
          onChange={(event) => handleChange(3, 'key', event.target.value)}
          placeholder="Key 3"
        />
        <Input
          className="w-50"
          id="value3"
          type="text"
          value={formData[2].value}
          onChange={(event) => handleChange(3, 'value', event.target.value)}
          placeholder="key4"
        />
      </div>
      <Button className="mt-4" type="submit">Start Analyze</Button>
    </form>
  );
}
