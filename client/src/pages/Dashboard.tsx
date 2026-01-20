import { useSession } from "@/lib/auth-client";
import { Layout } from "@/components/layout";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hola, {session?.user?.name} 👋
          </h1>
          <p className="text-lg text-gray-600">
            ¡Bienvenido a tu panel de control!
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Datos de Sesión
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-500">ID de Usuario</dt>
              <dd className="text-sm font-mono text-gray-900 bg-gray-50 p-1 rounded">
                {session?.user?.id}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900">{session?.user?.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}