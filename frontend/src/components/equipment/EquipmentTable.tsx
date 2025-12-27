import React from 'react';
import { Equipment } from './EquipmentManagement';
import { Edit2, Trash2, MapPin, Award } from 'lucide-react';

interface EquipmentTableProps {
  equipment: Equipment[];
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: string) => void;
}

export function EquipmentTable({ equipment, onEdit, onDelete }: EquipmentTableProps) {
  const statusConfig = {
    good: {
      label: 'Good',
      color: 'bg-green-100 text-green-700',
    },
    due: {
      label: 'Due Soon',
      color: 'bg-orange-100 text-orange-700',
    },
    overdue: {
      label: 'Overdue',
      color: 'bg-red-100 text-red-700',
    },
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  if (equipment.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-gray-900 mb-2">No equipment found</h3>
        <p className="text-gray-600 mb-4">
          Get started by adding your first piece of equipment
        </p>
        <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          Add Equipment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">Equipment</th>
              <th className="px-6 py-4 text-left text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-gray-700">Employee</th>
              <th className="px-6 py-4 text-left text-gray-700">Department</th>
              <th className="px-6 py-4 text-left text-gray-700">Serial Number</th>
              <th className="px-6 py-4 text-left text-gray-700">Technical Name</th>
              <th className="px-6 py-4 text-left text-gray-700">Location</th>
              <th className="px-6 py-4 text-left text-gray-700">Last Service</th>
              <th className="px-6 py-4 text-left text-gray-700">Next Due</th>
              <th className="px-6 py-4 text-left text-gray-700">Health Score</th>
              <th className="px-6 py-4 text-left text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {equipment.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.model}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{item.category}</td>
                <td className="px-6 py-4 text-gray-700">{item.employee || '-'}</td>
                <td className="px-6 py-4 text-gray-700">{item.department || '-'}</td>
                <td className="px-6 py-4 text-gray-700">{item.serialNumber || '-'}</td>
                <td className="px-6 py-4 text-gray-700">{item.technicianName || '-'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {item.location}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{item.lastService}</td>
                <td className="px-6 py-4 text-gray-700">{item.nextDue}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                      <div
                        className={`h-2 rounded-full ${
                          item.healthScore >= 90
                            ? 'bg-green-500'
                            : item.healthScore >= 75
                            ? 'bg-blue-500'
                            : item.healthScore >= 60
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${item.healthScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm ${getHealthScoreColor(item.healthScore)}`}>
                      {item.healthScore}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm ${
                      statusConfig[item.status].color
                    }`}
                  >
                    {statusConfig[item.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
