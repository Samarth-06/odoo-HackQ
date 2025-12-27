import React from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function UpcomingMaintenance() {
  const upcomingTasks = [
    {
      equipment: 'Forklift #A-203',
      task: 'Oil Change',
      dueDate: 'Dec 28, 2025',
      status: 'urgent',
      daysLeft: 1,
    },
    {
      equipment: 'Generator B-45',
      task: 'Filter Replacement',
      dueDate: 'Dec 30, 2025',
      status: 'upcoming',
      daysLeft: 3,
    },
    {
      equipment: 'HVAC Unit #12',
      task: 'Quarterly Inspection',
      dueDate: 'Jan 2, 2026',
      status: 'upcoming',
      daysLeft: 6,
    },
    {
      equipment: 'Truck Fleet #7',
      task: 'Tire Rotation',
      dueDate: 'Jan 5, 2026',
      status: 'scheduled',
      daysLeft: 9,
    },
    {
      equipment: 'Compressor C-19',
      task: 'Pressure Check',
      dueDate: 'Jan 8, 2026',
      status: 'scheduled',
      daysLeft: 12,
    },
  ];

  const statusConfig = {
    urgent: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      label: 'Urgent',
    },
    upcoming: {
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      label: 'Soon',
    },
    scheduled: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      label: 'Scheduled',
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Upcoming Maintenance</h3>
          <p className="text-gray-600 text-sm">Next 30 days</p>
        </div>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {upcomingTasks.map((task, index) => {
          const config = statusConfig[task.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{task.equipment}</p>
                  <p className="text-gray-600 text-sm mt-1">{task.task}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${config.bg}`}>
                    <StatusIcon className={`w-3 h-3 ${config.color}`} />
                    <span className={`text-xs ${config.color}`}>{config.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{task.daysLeft}d left</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        View all tasks
      </button>
    </div>
  );
}
