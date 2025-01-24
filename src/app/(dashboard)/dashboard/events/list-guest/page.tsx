"use client";

import TableGuest from "@/components/common/table/TableGuest";
import useGuestStore from "@/context/guest-store";
import { Button, Input } from "@heroui/react";

export default function ListGuestPage() {
  const { getAllGuests, loading, guestList, token, setToken } = useGuestStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const fetchGuests = async () => {
    await getAllGuests(
      token,
      "programa-tu-mente-para-el-exito-con-nexus-h-global"
    );
  };

  const updateGuests = async () => {
    await fetchGuests();
  };

  return (
    <div
      className="bg-gray-100"
      style={{
        backgroundImage: "url('/images/fondo.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh )",
      }}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 font-primary uppercase text-center text-indigo-700">
            Lista de Invitados
          </h1>

          {/* Input para la API Key */}
          {guestList == null ? (
            <>
              <div className="mb-4">
                <label
                  htmlFor="api-key"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingresa tu API Key
                </label>
                <Input
                  type="text"
                  id="api-key"
                  value={token}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tu clave API"
                />
              </div>

              {/* Botón para obtener la lista */}
              <button
                onClick={fetchGuests}
                disabled={loading || !token}
                className={`w-full px-4 py-2 rounded-md text-white text-sm font-medium ${
                  !token
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                }`}
              >
                {loading ? "Cargando..." : "Obtener Lista de Invitados"}
              </button>
            </>
          ) : (
            <div className="mb-6 bg-white shadow rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Total de invitados:
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {guestList.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Total de asistentes:
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {guestList.filter((guest) => guest.attendance).length}
                  </p>
                </div>
                <Button
                  onPress={updateGuests}
                  isLoading={loading}
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Actualizar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mostrar la lista de invitados */}
        {guestList && guestList.length > 0 && (
          <TableGuest guestList={guestList} />
        )}
      </div>
    </div>
  );
}
