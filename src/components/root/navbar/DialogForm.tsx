"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Session } from "next-auth";
import { updateUser } from "@/lib/authapi";

type FormData = {
  name: string;
  email: string;
};

interface DialogFormProps {
  session: Session | null;
  update: (session: Session) => Promise<Session | null>;
  handleCancel: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogForm = ({
  session,
  update,
  handleCancel,
  setIsEditing,
}: DialogFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  useEffect(() => {
    reset({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    });
  }, [session, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!session?.user?.id) return;

      await updateUser(
        Number(session.user.id),
        data.name,
        data.email
      );

       await update({
        ...session,
        user: {
          ...session.user,
          name: data.name,
          email: data.email,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </Label>
        <Input
          {...register("name", {
            required: "El nombre es requerido",
          })}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </Label>
        <Input
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email no válido",
            },
          })}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
};

export default DialogForm;
