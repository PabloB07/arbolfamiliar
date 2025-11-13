'use client';

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

  return (
    <div className="bg-gradient-to-b from-white to-emerald-50 dark:from-black dark:to-gray-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Preserva tu
            <span className="block bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Historia Familiar
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Crea, gestiona y comparte tu árbol genealógico. Conecta con tus raíces
            y preserva tu legado para las generaciones futuras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Comenzar Gratis
              </motion.button>
            </Link>
            <Link href="/tree">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-2 border-gray-200 dark:border-gray-700"
              >
                Ver Demo
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Árbol 3D Interactivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-200 dark:border-emerald-800"
        >
          <Tree3D />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Características
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
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
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-emerald-600 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Crear Cuenta Gratis
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
