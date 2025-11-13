'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FamilyTreeCanvas from '@/components/FamilyTreeCanvas';
import type { FamilyMember } from '@/types/family';

// Demo data
const demoMembers: FamilyMember[] = [
  {
    id: '1',
    user_id: 'demo',
    first_name: 'Juan',
    last_name: 'García',
    birth_date: '1950-05-15',
    gender: 'male',
    occupation: 'Ingeniero',
    bio: 'Fundador de la familia García. Ingeniero civil con más de 40 años de experiencia.',
    birth_place: 'Madrid, España',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    children: [
      {
        id: '2',
        user_id: 'demo',
        first_name: 'María',
        last_name: 'García',
        maiden_name: 'López',
        birth_date: '1975-08-20',
        gender: 'female',
        occupation: 'Médico',
        bio: 'Doctora especializada en pediatría.',
        birth_place: 'Barcelona, España',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        children: [
          {
            id: '4',
            user_id: 'demo',
            first_name: 'Carlos',
            last_name: 'García',
            birth_date: '2005-03-10',
            gender: 'male',
            occupation: 'Estudiante',
            bio: 'Estudiante de secundaria apasionado por la tecnología.',
            birth_place: 'Valencia, España',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '5',
            user_id: 'demo',
            first_name: 'Ana',
            last_name: 'García',
            birth_date: '2008-11-25',
            gender: 'female',
            occupation: 'Estudiante',
            bio: 'Estudiante con talento artístico.',
            birth_place: 'Valencia, España',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      },
      {
        id: '3',
        user_id: 'demo',
        first_name: 'Pedro',
        last_name: 'García',
        birth_date: '1978-12-05',
        gender: 'male',
        occupation: 'Arquitecto',
        bio: 'Arquitecto especializado en diseño sostenible.',
        birth_place: 'Barcelona, España',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
];

export default function TreePage() {
  const [members] = useState<FamilyMember[]>(demoMembers);
  const [view, setView] = useState<'tree' | 'list'>('tree');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Mi Árbol Genealógico
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explora tu historia familiar
              </p>
            </div>

            <div className="flex gap-4">
              {/* View Toggle */}
              <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setView('tree')}
                  className={`px-4 py-2 rounded-l-lg transition-colors ${
                    view === 'tree'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  🌳 Árbol
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-r-lg transition-colors ${
                    view === 'list'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  📋 Lista
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
              >
                ➕ Agregar Miembro
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {view === 'tree' ? (
            <div className="h-[700px] relative">
              <FamilyTreeCanvas members={members} />
            </div>
          ) : (
            <div className="space-y-4 p-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {member.first_name} {member.last_name}
                      </h3>
                      {member.birth_date && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Nacido: {new Date(member.birth_date).toLocaleDateString('es-ES')}
                        </p>
                      )}
                      {member.occupation && (
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                          {member.occupation}
                        </p>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      ✏️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-emerald-600">6</div>
            <div className="text-gray-600 dark:text-gray-400">Miembros Totales</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-gray-600 dark:text-gray-400">Generaciones</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600">75</div>
            <div className="text-gray-600 dark:text-gray-400">Años de Historia</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

