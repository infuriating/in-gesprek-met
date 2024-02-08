import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

const TabelTooltipContent = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: { value: string }[] | null;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary border flex flex-col justify-center items-center px-4 py-2 rounded-md">
        <p className="font-bold text-lg">{label}</p>
        <p className="font-medium">{payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default function Tabel({
  stelling,
  height,
}: {
  stelling: {
    keuzes: { voor: number; tegen: number; onbeslist: number };
  };
  height?: number;
}) {
  return (
    <ResponsiveContainer width={"100%"} height={height ? height : 350}>
      <BarChart
        data={[
          { name: "Voor", total: stelling.keuzes.voor },
          { name: "Tegen", total: stelling.keuzes.tegen },
          { name: "Onbeslist", total: stelling.keuzes.onbeslist },
        ]}
      >
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
        />
        {/* @ts-expect-error Type '{}' is missing */}
        <Tooltip content={<TabelTooltipContent />} />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
