"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [formData, setFormData] = useState({
    accessKey: '',
    ownerName: '',
    githubLink: ''
  });
  const [text, setText] = useState<string>('');
  const message: string = "Welcome to GuardAI, the god of security";

  useEffect(() => {
    const typingEffect = () => {
      for (let i = 0; i <= message.length; i++) {
        setTimeout(() => {
          setText(message.substring(0, i));
        }, i * 100);
      }
    };

    typingEffect();

    return () => {
      clearTimeout(typingEffect as any);
    };
  }, []);
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const queryString = new URLSearchParams(formData).toString();
    router.push(`/result?${queryString}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          Jinsei
        </div>
      </div>

      <p className="fixed left-0 top-0  flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 mt-20 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        {text}
      </p>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      <form className="flex flex-col items-center justify-between p-24" onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center">
        <Label htmlFor="accessKey" className="text-white mr-2 flex-shrink-0 w-28">
          Access Key
        </Label>
        <Input
        className="w-50"
          id="accessKey"
          type="text"
          name="accessKey"
          value={formData.accessKey}
          onChange={handleChange}
          placeholder="Access Key"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Label htmlFor="ownerName" className="text-white mr-2 flex-shrink-0 w-28">
          Owner Name
        </Label>
        <Input
        className="w-50"
          id="ownerName"
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Owner Name"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Label htmlFor="githubLink" className="text-white mr-2 flex-shrink-0 w-28">
          GitHub Link
        </Label>
        <Input
        className="w-50"
          id="githubLink"
          type="text"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          placeholder="GitHub Link"
        />
      </div>
      <Button className="mt-4" type="submit">Start Analyze</Button>
    </form>
    </main>
  );
}
