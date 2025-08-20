import SignOutButton from "@/components/buttons/SignOutButton";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Session } from "next-auth";

interface InfoUserProps {
  session: Session | null;
  handleSignOut: () => Promise<void>;
  getInitial: () => string;
  setMode: React.Dispatch<React.SetStateAction<"view" | "edit" | "password">>;
}

const InfoUser = ({
  session,
  handleSignOut,
  getInitial,
  setMode,
}: InfoUserProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center ring-2 ring-green-200">
            <span className="text-green-700 font-bold text-xl">
              {getInitial()}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">
              {session?.user?.name}
            </h3>
            <p className="text-sm text-green-600">{session?.user?.email}</p>
          </div>
        </div>
        <Button
          onClick={() => setMode("edit")}
          className="p-2 bg-green-600 text-white hover:text-green-600 hover:bg-white shadow-md hover:border hover:border-green-600 rounded-full transition-colors cursor-pointer"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-col space-y-2 border-t border-green-200 pt-4">
        <Button
          onClick={() => setMode("password")}
          className="w-full justify-center bg-green-600 hover:bg-green-700 text-white cursor-pointer"
        >
          Cambiar Contraseña
        </Button>
        <SignOutButton handleSignOut={handleSignOut} />
      </div>
    </div>
  );
};

export default InfoUser;
