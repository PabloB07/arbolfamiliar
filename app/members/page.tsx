'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import FamilyTreeNode from '@/components/FamilyTreeNode';
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
  },
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
];

export default function MembersPage() {
  const [members] = useState<FamilyMember[]>(demoMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const filteredMembers = members.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Miembros de la Familia
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona la información de tu familia
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              ➕ Nuevo Miembro
            </motion.button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <input
            type="text"
            placeholder="Buscar miembros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </motion.div>

        {/* Members Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <FamilyTreeNode member={member} />
              </div>

              {member.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {member.bio}
                </p>
              )}

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
                  Ver Detalles
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Editar
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron miembros
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}

        {/* Member Details Modal */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMember.first_name} {selectedMember.last_name}
                </h2>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                {selectedMember.birth_date && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Fecha de Nacimiento:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(selectedMember.birth_date).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {selectedMember.birth_place && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Lugar de Nacimiento:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedMember.birth_place}
                    </p>
                  </div>
                )}
                {selectedMember.occupation && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Ocupación:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedMember.occupation}
                    </p>
                  </div>
                )}
                {selectedMember.gender && (
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Género:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedMember.gender === 'male' ? 'Masculino' : selectedMember.gender === 'female' ? 'Femenino' : 'Otro'}
                    </p>
                  </div>
                )}
              </div>

              {selectedMember.bio && (
                <div className="mb-6">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                    Biografía:
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Editar
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Ver Árbol
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

