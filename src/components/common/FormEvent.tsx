"use client";
import useGuestStore from "@/context/guest-store";
import { GuestForm, guestFormSchema } from "@/lib/interfaces/guest";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import { Button, Input, Select, SelectItem } from "@heroui/react";

type Props = {
  eventId: string;
};

const FormEvent = ({ eventId }: Props) => {
  const {
    register,
    handleSubmit,
    reset, // Para limpiar campos
    formState: { errors },
  } = useForm<GuestForm>({
    resolver: yupResolver(guestFormSchema),
    // mode: "onBlur",
  });

  const { loading, createGuest } = useGuestStore();

  const onSubmit: SubmitHandler<GuestForm> = async (data) => {
    const res = await createGuest(data, eventId);

    if (res) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      reset();

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-8 py-5"
    >
      {/* Nombre */}
      <div className="col-span-1">
        <Input
          label="Nombre"
          {...register("name")}
          labelPlacement="inside"
          fullWidth
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </div>

      {/* Apellido */}
      <div className="col-span-1">
        <Input
          label="Apellido"
          {...register("lastName")}
          labelPlacement="inside"
          fullWidth
          isInvalid={!!errors.lastName}
          errorMessage={errors.lastName?.message}
        />
      </div>

      {/* Correo */}
      <div className="col-span-1">
        <Input
          label="Correo"
          {...register("email")}
          labelPlacement="inside"
          fullWidth
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </div>

      {/* Teléfono */}
      <div className="col-span-1">
        <Input
          label="Teléfono"
          {...register("phone")}
          labelPlacement="inside"
          fullWidth
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
      </div>

      {/* Tipo de Documento */}
      <div className="col-span-1">
        <Select
          items={[
            { label: "DNI", value: "DNI" },
            { label: "PASAPORTE", value: "PASAPORTE" },
            { label: "CARNET DE EXTRANJERÍA", value: "CARNET DE EXTRANJERÍA" },
          ]}
          label="Tipo de documento"
          labelPlacement="inside"
          placeholder="Selecciona un tipo de documento"
          {...register("typeDocument")}
          isInvalid={!!errors.typeDocument}
          errorMessage={errors.typeDocument?.message}
        >
          {(type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          )}
        </Select>
      </div>

      {/* Número de Documento */}
      <div className="col-span-1">
        <Input
          label="Número de documento"
          {...register("numberDocument")}
          labelPlacement="inside"
          fullWidth
          isInvalid={!!errors.numberDocument}
          errorMessage={errors.numberDocument?.message}
        />
      </div>

      {/* Tipo de Invitado */}
      <div className="col-span-1">
        <Select
          items={[
            { label: "INVITADO", value: "INVITADO" },
            { label: "SOCIO", value: "SOCIO" },
          ]}
          label="Tipo de invitado"
          labelPlacement="inside"
          placeholder="Selecciona un tipo de invitado"
          {...register("typeGuest")}
          isInvalid={!!errors.typeGuest}
          errorMessage={errors.typeGuest?.message}
        >
          {(type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          )}
        </Select>
      </div>

      {/* Nombre del Invitado */}
      <div className="col-span-1">
        <Input
          label="Nombre del invitado"
          {...register("nameGuest")}
          labelPlacement="inside"
          fullWidth
          isInvalid={!!errors.nameGuest}
          errorMessage={errors.nameGuest?.message}
        />
      </div>
      {/* Botón de Enviar */}
      <div className="col-span-1 sm:col-span-2">
        <Button
          type="submit"
          isLoading={loading}
          isDisabled={loading}
          fullWidth
          color="primary"
          size="lg"
        >
          Registrarse
        </Button>
      </div>
    </form>
  );
};

export default FormEvent;
