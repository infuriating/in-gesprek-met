"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

export default function Stemmen(params: {
  preloadedStemmen: Preloaded<typeof api.stemmen.getStemmenFromStelling>;
}) {
  const stemmen = usePreloadedQuery(params.preloadedStemmen);
  return (
    <Table>
      <TableCaption>
        Alle gebruikers die voor deze stelling hebben gestemd.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Gebruikers ID</TableHead>
          <TableHead>Keuze</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stemmen.map((stem, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{stem.userId}</TableCell>
            <TableCell>{stem.keuze}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
