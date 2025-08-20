"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DialogInfoUser from "./DialogInfoUser";

const Navbar = () => {
  const { data: session, update } = useSession();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <nav className="bg-green-600 border-green-700 shadow-xl">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/favicon-32x32.png"
            width={32}
            height={32}
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Gestor de Tareas
          </span>
        </Link>
        <DialogInfoUser
          session={session}
          update={update}
          handleSignOut={handleSignOut}
        />
      </div>
    </nav>
  );
};

export default Navbar;
