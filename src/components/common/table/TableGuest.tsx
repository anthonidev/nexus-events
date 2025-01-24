import React from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Guest } from "@/lib/interfaces/guest";
import useGuestStore from "@/context/guest-store";

type Props = {
  guestList: Guest[];
};

const TableGuest = ({ guestList }: Props) => {
  const columnHelper = createColumnHelper<Guest>();
  const { markAttendance, loading } = useGuestStore();

  const handleAttendance = async (guestId: string, status: boolean) => {
    await markAttendance(guestId, status);
  };

  const columns = [
    columnHelper.display({
      id: "attendance",
      header: "Asistencia",
      cell: ({ row }) => {
        const guest = row.original;
        return (
          <input
            type="checkbox"
            checked={guest.attendance}
            onChange={(e) => handleAttendance(guest._id, e.target.checked)}
            className="cursor-pointer "
            disabled={loading}
          />
        );
      },
    }),
    columnHelper.display({
      id: "fullName",
      header: "Nombre Completo",
      cell: ({ row }) => {
        const guest = row.original;
        return `${guest.name} ${guest.lastName}`;
      },
    }),
    columnHelper.display({
      id: "document",
      header: "Documento",
      cell: ({ row }) => {
        const guest = row.original;
        return `${guest.typeDocument}: ${guest.numberDocument}`;
      },
    }),
    columnHelper.display({
      id: "contact",
      header: "Contacto",
      cell: ({ row }) => {
        const guest = row.original;
        return (
          <div className="space-y-1">
            <p>{guest.phone}</p>
            <p>{guest.email}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("typeGuest", {
      header: "Tipo de Invitado",
    }),
    columnHelper.accessor("nameGuest", {
      header: "Nombre del Invitado",
    }),
    columnHelper.accessor("createdAt", {
      header: "Creado",
      cell: (info) =>
        new Date(info.getValue()).toLocaleString("es-ES", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    }),
  ];

  const table = useReactTable({
    data: guestList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide"
                >
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header instanceof Function
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap"
                >
                  {cell.column.columnDef.cell
                    ? typeof cell.column.columnDef.cell === "function"
                      ? cell.column.columnDef.cell(cell.getContext())
                      : cell.getValue()
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGuest;
