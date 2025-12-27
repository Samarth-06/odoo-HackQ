import React from 'react';
import { Category } from './Categories';
import { Edit2, Trash2, Package, DollarSign, User, Building2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl"
        style={{ backgroundColor: `${category.color}20` }}
      >
        {category.icon}
      </div>

      {/* Name */}
      <h3 className="text-gray-900 mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
        {category.description}
      </p>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span>Equipment</span>
          </div>
          <span className="text-gray-900">{category.equipmentCount}</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>Value</span>
          </div>
          <span className="text-gray-900">${(category.totalCost / 1000).toFixed(0)}K</span>
        </div>

        {category.responsible && (
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Responsible</span>
            </div>
            <span className="text-gray-900 text-sm truncate max-w-[100px]">{category.responsible}</span>
          </div>
        )}

        {category.companyName && (
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>Company</span>
            </div>
            <span className="text-gray-900 text-sm truncate max-w-[100px]">{category.companyName}</span>
          </div>
        )}
      </div>

      {/* Last Updated */}
      <p className="text-xs text-gray-500 mb-4">Updated {category.lastUpdated}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(category)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
          style={{ color: category.color }}
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
