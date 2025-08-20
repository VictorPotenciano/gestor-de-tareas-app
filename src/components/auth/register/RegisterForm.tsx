"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Mail, Lock, UserPlus, User, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormData } from "../../../../typing";

interface RegisterFormProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  error: string | null;
  isSubmitting: boolean;
}

const RegisterForm = ({
  register,
  errors,
  onSubmit,
  error,
  isSubmitting,
}: RegisterFormProps) => {
  return (
    <>
      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium text-gray-800 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-green-600" />
            Nombre Completo
          </Label>
          <div className="mt-1">
            <Input
              id="name"
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
              className={`h-12 pl-4 pr-4 bg-white border-2 transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 hover:border-green-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-800 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-green-600" />
            Correo electrónico
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico no válido",
                },
              })}
              className={`h-12 pl-4 pr-4 bg-white border-2 transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 hover:border-green-400"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-800 flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-green-600" />
            Contraseña
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
              className={`h-12 pl-4 pr-4 bg-white border-2 transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 hover:border-green-400"
              }`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-800 flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-green-600" />
            Confirmar Contraseña
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                validate: (value, formValues) =>
                  value === formValues.password ||
                  "Las contraseñas no coinciden",
              })}
              className={`h-12 pl-4 pr-4 bg-white border-2 transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 hover:border-green-400"
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="animate-spin flex items-center gap-2">
              <LoaderCircle className="w-5 h-5" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 mr-2" />
              Registrate
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
