import React, { useState } from 'react';
import { X, Wrench, DollarSign, User, FileText } from 'lucide-react';
import { MaintenanceRecord } from './MaintenanceDetails';

interface MaintenanceModalProps {
  onSave: (record: Omit<MaintenanceRecord, 'id'>) => void;
  onClose: () => void;
}

export function MaintenanceModal({ onSave, onClose }: MaintenanceModalProps) {
  const [formData, setFormData] = useState({
    equipmentName: '',
    date: '',
    description: '',
    cost: 0,
    technician: '',
    notes: '',
    status: 'completed' as 'completed' | 'scheduled' | 'in-progress',
    category: 'Routine Maintenance',
    maintenanceType: 'Preventive' as 'Corrective' | 'Preventive',
    duration: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    companyName: '',
    createdBy: '',
    timestamp: new Date().toLocaleString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ensure timestamp is current when submitting
    const payload = { ...formData, timestamp: new Date().toLocaleString() };
    onSave(payload);
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
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Add Maintenance Record</h2>
              <p className="text-sm text-gray-600">Log a new maintenance activity</p>
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
                value={formData.equipmentName}
                onChange={(e) => handleChange('equipmentName', e.target.value)}
                placeholder="e.g., Forklift #A-203"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 mb-2">Service Date *</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder="e.g., Dec 27, 2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="scheduled">Scheduled</option>
              </select>
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
                <option value="Routine Maintenance">Routine Maintenance</option>
                <option value="Inspection">Inspection</option>
                <option value="Repair">Repair</option>
                <option value="Calibration">Calibration</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            {/* Maintenance Type */}
            <div>
              <label className="block text-gray-700 mb-2">Maintenance Type *</label>
              <select
                value={formData.maintenanceType}
                onChange={(e) => handleChange('maintenanceType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Corrective">Corrective</option>
                <option value="Preventive">Preventive</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 2h, 30m"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Company Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="e.g., ACME Corp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Cost */}
            <div>
              <label className="block text-gray-700 mb-2">Cost ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the maintenance work performed..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Technician */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Technician</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.technician}
                  onChange={(e) => handleChange('technician', e.target.value)}
                  placeholder="e.g., Mike Johnson"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Created By */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Created By</label>
              <input
                type="text"
                value={formData.createdBy}
                onChange={(e) => handleChange('createdBy', e.target.value)}
                placeholder="e.g., Admin User"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Timestamp (read-only) */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Timestamp</label>
              <input
                type="text"
                value={formData.timestamp}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Any additional information or observations..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
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
              Maintance request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
