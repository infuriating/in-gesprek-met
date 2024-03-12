import { PencilIcon, PlusIcon, Table2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <Link href={"/dashboard/add-stelling"}>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
            <PlusIcon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
            <h4 className="text-lg font-medium mb-2">Voeg een stelling toe</h4>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Voeg een nieuwe stelling toe aan de database
            </p>
          </div>
        </Link>
        <Link href={"/dashboard/update-stelling"}>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
            <PencilIcon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
            <h4 className="text-lg font-medium mb-2">Pas een stelling aan</h4>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Pas een bestaande stelling aan in de database
            </p>
          </div>
        </Link>
        <Link href={"/dashboard/delete-stelling"}>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
            <TrashIcon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
            <h4 className="text-lg font-medium mb-2">Verwijder een stelling</h4>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Verwijder een bestaande stelling uit de database
            </p>
          </div>
        </Link>
        <Link href={"/dashboard/set-actieve-stelling"}>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-all hover:bg-muted">
            <Table2Icon className="h-12 w-12 text-gray-500 mb-4 dark:text-gray-400" />
            <h4 className="text-lg font-medium mb-2">
              Verander actieve stelling
            </h4>
            <p className="text-gray-500 text-center dark:text-gray-400">
              Verander de actieve stelling van de website
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
