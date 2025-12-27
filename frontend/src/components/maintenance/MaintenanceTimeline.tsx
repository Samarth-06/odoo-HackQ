import React from 'react';
import { MaintenanceRecord } from './MaintenanceDetails';
import { CheckCircle, Clock, Wrench, DollarSign, User } from 'lucide-react';

interface MaintenanceTimelineProps {
  records: MaintenanceRecord[];
}

export function MaintenanceTimeline({ records }: MaintenanceTimelineProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      label: 'Completed',
    },
    scheduled: {
      icon: Clock,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      label: 'Scheduled',
    },
    'in-progress': {
      icon: Wrench,
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      label: 'In Progress',
    },
  };

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-gray-900 mb-2">No maintenance records</h3>
        <p className="text-gray-600 mb-4">
          Start tracking maintenance by adding your first record
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-gray-900 mb-6">Timeline</h3>
      
      <div className="space-y-6">
        {records.map((record, index) => {
          const config = statusConfig[record.status];
          const StatusIcon = config.icon;

          return (
            <div key={record.id} className="relative">
              {/* Timeline Line */}
              {index !== records.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200"></div>
              )}

              {/* Card */}
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 ${config.color} rounded-full flex items-center justify-center z-10`}>
                  <StatusIcon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900">{record.equipmentName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${config.bgColor} ${config.textColor}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-gray-700">{record.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-lg border border-gray-200">
                        <DollarSign className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-900">{record.cost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>Technician: {record.technician}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Wrench className="w-4 h-4" />
                      <span>{record.category}</span>
                    </div>
                  </div>

                  {record.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-700">Notes:</span> {record.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
