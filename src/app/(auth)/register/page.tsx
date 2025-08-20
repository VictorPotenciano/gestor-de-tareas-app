"use client";

import RegisterCard from "@/components/auth/register/RegisterCard";
import { registerUser } from "@/lib/authapi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await registerUser(data.name, data.email, data.password);
      console.log(response);
      if (response?.error) {
        setError(response.error);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <RegisterCard
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        error={error}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Page;
