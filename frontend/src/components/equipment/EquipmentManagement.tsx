import React, { useState } from 'react';
import { EquipmentTable } from './EquipmentTable';
import { EquipmentModal } from './EquipmentModal';
import { Plus, Download, Filter } from 'lucide-react';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  lastService: string;
  nextDue: string;
  status: 'good' | 'due' | 'overdue';
  healthScore: number;
  location: string;
  model: string;
  employee: string;
  department: string;
  serialNumber: string;
  technicianName: string;
  companyName: string;
  usedBy: string;
  maintenanceTeam: string;
  assignDate: string;
  description: string;
  technician: string;
  scrapDate: string;
  workcenter: string;
}

export function EquipmentManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Forklift #A-203',
      category: 'Material Handling',
      lastService: 'Nov 15, 2025',
      nextDue: 'Dec 28, 2025',
      status: 'due',
      healthScore: 85,
      location: 'Warehouse A',
      model: 'Toyota 8FGU25',
      employee: 'John Smith',
      department: 'Logistics',
      serialNumber: 'TYT-8FGU-2025-A203',
      technicianName: 'Mike Johnson',
      companyName: '',
      usedBy: '',
      maintenanceTeam: '',
      assignDate: '',
      description: '',
      technician: '',
      scrapDate: '',
      workcenter: '',
    },
    {
      id: '2',
      name: 'Generator B-45',
      category: 'Power Equipment',
      lastService: 'Oct 12, 2025',
      nextDue: 'Dec 30, 2025',
      status: 'good',
      healthScore: 92,
      location: 'Building 3',
      model: 'Caterpillar C9',
      employee: 'Sarah Davis',
      department: 'Facilities',
      serialNumber: 'CAT-C9-2024-B045',
      technicianName: 'Robert Chen',
      companyName: '',
      usedBy: '',
      maintenanceTeam: '',
      assignDate: '',
      description: '',
      technician: '',
      scrapDate: '',
      workcenter: '',
    },
    {
      id: '3',
      name: 'HVAC Unit #12',
      category: 'Climate Control',
      lastService: 'Sep 20, 2025',
      nextDue: 'Jan 2, 2026',
      status: 'good',
      healthScore: 88,
      location: 'Office Floor 2',
      model: 'Carrier 50VE',
      employee: 'Emily Wilson',
      department: 'Facilities',
      serialNumber: 'CAR-50VE-2023-012',
      technicianName: 'David Martinez',
      companyName: '',
      usedBy: '',
      maintenanceTeam: '',
      assignDate: '',
      description: '',
      technician: '',
      scrapDate: '',
      workcenter: '',
    },
    {
      id: '4',
      name: 'Truck Fleet #7',
      category: 'Vehicles',
      lastService: 'Nov 28, 2025',
      nextDue: 'Jan 5, 2026',
      status: 'good',
      healthScore: 78,
      location: 'Parking Lot B',
      model: 'Ford F-150',
      employee: 'James Brown',
      department: 'Transportation',
      serialNumber: 'FRD-F150-2022-007',
      technicianName: 'Lisa Anderson',
      companyName: '',
      usedBy: '',
      maintenanceTeam: '',
      assignDate: '',
      description: '',
      technician: '',
      scrapDate: '',
      workcenter: '',
    },
    {
      id: '5',
      name: 'Compressor C-19',
      category: 'Air Systems',
      lastService: 'Aug 10, 2025',
      nextDue: 'Dec 15, 2025',
      status: 'overdue',
      healthScore: 65,
      location: 'Factory Floor',
      model: 'Atlas Copco GA22',
      employee: 'Michael Garcia',
      department: 'Production',
      serialNumber: 'ATC-GA22-2021-C019',
      technicianName: 'Kevin White',
      companyName: '',
      usedBy: '',
      maintenanceTeam: '',
      assignDate: '',
      description: '',
      technician: '',
      scrapDate: '',
      workcenter: '',
    },
    {
      id: '6',
      name: 'CNC Machine #5',
      category: 'Manufacturing',
      lastService: 'Dec 1, 2025',
      nextDue: 'Feb 1, 2026',
      status: 'good',
      healthScore: 95,
      location: 'Shop Floor',
      model: 'Haas VF-2',
      employee: 'Amanda Taylor',
      department: 'Manufacturing',
      serialNumber: 'HAS-VF2-2023-005',
      technicianName: 'Thomas Lee',
      companyName: '',
      usedBy: '',
      maintenanceTeam: '',
      assignDate: '',
      description: '',
      technician: '',
      scrapDate: '',
      workcenter: '',
    },
  ]);

  const handleAddEquipment = (newEquipment: Omit<Equipment, 'id'>) => {
    const equipment: Equipment = {
      ...newEquipment,
      id: Date.now().toString(),
    };
    setEquipment((prev) => [...prev, equipment]);
    setShowModal(false);
  };

  const handleEditEquipment = (updatedEquipment: Equipment) => {
    setEquipment((prev) =>
      prev.map((eq) => (eq.id === updatedEquipment.id ? updatedEquipment : eq))
    );
    setEditingEquipment(null);
    setShowModal(false);
  };

  const handleDeleteEquipment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipment((prev) => prev.filter((eq) => eq.id !== id));
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setShowModal(true);
  };

  const filteredEquipment = filterStatus === 'all' 
    ? equipment 
    : equipment.filter(eq => eq.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Equipment Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your equipment and assets
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => {
              setEditingEquipment(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Equipment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter by status:</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All', count: equipment.length },
              { value: 'good', label: 'Good', count: equipment.filter(e => e.status === 'good').length },
              { value: 'due', label: 'Due Soon', count: equipment.filter(e => e.status === 'due').length },
              { value: 'overdue', label: 'Overdue', count: equipment.filter(e => e.status === 'overdue').length },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === filter.value
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <EquipmentTable
        equipment={filteredEquipment}
        onEdit={handleEdit}
        onDelete={handleDeleteEquipment}
      />

      {/* Modal */}
      {showModal && (
        <EquipmentModal
          equipment={editingEquipment}
          onSave={editingEquipment ? handleEditEquipment : handleAddEquipment}
          onClose={() => {
            setShowModal(false);
            setEditingEquipment(null);
          }}
        />
      )}
    </div>
  );
}
