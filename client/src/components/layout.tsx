import { ReactNode } from "react";
import { Link } from "wouter";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, PawPrint, Loader2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isPending } = useSession();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-primary/10 p-2 rounded-full transition-transform duration-300 ease-in-out group-hover:rotate-[20deg] group-hover:scale-110">
                <PawPrint className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground font-display">
                KittyPaw
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {isPending && (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              )}

              <ModeToggle />

              {/* Botón Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}