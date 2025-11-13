'use client';

import { motion } from 'framer-motion';
import type { FamilyMember } from '@/types/family';
import Image from 'next/image';

interface FamilyTreeNodeProps {
  member: FamilyMember;
  onClick?: () => void;
  level?: number;
}

export default function FamilyTreeNode({ member, onClick, level = 0 }: FamilyTreeNodeProps) {
  const getGenderColor = (gender?: string | null) => {
    switch (gender) {
      case 'male':
        return {
          gradient: 'from-blue-500 via-blue-600 to-indigo-600',
          icon: '👨',
          light: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        };
      case 'female':
        return {
          gradient: 'from-pink-500 via-rose-600 to-purple-600',
          icon: '👩',
          light: 'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
        };
      default:
        return {
          gradient: 'from-purple-500 via-violet-600 to-indigo-600',
          icon: '👤',
          light: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
        };
    }
  };

  const getGenerationLabel = (level: number) => {
    const labels = ['Patriarca/Matriarca', 'Segunda Generación', 'Tercera Generación', 'Cuarta Generación'];
    return labels[level] || `Generación ${level + 1}`;
  };

  const isAlive = !member.death_date;
  const birthYear = member.birth_date ? new Date(member.birth_date).getFullYear() : null;
  const deathYear = member.death_date ? new Date(member.death_date).getFullYear() : null;
  const age = member.birth_date
    ? new Date().getFullYear() - new Date(member.birth_date).getFullYear()
    : null;

  const genderStyle = getGenderColor(member.gender);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: level * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative flex flex-col items-center">
        {/* Generación Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + level * 0.1 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
        >
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${genderStyle.light} shadow-sm whitespace-nowrap`}>
            {getGenerationLabel(level)}
          </span>
        </motion.div>

        {/* Avatar Container con efecto de brillo */}
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${genderStyle.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}
          />
          
          {/* Avatar */}
          <div
            className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${genderStyle.gradient} p-[3px] shadow-xl ring-4 ring-white dark:ring-gray-900 group-hover:ring-emerald-200 dark:group-hover:ring-emerald-800 transition-all duration-300`}
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 overflow-hidden relative">
              {member.photo_url ? (
                <Image
                  src={member.photo_url}
                  alt={`${member.first_name} ${member.last_name}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                  {member.first_name[0]}
                  {member.last_name[0]}
                </div>
              )}
              
              {/* Status indicator */}
              <div className="absolute bottom-1 right-1">
                <div className={`w-5 h-5 rounded-full ${isAlive ? 'bg-emerald-500' : 'bg-gray-400'} border-2 border-white dark:border-gray-900 shadow-md flex items-center justify-center text-xs`}>
                  {isAlive ? '✓' : '✝'}
                </div>
              </div>
            </div>
          </div>

          {/* Gender Icon */}
          <div className="absolute -bottom-1 -right-1 text-2xl bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg border-2 border-white dark:border-gray-700">
            {genderStyle.icon}
          </div>
        </div>

        {/* Info Card con diseño mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-4 min-w-[200px] max-w-[220px] border border-gray-200 dark:border-gray-700 group-hover:shadow-2xl group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-all duration-300"
        >
          {/* Nombre */}
          <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
            <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight">
              {member.first_name}
            </h3>
            <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight">
              {member.last_name}
            </h3>
            {member.maiden_name && (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">
                (née {member.maiden_name})
              </p>
            )}
          </div>

          {/* Información vital */}
          <div className="space-y-1.5">
            {member.birth_date && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <span>🎂</span>
                  <span>Nacimiento</span>
                </span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {birthYear}
                </span>
              </div>
            )}

            {deathYear && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <span>✝</span>
                  <span>Fallecimiento</span>
                </span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {deathYear}
                </span>
              </div>
            )}

            {isAlive && age && (
              <div className="flex items-center justify-center gap-1 text-xs">
                <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full font-medium">
                  {age} años
                </span>
              </div>
            )}

            {member.occupation && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-1 text-xs">
                  <span>💼</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium truncate">
                    {member.occupation}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Hover indicator */}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 font-medium">
              Click para ver más →
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

