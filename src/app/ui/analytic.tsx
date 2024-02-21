"use client";

import { useTheme } from "next-themes";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useConfig } from "@/hooks/use-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themes } from "@/registry/themes";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";


// interface DataItem {
//     time: string;
//     value: number;
//   }
  
export function CardsMetric() {
  const { theme: mode } = useTheme();
  const [config] = useConfig();
  const [data, setData] = useState([
  ]);
    // let data: DataItem[] = [];
  const theme = themes.find((theme) => theme.name === config.theme);

  // Define fetchData function
  useEffect(() => {
    const postData = async () => {
      try {
        console.log(1);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: signal,
        };

        const response = await fetch(
          "https://5231-103-89-232-66.ngrok-free.app/net",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const response_data = await response.json();
        console.log(response_data["value"]);
        setData(response_data["value"]);
        console.log(typeof data);
        console.log(0, data);
        console.log(typeof data);
        console.log(1, data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    postData();

    return () => controller.abort();
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network usage coverage</CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="value"
                activeDot={{
                  r: 20,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    opacity: 0.5,
                    "--theme-primary": `hsl(${
                      theme?.cssVars[mode === "dark" ? "light" : "dark"].primary
                    })`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
