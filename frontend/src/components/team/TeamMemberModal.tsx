import React, { useState, useEffect } from 'react';
import { TeamMember } from './TeamManagement';
import { X, User, Mail, Briefcase, Building, Award } from 'lucide-react';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onSave: (member: any) => void;
  onClose: () => void;
}

export function TeamMemberModal({ member, onSave, onClose }: TeamMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Technician',
    department: 'Maintenance',
    status: 'active' as 'active' | 'away' | 'offline',
    tasksCompleted: 0,
    tasksActive: 0,
    specialties: [] as string[],
    joinDate: 'Dec 2025',
    performance: 85,
  });

  const [specialtyInput, setSpecialtyInput] = useState('');

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        role: member.role,
        department: member.department,
        status: member.status,
        tasksCompleted: member.tasksCompleted,
        tasksActive: member.tasksActive,
        specialties: member.specialties,
        joinDate: member.joinDate,
        performance: member.performance,
      });
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (member) {
      onSave({ ...member, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData({ ...formData, specialties: [...formData.specialties, specialtyInput.trim()] });
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData({ ...formData, specialties: formData.specialties.filter(s => s !== specialty) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">
                {member ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
              <p className="text-sm text-gray-600">
                {member ? 'Update member details' : 'Add a new team member'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@gearguard.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 mb-2">Role *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  required
                >
                  <option value="Manager">Manager</option>
                  <option value="Senior Technician">Senior Technician</option>
                  <option value="Technician">Technician</option>
                  <option value="Specialist">Specialist</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 mb-2">Department *</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  required
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Climate Control">Climate Control</option>
                  <option value="Fleet">Fleet</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Performance */}
            <div>
              <label className="block text-gray-700 mb-2">
                Performance: {formData.performance}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.performance}
                onChange={(e) => handleChange('performance', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Specialties */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Specialties</label>
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                    placeholder="e.g., Hydraulics, Electrical"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-4 py-2 bg-[#6366F1] hover:bg-[#5558E3] text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-full flex items-center gap-2"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specialty)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] text-white rounded-lg transition-all"
            >
              {member ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
