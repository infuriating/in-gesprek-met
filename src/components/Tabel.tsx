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
    keuzes: {
      keuze1: { naam: string; stemmen: number };
      keuze2: { naam: string; stemmen: number };
      keuze3: { naam: string; stemmen: number };
      keuze4: { naam: string; stemmen: number };
    };
  };
  height?: number;
}) {
  const { keuze1, keuze2, keuze3, keuze4 } = stelling.keuzes;

  return (
    <ResponsiveContainer width={"100%"} height={height ? height : 350}>
      <BarChart
        data={[
          {
            name: keuze1.naam,
            total: keuze1.stemmen,
          },
          {
            name: keuze2.naam,
            total: keuze2.stemmen,
          },
          keuze3.naam != "" && {
            name: keuze3.naam,
            total: keuze3.stemmen,
          },
          keuze4.naam != "" && {
            name: keuze4.naam,
            total: keuze4.stemmen,
          },
        ].filter(Boolean)}
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
