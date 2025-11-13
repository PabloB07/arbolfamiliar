'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FamilyMember, TreeNode } from '@/types/family';

interface FamilyTreeCanvasProps {
  members: FamilyMember[];
  onMemberClick?: (member: FamilyMember) => void;
}

interface CanvasNode {
  member: FamilyMember;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
  children: CanvasNode[];
}

export default function FamilyTreeCanvas({ members, onMemberClick }: FamilyTreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [hoveredNode, setHoveredNode] = useState<CanvasNode | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'info' | 'bio' | 'relations'>('info');
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  const NODE_WIDTH = 200;
  const NODE_HEIGHT = 140;
  const HORIZONTAL_SPACING = 80;
  const VERTICAL_SPACING = 150;
  const AVATAR_SIZE = 60;

  // Build tree structure
  const buildTree = useCallback((members: FamilyMember[]): TreeNode[] => {
    const roots = members.filter((m) => !m.parents || m.parents.length === 0);
    return roots.map((member) => ({
      member,
      children: buildChildren(member, members),
      level: 0,
    }));
  }, []);

  const buildChildren = (parent: FamilyMember, allMembers: FamilyMember[]): TreeNode[] => {
    const children = parent.children || [];
    return children.map((child) => ({
      member: child,
      children: buildChildren(child, allMembers),
      level: 0,
    }));
  };

  // Calculate tree layout
  const calculateLayout = useCallback((node: TreeNode, level: number = 0, x: number = 0): CanvasNode => {
    const canvasNode: CanvasNode = {
      member: node.member,
      x: 0,
      y: level * (NODE_HEIGHT + VERTICAL_SPACING) + 100,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      level,
      children: [],
    };

    if (node.children.length > 0) {
      let currentX = x;
      node.children.forEach((child) => {
        const childNode = calculateLayout(child, level + 1, currentX);
        canvasNode.children.push(childNode);
        currentX = childNode.x + childNode.width + HORIZONTAL_SPACING;
      });

      // Center parent above children
      const firstChild = canvasNode.children[0];
      const lastChild = canvasNode.children[canvasNode.children.length - 1];
      canvasNode.x = (firstChild.x + lastChild.x + lastChild.width) / 2 - NODE_WIDTH / 2;
    } else {
      canvasNode.x = x;
    }

    return canvasNode;
  }, []);

  // Get gender color
  const getGenderColor = (gender?: string | null) => {
    switch (gender) {
      case 'male':
        return { primary: '#3b82f6', secondary: '#2563eb', light: '#93c5fd' };
      case 'female':
        return { primary: '#ec4899', secondary: '#db2777', light: '#f9a8d4' };
      default:
        return { primary: '#8b5cf6', secondary: '#7c3aed', light: '#c4b5fd' };
    }
  };

  // Draw node on canvas
  const drawNode = (
    ctx: CanvasRenderingContext2D,
    node: CanvasNode,
    isHovered: boolean,
    isDark: boolean
  ) => {
    const { x, y, width, height, member } = node;
    const colors = getGenderColor(member.gender);
    const backgroundColor = isDark ? '#1f2937' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const borderColor = isDark ? '#374151' : '#e5e7eb';

    // Shadow for depth
    if (isHovered) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
    }

    // Card background
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = isHovered ? colors.primary : borderColor;
    ctx.lineWidth = isHovered ? 3 : 2;
    
    // Rounded rectangle
    const radius = 16;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Avatar circle
    const avatarX = x + width / 2;
    const avatarY = y + 30;
    
    // Avatar gradient
    const gradient = ctx.createLinearGradient(
      avatarX - AVATAR_SIZE / 2,
      avatarY - AVATAR_SIZE / 2,
      avatarX + AVATAR_SIZE / 2,
      avatarY + AVATAR_SIZE / 2
    );
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, colors.secondary);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, AVATAR_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    // Avatar border
    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Initials
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const initials = `${member.first_name[0]}${member.last_name[0]}`;
    ctx.fillText(initials, avatarX, avatarY);

    // Status indicator
    const isAlive = !member.death_date;
    ctx.fillStyle = isAlive ? '#10b981' : '#6b7280';
    ctx.beginPath();
    ctx.arc(avatarX + AVATAR_SIZE / 2 - 5, avatarY + AVATAR_SIZE / 2 - 5, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Status icon
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.fillText(isAlive ? '✓' : '✝', avatarX + AVATAR_SIZE / 2 - 5, avatarY + AVATAR_SIZE / 2 - 5);

    // Name
    ctx.fillStyle = textColor;
    ctx.font = 'bold 16px Playfair Display, serif';
    ctx.textAlign = 'center';
    const fullName = `${member.first_name} ${member.last_name}`;
    ctx.fillText(fullName, x + width / 2, y + 70, width - 20);

    // Birth year
    if (member.birth_date) {
      const birthYear = new Date(member.birth_date).getFullYear();
      const deathYear = member.death_date ? new Date(member.death_date).getFullYear() : null;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280';
      const dateText = deathYear ? `${birthYear} - ${deathYear}` : `${birthYear}`;
      ctx.fillText(dateText, x + width / 2, y + 90);
    }

    // Occupation
    if (member.occupation) {
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = colors.primary;
      ctx.fillText('💼 ' + member.occupation, x + width / 2, y + 110, width - 20);
    }

    // Hover indicator
    if (isHovered) {
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillStyle = colors.primary;
      ctx.fillText('Click para más info →', x + width / 2, y + height - 10);
    }

    // Generation badge
    const badgeText = node.level === 0 ? 'Patriarca' : `Gen ${node.level + 1}`;
    ctx.font = 'bold 10px Inter, sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 12;
    const badgeX = x + width / 2 - badgeWidth / 2;
    const badgeY = y - 15;

    ctx.fillStyle = colors.light;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, 16, 8);
    ctx.fill();

    ctx.fillStyle = colors.secondary;
    ctx.fillText(badgeText, x + width / 2, badgeY + 8);
  };

  // Draw connection lines
  const drawConnections = (ctx: CanvasRenderingContext2D, node: CanvasNode, isDark: boolean) => {
    if (node.children.length === 0) return;

    const startX = node.x + node.width / 2;
    const startY = node.y + node.height;

    node.children.forEach((child) => {
      const endX = child.x + child.width / 2;
      const endY = child.y;
      const midY = (startY + endY) / 2;

      // Draw curved line
      ctx.strokeStyle = isDark ? '#10b981' : '#10b981';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.setLineDash([5, 5]);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(startX, midY, endX, midY, endX, endY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw dot at connection point
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(endX, endY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Recursively draw child connections
      drawConnections(ctx, child, isDark);
    });
  };

  // Render tree
  const renderTree = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Apply transformations
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Background
    ctx.fillStyle = isDark ? '#0a0a0a' : '#f9fafb';
    ctx.fillRect(-offset.x / scale, -offset.y / scale, rect.width / scale, rect.height / scale);

    if (members.length === 0) {
      ctx.restore();
      return;
    }

    const tree = buildTree(members);
    const layoutTree = tree.map((node) => calculateLayout(node, 0, 100));

    // Center the tree
    if (layoutTree.length > 0) {
      const firstNode = layoutTree[0];
      const treeWidth = getTreeWidth(firstNode);
      const centerOffset = (rect.width / scale - treeWidth) / 2;
      
      layoutTree.forEach((node) => {
        offsetNodeX(node, centerOffset);
      });
    }

    // Draw all connections first
    layoutTree.forEach((node) => {
      drawConnections(ctx, node, isDark);
    });

    // Draw all nodes
    const drawNodeRecursive = (node: CanvasNode) => {
      const isHovered = hoveredNode?.member.id === node.member.id;
      drawNode(ctx, node, isHovered, isDark);
      node.children.forEach(drawNodeRecursive);
    };

    layoutTree.forEach(drawNodeRecursive);

    ctx.restore();
  }, [members, offset, scale, hoveredNode, buildTree, calculateLayout]);

  // Helper functions
  const getTreeWidth = (node: CanvasNode): number => {
    if (node.children.length === 0) {
      return node.width;
    }
    return node.children.reduce((sum, child) => sum + getTreeWidth(child) + HORIZONTAL_SPACING, 0) - HORIZONTAL_SPACING;
  };

  const offsetNodeX = (node: CanvasNode, offset: number) => {
    node.x += offset;
    node.children.forEach((child) => offsetNodeX(child, offset));
  };

  const findNodeAt = (nodes: CanvasNode[], x: number, y: number): CanvasNode | null => {
    for (const node of nodes) {
      if (x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height) {
        return node;
      }
      const childResult = findNodeAt(node.children, x, y);
      if (childResult) return childResult;
    }
    return null;
  };

  // Event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setOffset({ x: offset.x + dx, y: offset.y + dy });
      setDragStart({ x: e.clientX, y: e.clientY });
      return;
    }

    const tree = buildTree(members);
    const layoutTree = tree.map((node) => calculateLayout(node, 0, 100));
    const hoveredNode = findNodeAt(layoutTree, x, y);
    
    setHoveredNode(hoveredNode);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    const tree = buildTree(members);
    const layoutTree = tree.map((node) => calculateLayout(node, 0, 100));
    const clickedNode = findNodeAt(layoutTree, x, y);

    if (clickedNode) {
      setSelectedMember(clickedNode.member);
      setActiveTab('info');
      onMemberClick?.(clickedNode.member);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      canvas.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = hoveredNode ? 'pointer' : 'grab';
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prevScale) => Math.max(0.3, Math.min(3, prevScale * delta)));
  };

  // Effects
  useEffect(() => {
    renderTree();
  }, [renderTree]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(renderTree, 16); // 60fps
    return () => clearInterval(interval);
  }, [renderTree]);

  if (members.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full py-20 text-center"
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Tu árbol está vacío
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
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

  return (
    <div className="relative w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScale((s) => Math.min(3, s * 1.2))}
          className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          title="Zoom In"
        >
          <span className="text-xl">🔍+</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScale((s) => Math.max(0.3, s * 0.8))}
          className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          title="Zoom Out"
        >
          <span className="text-xl">🔍-</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }}
          className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          title="Reset View"
        >
          <span className="text-xl">🎯</span>
        </motion.button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="w-full h-full">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full"
        />
      </div>

      {/* Member Details Modal (reutilizando el modal anterior) */}
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
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 pb-20">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

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
              <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 -mt-12 relative z-10 shadow-sm">
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
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
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
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">🎂</span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300">Nacimiento</span>
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {new Date(selectedMember.birth_date).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            {selectedMember.birth_place && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                📍 {selectedMember.birth_place}
                              </p>
                            )}
                          </div>
                        )}

                        {selectedMember.occupation && (
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">💼</span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300">Ocupación</span>
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium">
                              {selectedMember.occupation}
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
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                    >
                      {selectedMember.bio ? (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {selectedMember.bio}
                        </p>
                      ) : (
                        <div className="text-center py-8">
                          <span className="text-4xl mb-3 block">📝</span>
                          <p className="text-gray-500 dark:text-gray-400">
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
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
                        <span className="text-4xl mb-3 block">👨‍👩‍👧‍👦</span>
                        <p className="text-gray-500 dark:text-gray-400">
                          Las relaciones familiares se mostrarán aquí
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
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
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium border border-gray-300 dark:border-gray-600"
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

