import React from 'react';
import { Plus, Calendar, FileText } from 'lucide-react';

interface QuickActionsProps {
  onAddEquipment: () => void;
}

export function QuickActions({ onAddEquipment }: QuickActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onAddEquipment}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add Equipment
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
        <Calendar className="w-4 h-4" />
        Schedule
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
        <FileText className="w-4 h-4" />
        Report
      </button>
    </div>
  );
}
