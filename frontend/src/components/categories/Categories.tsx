import React, { useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './CategoryModal';
import { Plus, FolderOpen, Package } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  equipmentCount: number;
  totalCost: number;
  lastUpdated: string;
  responsible: string;
  companyName: string;
}

export function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Material Handling',
      description: 'Forklifts, pallet jacks, and material transport equipment',
      color: '#6366F1',
      icon: '🏗️',
      equipmentCount: 12,
      totalCost: 145000,
      lastUpdated: 'Dec 20, 2025',
      responsible: 'John Smith',
      companyName: 'Logistics Corp',
    },
    {
      id: '2',
      name: 'Power Equipment',
      description: 'Generators, transformers, and power distribution systems',
      color: '#F59E0B',
      icon: '⚡',
      equipmentCount: 8,
      totalCost: 89000,
      lastUpdated: 'Dec 18, 2025',
      responsible: 'Sarah Johnson',
      companyName: 'PowerTech Solutions',
    },
    {
      id: '3',
      name: 'Climate Control',
      description: 'HVAC systems, refrigeration, and temperature control',
      color: '#3B82F6',
      icon: '❄️',
      equipmentCount: 15,
      totalCost: 210000,
      lastUpdated: 'Dec 22, 2025',
      responsible: 'Michael Davis',
      companyName: 'Climate Systems Inc',
    },
    {
      id: '4',
      name: 'Vehicles',
      description: 'Company fleet, trucks, and transportation vehicles',
      color: '#10B981',
      icon: '🚗',
      equipmentCount: 18,
      totalCost: 425000,
      lastUpdated: 'Dec 25, 2025',
      responsible: 'Emily Wilson',
      companyName: 'Fleet Management Co',
    },
    {
      id: '5',
      name: 'Air Systems',
      description: 'Compressors, pneumatic tools, and air handling equipment',
      color: '#8B5CF6',
      icon: '💨',
      equipmentCount: 10,
      totalCost: 95000,
      lastUpdated: 'Dec 15, 2025',
      responsible: 'David Martinez',
      companyName: 'Industrial Air Ltd',
    },
    {
      id: '6',
      name: 'Manufacturing',
      description: 'CNC machines, lathes, mills, and production equipment',
      color: '#EF4444',
      icon: '🏭',
      equipmentCount: 22,
      totalCost: 680000,
      lastUpdated: 'Dec 26, 2025',
      responsible: 'Jessica Brown',
      companyName: 'Production Systems',
    },
    {
      id: '7',
      name: 'Safety Equipment',
      description: 'Fire systems, alarms, and safety monitoring devices',
      color: '#EC4899',
      icon: '🚨',
      equipmentCount: 35,
      totalCost: 125000,
      lastUpdated: 'Dec 10, 2025',
      responsible: 'Robert Chen',
      companyName: 'SafeGuard Inc',
    },
    {
      id: '8',
      name: 'IT Infrastructure',
      description: 'Servers, networking equipment, and computer systems',
      color: '#14B8A6',
      icon: '💻',
      equipmentCount: 42,
      totalCost: 185000,
      lastUpdated: 'Dec 24, 2025',
      responsible: 'Amanda Taylor',
      companyName: 'TechSystems Corp',
    },
  ]);

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const category: Category = {
      ...newCategory,
      id: Date.now().toString(),
    };
    setCategories((prev) => [...prev, category]);
    setShowModal(false);
  };

  const handleEditCategory = (updatedCategory: Category) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
    setEditingCategory(null);
    setShowModal(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const totalEquipment = categories.reduce((sum, cat) => sum + cat.equipmentCount, 0);
  const totalValue = categories.reduce((sum, cat) => sum + cat.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Equipment Categories</h1>
          <p className="text-gray-600 mt-1">
            Organize and manage your equipment by categories
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] text-white rounded-lg transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Categories</span>
            <FolderOpen className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-gray-900">{categories.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active categories</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Equipment</span>
            <Package className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-gray-900">{totalEquipment}</p>
          <p className="text-sm text-gray-500 mt-1">Across all categories</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Value</span>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-gray-900">${(totalValue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500 mt-1">Asset valuation</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <CategoryModal
          category={editingCategory}
          onSave={editingCategory ? handleEditCategory : handleAddCategory}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}
