import React from 'react';
import { X, AlertTriangle, CheckCircle, Info, Bell } from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const notifications = [
    {
      id: '1',
      type: 'urgent',
      title: 'Maintenance Overdue',
      message: 'Forklift #A-203 oil change is overdue by 2 days',
      time: '10 minutes ago',
      unread: true,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Upcoming Maintenance',
      message: 'Generator B-45 filter replacement due in 3 days',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: '3',
      type: 'success',
      title: 'Maintenance Completed',
      message: 'CNC Machine #5 calibration successfully completed',
      time: '2 hours ago',
      unread: false,
    },
    {
      id: '4',
      type: 'info',
      title: 'New Equipment Added',
      message: 'Compressor D-20 has been added to your inventory',
      time: '5 hours ago',
      unread: false,
    },
    {
      id: '5',
      type: 'warning',
      title: 'Health Score Alert',
      message: 'Compressor C-19 health score dropped to 65%',
      time: '1 day ago',
      unread: false,
    },
    {
      id: '6',
      type: 'success',
      title: 'Schedule Confirmed',
      message: 'HVAC Unit #12 inspection scheduled for Jan 2',
      time: '2 days ago',
      unread: false,
    },
  ];

  const typeConfig = {
    urgent: {
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    warning: {
      icon: Bell,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    success: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    info: {
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  };

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-full md:w-96 bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-600">{notifications.filter(n => n.unread).length} unread</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Actions */}
      <div className="px-6 py-3 border-b border-gray-200 flex gap-2">
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
        <span className="text-gray-300">|</span>
        <button className="text-sm text-gray-600 hover:text-gray-700">
          Clear all
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type as keyof typeof typeConfig];
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                notification.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className={`flex-shrink-0 w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-gray-900">{notification.title}</h4>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
}
