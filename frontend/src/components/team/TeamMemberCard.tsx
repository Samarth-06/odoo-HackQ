import React from 'react';
import { TeamMember } from './TeamManagement';
import { Mail, Award, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

export function TeamMemberCard({ member, onEdit, onDelete }: TeamMemberCardProps) {
  const statusConfig = {
    active: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-100',
      label: 'Active',
    },
    away: {
      icon: Circle,
      color: 'text-orange-500',
      bg: 'bg-orange-100',
      label: 'Away',
    },
    offline: {
      icon: Circle,
      color: 'text-gray-400',
      bg: 'bg-gray-100',
      label: 'Offline',
    },
  };

  const config = statusConfig[member.status];
  const StatusIcon = config.icon;

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-white">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        </div>
        <div className={`p-1 rounded-full ${config.bg}`}>
          <StatusIcon className={`w-4 h-4 ${config.color}`} />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Award className="w-4 h-4" />
          <span>{member.department}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 mb-1">Completed</p>
          <p className="text-gray-900">{member.tasksCompleted}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Active</p>
          <p className="text-gray-900">{member.tasksActive}</p>
        </div>
      </div>

      {/* Performance */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Performance</span>
          <span className={`text-sm ${getPerformanceColor(member.performance)}`}>
            {member.performance}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              member.performance >= 90
                ? 'bg-green-500'
                : member.performance >= 75
                ? 'bg-blue-500'
                : member.performance >= 60
                ? 'bg-orange-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${member.performance}%` }}
          ></div>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Specialties</p>
        <div className="flex flex-wrap gap-2">
          {member.specialties.slice(0, 3).map((specialty, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(member)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-[#6366F1] hover:bg-[#EEF2FF] rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  );
}
