'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FamilyMember, TreeNode } from '@/types/family';
import FamilyTreeNode from './FamilyTreeNode';

interface FamilyTreeProps {
  members: FamilyMember[];
  onMemberClick?: (member: FamilyMember) => void;
}

export default function FamilyTree({ members, onMemberClick }: FamilyTreeProps) {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'bio' | 'relations'>('info');

  // Build tree structure (simplified - you'd want more complex logic in production)
  const buildTree = (members: FamilyMember[]): TreeNode[] => {
    // Find root members (those without parents)
    const roots = members.filter(
      (m) => !m.parents || m.parents.length === 0
    );

    return roots.map((member) => ({
      member,
      children: buildChildren(member, members),
      level: 0,
    }));
  };

  const buildChildren = (parent: FamilyMember, allMembers: FamilyMember[]): TreeNode[] => {
    const children = parent.children || [];
    return children.map((child) => ({
      member: child,
      children: buildChildren(child, allMembers),
      level: 0,
    }));
  };

  const handleMemberClick = (member: FamilyMember) => {
    setSelectedMember(member);
    setActiveTab('info');
    onMemberClick?.(member);
  };

  const renderTreeLevel = (nodes: TreeNode[], level: number) => {
    if (nodes.length === 0) return null;

    return (
      <div className="flex flex-col items-center gap-16 relative">
        {/* Generación Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -left-16 top-8 rotate-[-90deg] origin-center"
        >
          <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">
            Generación {level + 1}
          </span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 relative">
          {nodes.map((node, index) => (
            <div key={node.member.id} className="flex flex-col items-center relative">
              <FamilyTreeNode
                member={node.member}
                level={level}
                onClick={() => handleMemberClick(node.member)}
              />
              
              {/* Conexión vertical hacia hijos */}
              {node.children.length > 0 && (
                <>
                  {/* Línea vertical desde el nodo */}
                  <svg className="absolute" style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} width="4" height="60">
                    <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      x1="2"
                      y1="0"
                      x2="2"
                      y2="60"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-emerald-500"
                      strokeDasharray="5,5"
                    />
                  </svg>
                  
                  <div className="mt-16">
                    {renderTreeLevel(node.children, level + 1)}
                  </div>
                </>
              )}

              {/* Línea horizontal entre hermanos */}
              {index < nodes.length - 1 && (
                <svg 
                  className="absolute" 
                  style={{ top: '50%', left: '100%', transform: 'translateY(-50%)'}} 
                  width="48" 
                  height="4"
                >
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    x1="0"
                    y1="2"
                    x2="48"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-gray-300"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (members.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-8xl mb-6"
        >
          🌱
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Tu árbol está vacío
        </h3>
        <p className="text-gray-600 mb-8 max-w-md">
          Comienza tu legado familiar agregando el primer miembro de tu árbol genealógico
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg font-semibold flex items-center gap-2"
        >
          <span>✨</span>
          Agregar Primer Miembro
        </motion.button>
      </motion.div>
    );
  }

  const tree = buildTree(members);

  return (
    <div className="w-full overflow-x-auto py-12 px-4">
      <div className="min-w-max px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {renderTreeLevel(tree, 0)}
        </motion.div>
      </div>

      {/* Member Details Modal Mejorado */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border border-gray-200"
            >
              {/* Header con foto */}
              <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 pb-20">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Avatar grande */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-32 h-32 rounded-full bg-white p-1 shadow-2xl mb-4"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-5xl font-bold text-emerald-700">
                      {selectedMember.first_name[0]}{selectedMember.last_name[0]}
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {selectedMember.first_name} {selectedMember.last_name}
                  </h2>
                  {selectedMember.maiden_name && (
                    <p className="text-emerald-100 text-sm">(née {selectedMember.maiden_name})</p>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-white px-6 -mt-12 relative z-10 shadow-sm">
                {[
                  { id: 'info', label: 'Información', icon: '📋' },
                  { id: 'bio', label: 'Biografía', icon: '📖' },
                  { id: 'relations', label: 'Relaciones', icon: '👨‍👩‍👧‍👦' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative ${
                      activeTab === tab.id
                        ? 'text-emerald-600
                        : 'text-gray-500 hover:text-gray-700
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content con scroll */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <AnimatePresence mode="wait">
                  {activeTab === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedMember.birth_date && (
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">🎂</span>
                              <span className="font-semibold text-gray-700">Nacimiento</span>
                            </div>
                            <p className="text-gray-900 font-medium">
                              {new Date(selectedMember.birth_date).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            {selectedMember.birth_place && (
                              <p className="text-sm text-gray-500 mt-1">
                                📍 {selectedMember.birth_place}
                              </p>
                            )}
                          </div>
                        )}

                        {selectedMember.death_date && (
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">✝</span>
                              <span className="font-semibold text-gray-700">Fallecimiento</span>
                            </div>
                            <p className="text-gray-900 font-medium">
                              {new Date(selectedMember.death_date).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            {selectedMember.death_place && (
                              <p className="text-sm text-gray-500 mt-1">
                                📍 {selectedMember.death_place}
                              </p>
                            )}
                          </div>
                        )}

                        {selectedMember.occupation && (
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">💼</span>
                              <span className="font-semibold text-gray-700">Ocupación</span>
                            </div>
                            <p className="text-gray-900 font-medium">
                              {selectedMember.occupation}
                            </p>
                          </div>
                        )}

                        {selectedMember.gender && (
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">
                                {selectedMember.gender === 'male' ? '👨' : selectedMember.gender === 'female' ? '👩' : '👤'}
                              </span>
                              <span className="font-semibold text-gray-700">Género</span>
                            </div>
                            <p className="text-gray-900 font-medium">
                              {selectedMember.gender === 'male' ? 'Masculino' : selectedMember.gender === 'female' ? 'Femenino' : 'Otro'}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'bio' && (
                    <motion.div
                      key="bio"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-xl p-6 border border-gray-200"
                    >
                      {selectedMember.bio ? (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {selectedMember.bio}
                        </p>
                      ) : (
                        <div className="text-center py-8">
                          <span className="text-4xl mb-3 block">📝</span>
                          <p className="text-gray-500">
                            No hay biografía disponible
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'relations' && (
                    <motion.div
                      key="relations"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                        <span className="text-4xl mb-3 block">👨‍👩‍👧‍👦</span>
                        <p className="text-gray-500">
                          Las relaciones familiares se mostrarán aquí
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer con acciones */}
              <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium shadow-md"
                >
                  ✏️ Editar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium border border-gray-300"
                >
                  🔗 Compartir
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

