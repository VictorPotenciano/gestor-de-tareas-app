"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { changePassword } from "@/lib/authapi";
import { useState } from "react";

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface PasswordFormProps {
  handleCancel: () => void;
  setMode: React.Dispatch<React.SetStateAction<"view" | "edit" | "password">>;
}

const PasswordForm = ({ handleCancel, setMode }: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<PasswordFormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await changePassword(data.newPassword);
      
      if (response?.error) {
        setError(response.error);
      } else {
        setMode("view");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  });

  const newPassword = watch("newPassword");

  return (
    <>
      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña Actual
          </Label>
          <Input
            {...register("currentPassword", {
              required: "La contraseña actual es requerida",
            })}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Nueva Contraseña
          </Label>
          <Input
            {...register("newPassword", {
              required: "La nueva contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Nueva Contraseña
          </Label>
          <Input
            {...register("confirmPassword", {
              required: "La confirmación de la contraseña es requerida",
              validate: (value) =>
                value === newPassword || "Las contraseñas no coinciden",
            })}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="border border-green-600 text-green-600 hover:bg-gray-100 hover:border hover:border-green-600 hover:text-green-700 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Cambiar Contraseña"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PasswordForm;
