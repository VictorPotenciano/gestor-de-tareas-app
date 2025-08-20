import { Button } from "@/components/ui/button";
import { FolderOpen, X } from "lucide-react";

interface HeaderCategoriesModalProps {
  closeModal: () => void;
}

const HeaderCategoriesModal = ({ closeModal }: HeaderCategoriesModalProps) => {
  return (
    <div className="flex items-center justify-between p-6 pb-4 border-b border-green-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <FolderOpen className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-green-900">
            Gestión de Categorías
          </h2>
          <p className="text-sm text-green-600 mt-1">
            Administra y organiza tus categorías
          </p>
        </div>
      </div>
      <Button
        onClick={closeModal}
        className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 group cursor-pointer"
      >
        <X className="w-5 h-5 text-green-600 group-hover:text-green-800" />
      </Button>
    </div>
  );
};

export default HeaderCategoriesModal;
