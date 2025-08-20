"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginCard from "@/components/auth/login/LoginCard";
import { LoginFormData } from "../../../../typing";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoginCard
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
