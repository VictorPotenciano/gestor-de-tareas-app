"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Mail, Lock, LogIn, LoaderCircle } from "lucide-react";
import { LoginFormData } from "../../../../typing";

interface LoginFormProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  error: string | null;
  isSubmitting: boolean;
}

const LoginForm = ({
  register,
  errors,
  onSubmit,
  error,
  isSubmitting,
}: LoginFormProps) => {
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
              <LogIn className="w-5 h-5 mr-2" />
              Iniciar Sesión
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
