import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "../../buttons/DeleteButton";
import { Category, Column } from "../../../../typing";
import UpdateButton from "../../buttons/UpdateButton";

interface CategoriesTableModalProps {
  handleCategoryClick: (categoryId: number) => void;
  categories: Category[];
  handleDeleteCategories: (id: number) => void;
  columns: Column[];
}

const CategoriesTableModal = ({
  handleCategoryClick,
  categories,
  handleDeleteCategories,
  columns,
}: CategoriesTableModalProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:bg-gradient-to-r hover:from-green-100 hover:to-green-150">
          {columns.map((column) => (
            <TableHead
              key={column.accessorKey}
              className="text-green-800 font-semibold text-sm uppercase tracking-wide py-4"
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow
            key={category.id}
            className={`transition-all duration-200 hover:bg-green-50 border-green-100 ${
              index % 2 === 0 ? "bg-white" : "bg-green-25"
            }`}
          >
            <TableCell className="font-medium text-green-900 text-sm sm:text-base py-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{category.name}</span>
              </div>
            </TableCell>
            <TableCell className="py-4">
              <div className="flex justify-end gap-2">
                <UpdateButton
                  id={category.id}
                  handleClick={handleCategoryClick}
                />
                <DeleteButton
                  id={category.id}
                  handleDelete={handleDeleteCategories}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoriesTableModal;
