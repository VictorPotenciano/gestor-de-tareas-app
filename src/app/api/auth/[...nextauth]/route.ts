import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Faltan credenciales");
        }

        const userFound = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!userFound) throw new Error("Usuario no existe");

        const matchPassword = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Credenciales equivocados");

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Asignar el ID del usuario
        session.user.id = token.sub;

        // Consultar los datos más recientes del usuario en la base de datos
        const user = await prisma.user.findUnique({
          where: { id: parseInt(token.sub) },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        if (user) {
          // Actualizar los datos de la sesión con los valores de la base de datos
          session.user.name = user.name;
          session.user.email = user.email;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
