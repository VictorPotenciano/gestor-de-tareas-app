import { Column } from "../../../typing";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const SkeletonLoader = ({ columns }: { columns: Column[] }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-200 mr-2" />
            <Skeleton className="h-10 w-56 sm:h-12 sm:w-72 rounded bg-green-200" />
          </div>
          <Skeleton className="h-5 w-64 sm:w-80 mx-auto rounded bg-green-200" />
        </div>
        <Card className="mb-6 border-green-200 shadow-lg pt-0">
          <CardHeader className="bg-green-50 border-b border-green-200 pt-0">
            <Skeleton className="h-6 w-40 mx-auto rounded" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex gap-2 justify-center">
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="border border-green-200 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
            <Skeleton className="h-6 w-32 rounded bg-green-500" />
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50 border-none">
                  {columns.map((column) => (
                    <TableHead
                      key={column.accessorKey}
                      className={`border-none ${
                        column.accessorKey === "done" ? "w-12" : ""
                      }`}
                    >
                      <Skeleton className="h-4 w-16 rounded" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(2)].map((_, index) => (
                  <TableRow key={index} className="border-none">
                    <TableCell className="border-none">
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
