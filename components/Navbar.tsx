'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 mx-4 mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-2xl">🌳</span>
                  <span className="text-gray-900 dark:text-white font-semibold text-lg">ÁrbolFamiliar</span>
                </motion.div>
              </Link>

              {/* Desktop Navigation - Center */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                  Inicio
                </Link>
                <Link
                  href="/tree"
                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                  Mi Árbol
                </Link>
                <Link
                  href="/members"
                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                  Miembros
                </Link>
              </div>

              {/* Right side buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-gray-400 dark:hover:border-gray-500 transition-all text-sm font-medium shadow-sm"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all text-sm font-medium shadow-lg shadow-emerald-500/30"
                  >
                    Comenzar Gratis
                  </motion.button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                <Link
                  href="/tree"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors backdrop-blur-sm"
                >
                  Mi Árbol
                </Link>
                <Link
                  href="/members"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors backdrop-blur-sm"
                >
                  Miembros
                </Link>
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors backdrop-blur-sm"
                >
                  Inicio
                </Link>
                <div className="pt-4 space-y-2">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-center text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all backdrop-blur-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all font-medium shadow-lg shadow-emerald-500/30"
                  >
                    Comenzar Gratis
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}

