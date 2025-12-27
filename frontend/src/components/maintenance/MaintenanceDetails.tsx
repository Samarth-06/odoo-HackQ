import React, { useState } from 'react';
import { MaintenanceTimeline } from './MaintenanceTimeline';
import { MaintenanceModal } from './MaintenanceModal';
import { Plus, Filter, Calendar } from 'lucide-react';

export interface MaintenanceRecord {
  id: string;
  equipmentName: string;
  date: string;
  description: string;
  cost: number;
  technician: string;
  notes: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  category: string;
  maintenanceType?: 'Corrective' | 'Preventive';
  duration?: string;
  priority?: 'Low' | 'Medium' | 'High';
  companyName?: string;
  timestamp?: string;
  createdBy?: string;
}

export function MaintenanceDetails() {
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [records, setRecords] = useState<MaintenanceRecord[]>([
    {
      id: '1',
      equipmentName: 'Forklift #A-203',
      date: 'Dec 15, 2025',
      description: 'Oil change and filter replacement',
      cost: 245,
      technician: 'Mike Johnson',
      notes: 'All fluids checked and topped off. No issues found.',
      status: 'completed',
      category: 'Routine Maintenance',
      maintenanceType: 'Preventive',
      duration: '2h',
      priority: 'Low',
      companyName: 'ACME Logistics',
      timestamp: 'Dec 15, 2025 09:30 AM',
      createdBy: 'admin',
    },
    {
      id: '2',
      equipmentName: 'Generator B-45',
      date: 'Dec 12, 2025',
      description: 'Quarterly inspection',
      cost: 180,
      technician: 'Sarah Chen',
      notes: 'Generator running smoothly. Battery voltage normal.',
      status: 'completed',
      category: 'Inspection',
      maintenanceType: 'Preventive',
      duration: '1.5h',
      priority: 'Medium',
      companyName: 'PowerServ Inc',
      timestamp: 'Dec 12, 2025 02:15 PM',
      createdBy: 's.chen',
    },
    {
      id: '3',
      equipmentName: 'HVAC Unit #12',
      date: 'Dec 28, 2025',
      description: 'Filter replacement scheduled',
      cost: 320,
      technician: 'Tom Wilson',
      notes: 'Scheduled maintenance. Parts ordered.',
      status: 'scheduled',
      category: 'Routine Maintenance',
      maintenanceType: 'Preventive',
      duration: '3h',
      priority: 'Low',
      companyName: 'Climate Solutions',
      timestamp: 'Dec 28, 2025 08:00 AM',
      createdBy: 't.wilson',
    },
    {
      id: '4',
      equipmentName: 'Compressor C-19',
      date: 'Dec 10, 2025',
      description: 'Emergency repair - pressure issue',
      cost: 890,
      technician: 'Mike Johnson',
      notes: 'Replaced pressure valve and seal. Tested under load.',
      status: 'completed',
      category: 'Repair',
      maintenanceType: 'Corrective',
      duration: '4h',
      priority: 'High',
      companyName: 'Rapid Repairs LLC',
      timestamp: 'Dec 10, 2025 11:45 AM',
      createdBy: 'm.johnson',
    },
    {
      id: '5',
      equipmentName: 'CNC Machine #5',
      date: 'Dec 1, 2025',
      description: 'Calibration and lubrication',
      cost: 420,
      technician: 'David Lee',
      notes: 'Machine calibrated to spec. Precision verified.',
      status: 'completed',
      category: 'Calibration',
      maintenanceType: 'Preventive',
      duration: '2.5h',
      priority: 'Medium',
      companyName: 'Precision Works',
      timestamp: 'Dec 1, 2025 04:20 PM',
      createdBy: 'd.lee',
    },
    {
      id: '6',
      equipmentName: 'Truck Fleet #7',
      date: 'Dec 27, 2025',
      description: 'Tire rotation in progress',
      cost: 150,
      technician: 'Sarah Chen',
      notes: 'Rotating tires and checking brake pads.',
      status: 'in-progress',
      category: 'Routine Maintenance',
      maintenanceType: 'Preventive',
      duration: '1h',
      priority: 'Low',
      companyName: 'FleetCare',
      timestamp: 'Dec 27, 2025 10:00 AM',
      createdBy: 's.chen',
    },
  ]);

  const handleAddRecord = (newRecord: Omit<MaintenanceRecord, 'id'>) => {
    const record: MaintenanceRecord = {
      ...newRecord,
      id: Date.now().toString(),
    };
    setRecords((prev) => [record, ...prev]);
    setShowModal(false);
  };

  const categories = ['all', 'Routine Maintenance', 'Inspection', 'Repair', 'Calibration'];
  
  const filteredRecords = filterCategory === 'all'
    ? records
    : records.filter(record => record.category === filterCategory);

  const totalCost = records
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.cost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Maintenance History</h1>
          <p className="text-gray-600 mt-1">
            Track all maintenance activities and service records
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Maintance request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Records</span>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-gray-900">{records.length}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Cost</span>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-gray-900">${totalCost.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Completed tasks</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Cost</span>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-gray-900">
            ${Math.round(totalCost / records.filter(r => r.status === 'completed').length).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">Per task</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter by category:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  filterCategory === category
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <MaintenanceTimeline records={filteredRecords} />

      {/* Modal */}
      {showModal && (
        <MaintenanceModal
          onSave={handleAddRecord}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
