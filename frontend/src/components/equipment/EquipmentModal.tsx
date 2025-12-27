import React, { useState, useEffect } from 'react';
import { Equipment } from './EquipmentManagement';
import { X, Package, MapPin, Calendar, Wrench } from 'lucide-react';

interface EquipmentModalProps {
  equipment: Equipment | null;
  onSave: (equipment: any) => void;
  onClose: () => void;
}

export function EquipmentModal({ equipment, onSave, onClose }: EquipmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    model: '',
    location: '',
    lastService: '',
    nextDue: '',
    status: 'good' as 'good' | 'due' | 'overdue',
    healthScore: 100,
    employee: '',
    department: '',
    serialNumber: '',
    technicianName: '',
    companyName: '',
    usedBy: '',
    maintenanceTeam: '',
    assignDate: '',
    description: '',
    technician: '',
    scrapDate: '',
    workcenter: '',
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name,
        category: equipment.category,
        model: equipment.model,
        location: equipment.location,
        lastService: equipment.lastService,
        nextDue: equipment.nextDue,
        status: equipment.status,
        healthScore: equipment.healthScore,
        employee: equipment.employee || '',
        department: equipment.department || '',
        serialNumber: equipment.serialNumber || '',
        technicianName: equipment.technicianName || '',
        companyName: equipment.companyName || '',
        usedBy: equipment.usedBy || '',
        maintenanceTeam: equipment.maintenanceTeam || '',
        assignDate: equipment.assignDate || '',
        description: equipment.description || '',
        technician: equipment.technician || '',
        scrapDate: equipment.scrapDate || '',
        workcenter: equipment.workcenter || '',
      });
    }
  }, [equipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (equipment) {
      onSave({ ...equipment, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">
                {equipment ? 'Edit Equipment' : 'Add New Equipment'}
              </h2>
              <p className="text-sm text-gray-600">
                {equipment ? 'Update equipment details' : 'Add a new asset to track'}
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
            {/* Equipment Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Equipment Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Forklift #A-203"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="Material Handling">Material Handling</option>
                <option value="Power Equipment">Power Equipment</option>
                <option value="Climate Control">Climate Control</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Air Systems">Air Systems</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-gray-700 mb-2">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="e.g., Toyota 8FGU25"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., Warehouse A"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Last Service */}
            <div>
              <label className="block text-gray-700 mb-2">Last Service Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.lastService}
                  onChange={(e) => handleChange('lastService', e.target.value)}
                  placeholder="e.g., Dec 1, 2025"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Next Due */}
            <div>
              <label className="block text-gray-700 mb-2">Next Service Due</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.nextDue}
                  onChange={(e) => handleChange('nextDue', e.target.value)}
                  placeholder="e.g., Feb 1, 2026"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="good">Good</option>
                <option value="due">Due Soon</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Health Score */}
            <div>
              <label className="block text-gray-700 mb-2">
                Health Score: {formData.healthScore}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.healthScore}
                onChange={(e) => handleChange('healthScore', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Employee */}
            <div>
              <label className="block text-gray-700 mb-2">Employee</label>
              <input
                type="text"
                value={formData.employee}
                onChange={(e) => handleChange('employee', e.target.value)}
                placeholder="Employee assigned"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="Department"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-gray-700 mb-2">Serial Number</label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) => handleChange('serialNumber', e.target.value)}
                placeholder="Serial number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Technician Name */}
            <div>
              <label className="block text-gray-700 mb-2">Technician Name</label>
              <input
                type="text"
                value={formData.technicianName}
                onChange={(e) => handleChange('technicianName', e.target.value)}
                placeholder="Technician name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Used By */}
            <div>
              <label className="block text-gray-700 mb-2">Used By</label>
              <input
                type="text"
                value={formData.usedBy}
                onChange={(e) => handleChange('usedBy', e.target.value)}
                placeholder="Name of employee using it"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Maintenance Team */}
            <div>
              <label className="block text-gray-700 mb-2">Maintenance Team</label>
              <input
                type="text"
                value={formData.maintenanceTeam}
                onChange={(e) => handleChange('maintenanceTeam', e.target.value)}
                placeholder="Maintenance team"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Assign Date */}
            <div>
              <label className="block text-gray-700 mb-2">Assign Date</label>
              <input
                type="text"
                value={formData.assignDate}
                onChange={(e) => handleChange('assignDate', e.target.value)}
                placeholder="Assignment date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Technician */}
            <div>
              <label className="block text-gray-700 mb-2">Technician</label>
              <input
                type="text"
                value={formData.technician}
                onChange={(e) => handleChange('technician', e.target.value)}
                placeholder="Technician name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Scrap Date */}
            <div>
              <label className="block text-gray-700 mb-2">Scrap Date</label>
              <input
                type="text"
                value={formData.scrapDate}
                onChange={(e) => handleChange('scrapDate', e.target.value)}
                placeholder="Scrap date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Workcenter */}
            <div>
              <label className="block text-gray-700 mb-2">Workcenter</label>
              <input
                type="text"
                value={formData.workcenter}
                onChange={(e) => handleChange('workcenter', e.target.value)}
                placeholder="Workcenter name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              {equipment ? 'Update Equipment' : 'Add Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
