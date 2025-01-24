import * as yup from "yup";

export interface GuestForm {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  typeDocument: "DNI" | "PASAPORTE" | "CARNET DE EXTRANJERÍA";
  numberDocument: string;
  typeGuest: "INVITADO" | "SOCIO";
  nameGuest: string;
}

export interface Guest extends GuestForm {
  _id: string;
  createdAt: string;
  updatedAt: string;
  attendance: boolean;
}
export const guestFormSchema = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres"),
  lastName: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres"),
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("El correo es obligatorio"),
  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    .min(9, "Debe tener al menos 9 dígitos")
    .max(15, "Debe tener como máximo 15 dígitos"),
  typeDocument: yup
    .mixed<"DNI" | "PASAPORTE" | "CARNET DE EXTRANJERÍA">()
    .oneOf(
      ["DNI", "PASAPORTE", "CARNET DE EXTRANJERÍA"],
      "Selecciona un tipo de documento válido"
    )
    .required("Selecciona un tipo de documento"),
  numberDocument: yup
    .string()
    .required("El número de documento es obligatorio")
    .matches(/^\d+$/, "Debe contener solo números"),
  typeGuest: yup
    .mixed<"INVITADO" | "SOCIO">()
    .oneOf(["INVITADO", "SOCIO"], "Selecciona un tipo de invitado válido")
    .required("Selecciona un tipo de invitado"),
  nameGuest: yup.string().required("El nombre del invitado es obligatorio"),
});
