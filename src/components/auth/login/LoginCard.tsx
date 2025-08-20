import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { LoginFormData } from "../../../../typing";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface LoginCardProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  error: string | null;
  isSubmitting: boolean;
}

const LoginCard = ({
  register,
  errors,
  onSubmit,
  error,
  isSubmitting,
}: LoginCardProps) => {
  return (
    <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8">
        <div className="w-20 h-20 mx-auto pl-2 bg-green-600  rounded-2xl flex items-center justify-center shadow-lg">
          <Image src="/favicon-32x32.png" width={48} height={48} alt="logo" />
        </div>
        <CardTitle className="text-center text-3xl font-bold text-green-600">
          Bienvenido
        </CardTitle>
        <p className="text-center text-gray-600 text-sm">
          Ingresa tus credenciales para continuar
        </p>
      </CardHeader>

      <CardContent className="space-y-6 w-3/4 mx-auto">
        <LoginForm
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          error={error}
          isSubmitting={isSubmitting}
        />

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-green-600 hover:text-amber-500 font-medium transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
