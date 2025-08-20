import Image from "next/image";

const HeaderPage = () => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <Image
          src="/favicon-32x32.png"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
          Gestor de Tareas
        </h1>
      </div>
      <p className="text-green-600 text-sm sm:text-lg">
        Organiza tus tareas por categorías
      </p>
    </div>
  );
};

export default HeaderPage;
