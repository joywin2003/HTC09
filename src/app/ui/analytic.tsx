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

const data = [
  { average: 400, today: 0 },
  { average: 300, today: 1 },
  { average: 200, today: 2 },
  { average: 278, today: 3 },
  { average: 189, today: 4 },
  { average: 239, today: 5 },
  { average: 349, today: 6 },
  { average: 400, today: 7 },
  { average: 300, today: 8 },
  { average: 200, today: 9 },
  { average: 278, today: 10 },
  { average: 189, today: 11 },
  { average: 239, today: 12 },
  { average: 349, today: 13 },
  { average: 400, today: 14 },
  { average: 300, today: 15 },
  { average: 200, today: 16 },
  { average: 278, today: 17 },
  { average: 189, today: 18 },
  { average: 239, today: 19 },
  { average: 349, today: 20 },
  { average: 400, today: 21 },
  { average: 300, today: 22 },
  { average: 200, today: 23 },
  { average: 278, today: 24 },
  { average: 189, today: 25 },
  { average: 200, today: 26 },
  { average: 278, today: 27 },
  { average: 189, today: 28 },
  { average: 239, today: 29 },
  { average: 349, today: 30 },
  { average: 400, today: 31 },
  { average: 300, today: 32 },
  { average: 200, today: 33 },
  { average: 278, today: 34 },
  { average: 189, today: 35 },
  { average: 239, today: 36 },
  { average: 349, today: 37 },
  { average: 400, today: 38 },
  { average: 300, today: 39 },
  { average: 200, today: 40 },
  { average: 278, today: 41 },
  { average: 189, today: 42 },
  { average: 239, today: 43 },
  { average: 349, today: 44 },
  { average: 400, today: 45 },
  { average: 300, today: 46 },
  { average: 200, today: 47 },
  { average: 278, today: 48 },
  { average: 189, today: 49 },
  { average: 239, today: 50 },
  { average: 349, today: 51 },
  { average: 400, today: 52 },
  { average: 300, today: 53 },
  { average: 200, today: 54 },
  { average: 278, today: 55 },
  { average: 189, today: 56 },
  { average: 239, today: 57 },
  { average: 349, today: 58 },
  { average: 400, today: 59 },
];

export function CardsMetric() {
  const { theme: mode } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);

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
              <XAxis
                dataKey="today"
                interval="preserveStartEnd" // Keeps the first and last tick
                tickCount={10}
                tickFormatter={(value) => value}
              />
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
                dataKey="average"
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
