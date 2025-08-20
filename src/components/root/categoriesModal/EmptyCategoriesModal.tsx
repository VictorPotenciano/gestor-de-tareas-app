import { FolderOpen } from "lucide-react";

const EmptyCategoriesModal = () => {
  return (
    <div className="text-center py-12">
      <div className="p-3 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <FolderOpen className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-lg font-medium text-green-900 mb-2">
        No hay categorías
      </h3>
      <p className="text-green-600">Comienza creando tu primera categoría</p>
    </div>
  );
};

export default EmptyCategoriesModal;
