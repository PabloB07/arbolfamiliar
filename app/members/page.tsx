'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FamilyTreeNode from '@/components/FamilyTreeNode';
import type { FamilyMember } from '@/types/family';
import { getCurrentUser, getFamilyMembers } from '@/lib/supabase-client';

export default function MembersPage() {
  const router = useRouter();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  useEffect(() => {
    loadFamilyMembers();
  }, []);

  const loadFamilyMembers = async () => {
    try {
      const user = await getCurrentUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data, error: fetchError } = await getFamilyMembers(user.id);
      
      if (fetchError) {
        setError('Error al cargar los miembros de la familia');
        console.error(fetchError);
      } else {
        setMembers(data || []);
      }
    } catch (err) {
      setError('Error inesperado al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">👨‍👩‍👧‍👦</div>
          <p className="text-gray-600">Cargando miembros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Miembros de la Familia
              </h1>
              <p className="text-gray-600">
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

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}

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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </motion.div>

        {/* Empty State */}
        {members.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No hay miembros aún
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza agregando el primer miembro de tu familia
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              ➕ Agregar Primer Miembro
            </motion.button>
          </div>
        ) : (
          <>
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
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <FamilyTreeNode member={member} />
              </div>

              {member.bio && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {member.bio}
                </p>
              )}

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors">
                  Ver Detalles
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  Editar
                </button>
              </div>
            </motion.div>
          ))}
            </motion.div>

            {filteredMembers.length === 0 && searchTerm && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron miembros
                </h3>
                <p className="text-gray-600">
                  Intenta con otro término de búsqueda
                </p>
              </div>
            )}
          </>
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
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedMember.first_name} {selectedMember.last_name}
                </h2>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-700"
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
                    <span className="font-semibold text-gray-700">
                      Fecha de Nacimiento:
                    </span>
                    <p className="text-gray-600">
                      {new Date(selectedMember.birth_date).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {selectedMember.birth_place && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Lugar de Nacimiento:
                    </span>
                    <p className="text-gray-600">
                      {selectedMember.birth_place}
                    </p>
                  </div>
                )}
                {selectedMember.occupation && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Ocupación:
                    </span>
                    <p className="text-gray-600">
                      {selectedMember.occupation}
                    </p>
                  </div>
                )}
                {selectedMember.gender && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Género:
                    </span>
                    <p className="text-gray-600">
                      {selectedMember.gender === 'male' ? 'Masculino' : selectedMember.gender === 'female' ? 'Femenino' : 'Otro'}
                    </p>
                  </div>
                )}
              </div>

              {selectedMember.bio && (
                <div className="mb-6">
                  <span className="font-semibold text-gray-700 block mb-2">
                    Biografía:
                  </span>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Editar
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
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

