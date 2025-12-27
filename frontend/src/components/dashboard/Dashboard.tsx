import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { MaintenanceChart } from './MaintenanceChart';
import { UpcomingMaintenance } from './UpcomingMaintenance';
import { QuickActions } from './QuickActions';
import { Package, Wrench, AlertTriangle, DollarSign } from 'lucide-react';

export function Dashboard() {
  const [showAddEquipment, setShowAddEquipment] = useState(false);

  const stats = [
    {
      title: 'Total Assets',
      value: '42',
      change: '+3 this month',
      trend: 'up' as const,
      icon: Package,
      color: 'blue' as const,
    },
    {
      title: 'Upcoming Maintenance',
      value: '8',
      change: 'Next 30 days',
      trend: 'neutral' as const,
      icon: Wrench,
      color: 'green' as const,
    },
    {
      title: 'Overdue Tasks',
      value: '3',
      change: 'Needs attention',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: 'red' as const,
    },
    {
      title: 'Monthly Cost',
      value: '$4,280',
      change: '+12% vs last month',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'purple' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your equipment.</p>
        </div>
        <QuickActions onAddEquipment={() => setShowAddEquipment(true)} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MaintenanceChart />
        </div>
        <div>
          <UpcomingMaintenance />
        </div>
      </div>
    </div>
  );
}
