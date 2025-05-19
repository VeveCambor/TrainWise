import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const navigation = [
    { name: 'Tréninkové plány', href: '/training-plans' },
    { name: 'Sledování pokroku', href: '/progress' },
    { name: 'AI Trenér', href: '/ai-assistant' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-trainwise-lightpink">
      <nav className="bg-white shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/" className="text-2xl font-bold text-trainwise-coral">
                  TrainWise
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-trainwise-coral hover:text-trainwise-coral"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <button
                    onClick={() => {/* TODO: Implementovat logout */}}
                    className="rounded-md bg-trainwise-coral px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
                  >
                    Odhlásit se
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="rounded-md bg-trainwise-coral px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-90"
                >
                  Přihlásit se
                </Link>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Otevřít menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-trainwise-coral hover:bg-gray-50 hover:text-trainwise-coral"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-base font-medium text-gray-500">
                    {user?.name}
                  </div>
                  <button
                    onClick={() => {/* TODO: Implementovat logout */}}
                    className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Odhlásit se
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Přihlásit se
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 