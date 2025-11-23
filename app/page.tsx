'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Importar el árbol 3D de forma dinámica para evitar SSR
const Tree3D = dynamic(() => import('@/components/Tree3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-8xl animate-pulse">🌳</div>
    </div>
  ),
});

// Importar el divisor de ondas
import WaveDivider from '@/components/WaveDivider';

export default function Home() {
  const features = [
    {
      icon: '🌳',
      title: 'Árbol Genealógico Visual',
      description: 'Visualiza tu familia de manera intuitiva y hermosa',
    },
    {
      icon: '📸',
      title: 'Fotos y Recuerdos',
      description: 'Guarda fotos y momentos especiales de cada miembro',
    },
    {
      icon: '🔒',
      title: 'Privado y Seguro',
      description: 'Tu información familiar está protegida con Supabase',
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Accede desde cualquier dispositivo',
    },
  ];

  const [scrollOpacity, setScrollOpacity] = React.useState(1);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 700; // Pixels de scroll para fade completo
      const opacity = Math.max(0, 1 - scrollY / maxScroll);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 3D Background - Fixed position with scroll fade */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none"
        style={{
          opacity: scrollOpacity,
          transition: 'opacity 0.1s ease-out'
        }}
      >
        <Tree3D />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-7xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                Preserva tu
              </span>
              <span className="block bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                Historia Familiar
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Crea, gestiona y comparte tu árbol genealógico. Conecta con tus raíces
              y preserva tu legado para las generaciones futuras.
            </p>

            {/* Decorative Branch Divider */}
            <div className="flex justify-center mb-6 md:mb-8">
              <svg
                width="200"
                height="40"
                viewBox="0 0 200 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80"
              >
                {/* Main branch */}
                <path
                  d="M20 20 Q60 15, 100 20 T180 20"
                  stroke="#8B4513"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Left small branches */}
                <path d="M40 20 L35 10" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 18 L48 8" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />

                {/* Center small branches */}
                <path d="M100 20 L95 12" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                <path d="M100 20 L105 12" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                <path d="M110 19 L112 10" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />

                {/* Right small branches */}
                <path d="M150 18 L152 9" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M160 20 L165 11" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />

                {/* Tiny leaves */}
                <circle cx="35" cy="9" r="2" fill="#10b981" opacity="0.7" />
                <circle cx="48" cy="7" r="1.5" fill="#10b981" opacity="0.7" />
                <circle cx="95" cy="11" r="2" fill="#10b981" opacity="0.7" />
                <circle cx="105" cy="11" r="2" fill="#10b981" opacity="0.7" />
                <circle cx="112" cy="9" r="1.5" fill="#10b981" opacity="0.7" />
                <circle cx="152" cy="8" r="1.5" fill="#10b981" opacity="0.7" />
                <circle cx="165" cy="10" r="2" fill="#10b981" opacity="0.7" />
              </svg>
            </div>

            <div className="flex justify-center">
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all text-base sm:text-lg font-semibold shadow-xl shadow-emerald-500/40"
                >
                  Comenzar Gratis
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Wave Divider */}
        <div className="relative">
          <WaveDivider />
        </div>

        {/* Features Section */}
        <section className="bg-white -mt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Características
              </h2>
              <p className="text-xl text-gray-600">
                Todo lo que necesitas para documentar tu historia familiar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comienza tu árbol hoy
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Únete a miles de familias que ya están preservando su historia
            </p>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-emerald-600 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all shadow-lg"
              >
                Crear Cuenta Gratis
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}
