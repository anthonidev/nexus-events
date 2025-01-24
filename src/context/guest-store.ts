import { Guest, GuestForm } from "@/lib/interfaces/guest";
import {
  createGuestService,
  getListGuestsService,
  markAttendanceService,
} from "@/server/actions/guest";
import { toast } from "react-toastify";
import { create } from "zustand";

interface GuestState {
  loading: boolean;
  guestList: Guest[] | null;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  token: string;
  createGuest: (guest: GuestForm, eventId: string) => Promise<boolean>;
  getAllGuests: (apiKey: string, eventId: string) => Promise<void>;
  markAttendance: (guestId: string, status: boolean) => Promise<void>;
}

const useGuestStore = create<GuestState>((set) => ({
  loading: false,
  guestList: null,
  token: "",
  setToken: (token: string) => set({ token }),
  setLoading: (loading: boolean) => set({ loading }),
  createGuest: async (guest, eventId) => {
    let res = false;
    set({ loading: true });
    try {
      await createGuestService(guest, eventId);
      toast.success("Invitado registrado correctamente");
      set({ loading: false });
      res = true;
    } catch (error: unknown) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al registrar el invitado");
      }
      res = false;
    }
    return res;
  },
  getAllGuests: async (apiKey: string, eventId: string) => {
    set({ loading: true });
    try {
      const res = await getListGuestsService(apiKey, eventId);
      //si res no es un array, entonces es un error
      if (!Array.isArray(res)) {
        toast.error(res.message);
        set({ loading: false });
        return;
      }
      set({ guestList: res });
      set({ loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al obtener la lista de invitados");
      }
    }
  },
  markAttendance: async (guestId: string, status: boolean) => {
    try {
      await markAttendanceService(guestId, status);
      set((state) => {
        const guestList = (state.guestList ?? []).map((guest) => {
          if (guest._id === guestId) {
            return { ...guest, attendance: status };
          }
          return guest;
        });
        return { guestList, loading: false };
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al marcar la asistencia");
      }
    }
  },
}));

export default useGuestStore;
