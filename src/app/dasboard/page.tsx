"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CardsMetric } from "../ui/analytic";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";


export default function Overview() {

  return (
    <div className="border-2 rounded-md p-20 m-20">
        <Button><Link href="/">Go Back</Link></Button>
      <div className="grid place-items-center pb-10 font-bold">
        <h1 className="text-5xl flex items-center">Network Coverage</h1>
      </div>
      {/* <ResponsiveContainer width="100%" height={350} className="pb-10">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer> */}
      <CardsMetric />
    </div>
  );
}
