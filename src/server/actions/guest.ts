"use server";
import axios from "axios";

import { Guest, GuestForm } from "@/lib/interfaces/guest";

export const createGuestService = async (data: GuestForm, eventId: string) => {
  const apiUrl = process.env.GUEST_API;
  const url = `${apiUrl}/api/guests`;
  try {
    const payload = { ...data, eventId };
    console.log("payload", payload);
    const response = await axios.post(url, payload);
    console.log("response", response);
    return await response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response?.data.message,
        status: error.response?.status,
      };
    } else {
      return {
        message: "Error al registrar el invitado",
        status: 500,
      };
    }
  }
};

export const getListGuestsService = async (apiKey: string, eventId: string) => {
  const apiUrl = process.env.GUEST_API;
  const url = `${apiUrl}/api/guests/${eventId}`;
  try {
    const response = await axios.get<Guest[]>(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    return await response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response?.data.message,
        status: error.response?.status,
      };
    } else {
      return {
        message: "Error al obtener la lista de invitados",
        status: 500,
      };
    }
  }
};

export const markAttendanceService = async (
  guestId: string,
  status: boolean
) => {
  const apiUrl = process.env.GUEST_API;
  const url = `${apiUrl}/api/guests/${guestId}`;
  try {
    const response = await axios.patch(url, { attendance: status });

    return await response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response?.data.message,
        status: error.response?.status,
      };
    } else {
      return {
        message: "Error al marcar la asistencia",
        status: 500,
      };
    }
  }
};
