import { Button } from "../ui/button";

interface SignOutButtonProps {
  handleSignOut: () => Promise<void>;
}

const SignOutButton = ({ handleSignOut }: SignOutButtonProps) => {
  return (
    <Button
      onClick={handleSignOut}
      className="w-full justify-center bg-red-600 hover:bg-red-700 text-white cursor-pointer"
    >
      Cerrar Sesión
    </Button>
  );
};

export default SignOutButton;
