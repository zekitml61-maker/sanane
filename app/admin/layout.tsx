'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  QrCode, 
  Settings, 
  LogOut,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si on est sur la page de connexion
    if (pathname === '/admin/connexion') {
      setIsAuthenticated(true);
      return;
    }

    // Vérifier l'authentification admin
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/connexion');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/connexion');
  };

  // Si on est sur la page de connexion, afficher directement le contenu
  if (pathname === '/admin/connexion') {
    return <>{children}</>;
  }

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Collectes du Jour', href: '/admin/collectes-du-jour', icon: CheckCircle },
    { name: 'Suivi Commandes', href: '/admin/commandes-suivi', icon: Package },
    { name: 'Scanner', href: '/admin/scanner', icon: QrCode },
    { name: 'Paramètres', href: '/admin/parametres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-black text-primary-600">C'Propre Admin</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                      }
                    `}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button 
              onClick={handleLogout}
              className="flex-shrink-0 w-full group flex items-center text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="mr-3 h-6 w-6 text-gray-400 group-hover:text-red-500" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-lg font-black text-primary-600">C'Propre Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation transition"
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-60" onClick={() => setSidebarOpen(false)}>
            <div 
              className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mt-20 px-3 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        group flex items-center px-4 py-4 text-base font-semibold rounded-xl transition-all touch-manipulation active:scale-95
                        ${isActive 
                          ? 'bg-primary-600 text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                        }
                      `}
                    >
                      <item.icon className={`mr-3 h-7 w-7 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 pt-16 md:pt-0">
          <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
