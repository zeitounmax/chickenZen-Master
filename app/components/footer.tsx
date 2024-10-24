'use client';

import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiHome, HiUsers, HiChartBar } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-baseline space-x-2 group">
              <h2 className="text-xl font-bold text-chinese-red transition-colors duration-300 group-hover:text-chinese-red/90">
                ChickZen
              </h2>
             
            </div>
            <p className="text-sm text-gray-600 max-w-md leading-relaxed">
              Harmonisez votre élevage de poules avec sagesse et précision. 
              Suivez la production et le bien-être de vos poules jour après jour.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com/zeitounmax"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-chinese-red transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
           
              <a
                href="https://www.linkedin.com/company/zeitouncode/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-chinese-red transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <nav className="md:ml-auto" aria-label="Navigation du pied de page">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-chinese-red transition-colors duration-300 group"
                >
                  <HiHome className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Tableau de bord</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/chickens"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-chinese-red transition-colors duration-300 group"
                >
                  <HiUsers className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Mes Poules</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ranking"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-chinese-red transition-colors duration-300 group"
                >
                  <HiChartBar className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Classement</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:ml-auto">
            <div className="border-l-2 border-chinese-red/20 pl-4 transition-all duration-300 hover:border-chinese-red/40 hover:pl-6">
              <blockquote>
                <p className="text-sm text-gray-600 italic">
                  "La patience est la clé de l'harmonie avec vos poules"
                </p>
                <footer className="text-sm text-gray-500 mt-1">
                  <cite>- 鸡禅师 (Maître Zen des Poules)</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Image
              src="/Logo.svg"
              alt="Zeitouncode Logo"
              width={24}
              height={24}
              className="hover:opacity-80 transition-opacity"
            />
            <p>&copy; {new Date().getFullYear()} Zeitouncode. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
