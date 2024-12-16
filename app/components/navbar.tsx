'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiChartBar, HiUsers, HiTemplate, HiMenu, HiX } from 'react-icons/hi';
import { GiChicken } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { path: '/', icon: HiHome, en: 'Accueil' },
    { path: '/dashboard', icon: HiTemplate, en: 'Tableau de bord', auth: true },
    { path: '/chickens', icon: HiUsers, en: 'Mes Poules', auth: true },
    { path: '/ranking', icon: HiChartBar, en: 'Classement', auth: true },
  ];

  const filteredNavItems = navItems.filter(item => !item.auth || isAuthenticated);

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-white text-gray-800 shadow-lg border-gray-100' 
            : 'bg-gradient-to-r from-chinese-red to-red-700 text-white border-red-600'
        }`}
      >
        <div 
          className={`absolute inset-0 chinese-pattern opacity-10 ${
            scrolled ? 'opacity-0' : 'opacity-10'
          }`}
        />
        <div className="container mx-auto px-4 relative">
          <div className="flex justify-between items-center h-16">
            
            <Link 
              href="/"
              className="flex items-center space-x-2 hover-bounce group"
            >
              <GiChicken className={`h-8 w-8 transform group-hover:rotate-12 transition-transform duration-300 ${
                scrolled ? 'text-chinese-red' : 'text-chinese-gold'
              }`} />
              <div className="flex items-center">
                <div className="flex flex-col ml-2">
                  <span className="text-lg font-bold">ChickZen</span>
                  <span className={`text-xs ${scrolled ? 'text-gray-600' : 'text-white/75'}`}>
                    Master
                  </span>
                </div>
              </div>
            </Link>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {filteredNavItems.map(({ path, en, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  className={`
                    flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 hover-bounce
                    ${isActive(path)
                      ? scrolled
                        ? 'text-chinese-red bg-red-50 font-medium'
                        : 'text-white bg-white/10 font-medium'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-2" />
                    <span>{en}</span>
                  </div>
                </Link>
              ))}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300 hover-bounce
                    ${scrolled ? 'text-chinese-red hover:bg-red-50' : 'text-white hover:bg-white/10'}
                  `}
                >
                  Déconnexion
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`
                    px-4 py-2 rounded-lg transition-all duration-300 hover-bounce
                    ${scrolled ? 'text-chinese-red hover:bg-red-50' : 'text-white hover:bg-white/10'}
                  `}
                >
                  Connexion
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`
                    px-3 py-1 rounded-lg text-sm transition-all duration-300
                    ${scrolled ? 'text-chinese-red hover:bg-red-50' : 'text-white hover:bg-white/10'}
                  `}
                >
                  Déconnexion
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`
                    px-3 py-1 rounded-lg text-sm transition-all duration-300
                    ${scrolled ? 'text-chinese-red hover:bg-red-50' : 'text-white hover:bg-white/10'}
                  `}
                >
                  Connexion
                </button>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                aria-label="Menu"
              >
                {isOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <div
            className={`
              md:hidden absolute left-0 right-0 transition-all duration-500 ease-in-out
              ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
              ${scrolled ? 'bg-white' : 'bg-gradient-to-r from-chinese-red to-red-700'}
              border-t ${scrolled ? 'border-gray-100' : 'border-red-600'}
            `}
          >
            <div className="container mx-auto px-4 py-2 space-y-1">
              {filteredNavItems.map(({ path, en, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all duration-300
                    ${isActive(path)
                      ? scrolled
                        ? 'text-chinese-red bg-red-50 font-medium'
                        : 'text-white bg-white/10 font-medium'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <div className="flex flex-col">
                    <span>{en}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}
