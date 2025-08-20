import Image from "next/image";
import { Card, CardContent } from "../ui/card";

const NoClickedCategories = () => {
  return (
    <Card className="border-green-200 shadow-lg">
      <CardContent className="p-8 sm:p-12 flex flex-col items-center justify-center gap-8">
        <Image src="/favicon-32x32.png" alt="Logo" width={48} height={48} />
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
            Selecciona una categoría
          </h3>
          <p className="text-green-600 text-sm sm:text-base">
            Elige una categoría de arriba para ver tus tareas organizadas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoClickedCategories;
