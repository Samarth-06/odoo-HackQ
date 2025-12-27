import React, { useState } from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamMemberModal } from './TeamMemberModal';
import { Plus, Users, Award, UserCheck, Filter } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  status: 'active' | 'away' | 'offline';
  tasksCompleted: number;
  tasksActive: number;
  specialties: string[];
  joinDate: string;
  performance: number;
}

export function TeamManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      email: 'mike.j@gearguard.com',
      role: 'Senior Technician',
      department: 'Maintenance',
      status: 'active',
      tasksCompleted: 156,
      tasksActive: 4,
      specialties: ['Hydraulics', 'Electrical', 'Welding'],
      joinDate: 'Jan 2023',
      performance: 95,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.c@gearguard.com',
      role: 'Technician',
      department: 'Maintenance',
      status: 'active',
      tasksCompleted: 142,
      tasksActive: 3,
      specialties: ['HVAC', 'Plumbing', 'Electrical'],
      joinDate: 'Mar 2023',
      performance: 92,
    },
    {
      id: '3',
      name: 'David Lee',
      email: 'david.l@gearguard.com',
      role: 'Specialist',
      department: 'Manufacturing',
      status: 'away',
      tasksCompleted: 98,
      tasksActive: 2,
      specialties: ['CNC', 'Calibration', 'Quality Control'],
      joinDate: 'Jun 2023',
      performance: 88,
    },
    {
      id: '4',
      name: 'Tom Wilson',
      email: 'tom.w@gearguard.com',
      role: 'Technician',
      department: 'Climate Control',
      status: 'active',
      tasksCompleted: 134,
      tasksActive: 5,
      specialties: ['HVAC', 'Refrigeration'],
      joinDate: 'Feb 2023',
      performance: 90,
    },
    {
      id: '5',
      name: 'Emily Rodriguez',
      email: 'emily.r@gearguard.com',
      role: 'Manager',
      department: 'Operations',
      status: 'active',
      tasksCompleted: 87,
      tasksActive: 8,
      specialties: ['Project Management', 'Planning', 'Scheduling'],
      joinDate: 'Jan 2022',
      performance: 97,
    },
    {
      id: '6',
      name: 'James Park',
      email: 'james.p@gearguard.com',
      role: 'Technician',
      department: 'Fleet',
      status: 'offline',
      tasksCompleted: 121,
      tasksActive: 0,
      specialties: ['Automotive', 'Diagnostics'],
      joinDate: 'Aug 2023',
      performance: 85,
    },
  ]);

  const handleAddMember = (newMember: Omit<TeamMember, 'id'>) => {
    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString(),
    };
    setTeamMembers((prev) => [...prev, member]);
    setShowModal(false);
  };

  const handleEditMember = (updatedMember: TeamMember) => {
    setTeamMembers((prev) =>
      prev.map((member) => (member.id === updatedMember.id ? updatedMember : member))
    );
    setEditingMember(null);
    setShowModal(false);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const roles = ['all', 'Manager', 'Senior Technician', 'Technician', 'Specialist'];
  const filteredMembers = filterRole === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.role === filterRole);

  const totalTasks = teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0);
  const activeTasks = teamMembers.reduce((sum, m) => sum + m.tasksActive, 0);
  const avgPerformance = Math.round(
    teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your maintenance team and track performance
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] text-white rounded-lg transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Team Members</span>
            <Users className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-gray-900">{teamMembers.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {teamMembers.filter(m => m.status === 'active').length} active
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Tasks Completed</span>
            <UserCheck className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-gray-900">{totalTasks}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Active Tasks</span>
            <Award className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-gray-900">{activeTasks}</p>
          <p className="text-sm text-gray-500 mt-1">In progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Performance</span>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-gray-900">{avgPerformance}%</p>
          <p className="text-sm text-gray-500 mt-1">Team rating</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter by role:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${
                  filterRole === role
                    ? 'bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] text-[#6366F1] border border-[#C7D2FE]'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onEdit={handleEdit}
            onDelete={handleDeleteMember}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <TeamMemberModal
          member={editingMember}
          onSave={editingMember ? handleEditMember : handleAddMember}
          onClose={() => {
            setShowModal(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}
