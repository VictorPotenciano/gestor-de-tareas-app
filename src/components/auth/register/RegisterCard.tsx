import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { RegisterFormData } from "../../../../typing";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import RegisterForm from "./RegisterForm";

interface RegisterCardProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  error: string | null;
  isSubmitting: boolean;
}

const RegisterCard = ({
  register,
  errors,
  onSubmit,
  error,
  isSubmitting,
}: RegisterCardProps) => {
  return (
    <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-8">
        <div className="w-20 h-20 mx-auto pl-2 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Image src="/favicon-32x32.png" width={48} height={48} alt="logo" />
        </div>
        <CardTitle className="text-center text-3xl font-bold text-green-600">
          Bienvenido
        </CardTitle>
        <p className="text-center text-gray-600 text-sm">
          Registra tú información para continuar
        </p>
      </CardHeader>
      <CardContent className="space-y-6 w-3/4 mx-auto">
        <RegisterForm
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          error={error}
          isSubmitting={isSubmitting}
        />
        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:text-amber-500 font-medium transition-colors"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
