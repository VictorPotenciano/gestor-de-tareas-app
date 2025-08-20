"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Session } from "next-auth";
import DialogForm from "./DialogForm";
import PasswordForm from "./PasswordForm";
import InfoUser from "./InfoUser";
import { useForm } from "react-hook-form";

interface DialogInfoUserProps {
  session: Session | null;
  update: (session: Session) => Promise<Session | null>;
  handleSignOut: () => Promise<void>;
}

const DialogInfoUser = ({
  session,
  handleSignOut,
  update,
}: DialogInfoUserProps) => {
  const [mode, setMode] = useState<"view" | "edit" | "password">("view");
  const { reset } = useForm();

  const getInitial = () => {
    if (session?.user?.name) {
      return session.user.name.charAt(0).toUpperCase();
    }
    return "B";
  };

  const handleCancel = () => {
    setMode("view");
    reset();
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setMode("view");
      reset();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 rounded-full hover:bg-green-500/20 cursor-pointer hover:transform hover:scale-120 transition-all duration-300"
        >
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-green-700 font-semibold text-sm">
              {getInitial()}
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-green-200 [&>button]:cursor-pointer">
        {mode === "edit" ? (
          <>
            <DialogHeader>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleCancel}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5 text-green-600" />
                </Button>
                <DialogTitle className="text-green-600">
                  Editar perfil
                </DialogTitle>
              </div>
              <DialogDescription>
                Actualiza tu información personal
              </DialogDescription>
            </DialogHeader>
            <DialogForm
              session={session}
              update={update}
              handleCancel={handleCancel}
              setIsEditing={() => setMode("view")}
            />
          </>
        ) : mode === "password" ? (
          <>
            <DialogHeader>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleCancel}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5 text-green-600" />
                </Button>
                <DialogTitle className="text-green-600">
                  Cambiar Contraseña
                </DialogTitle>
              </div>
              <DialogDescription>Actualiza tu contraseña</DialogDescription>
            </DialogHeader>
            <PasswordForm handleCancel={handleCancel} setMode={setMode} />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-800">
                Información del Usuario
              </DialogTitle>
              <DialogDescription>
                Detalles de la cuenta del usuario y opciones disponibles.
              </DialogDescription>
            </DialogHeader>
            <InfoUser
              session={session}
              handleSignOut={handleSignOut}
              getInitial={getInitial}
              setMode={setMode}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogInfoUser;
