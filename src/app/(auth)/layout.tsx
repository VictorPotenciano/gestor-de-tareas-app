import ".//../globals.css";

export const metadata = {
  title: "Tareas App",
  description: "App para gestionar tareas",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-green-600">{children}</body>
    </html>
  );
}
