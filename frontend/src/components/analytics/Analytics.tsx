import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Clock, Zap, Award, AlertTriangle } from 'lucide-react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');

  const costData = [
    { month: 'Jul', maintenance: 3200, parts: 1800, labor: 2400 },
    { month: 'Aug', maintenance: 3400, parts: 1600, labor: 2600 },
    { month: 'Sep', maintenance: 3800, parts: 2200, labor: 2800 },
    { month: 'Oct', maintenance: 4500, parts: 2600, labor: 3200 },
    { month: 'Nov', maintenance: 3600, parts: 2000, labor: 2800 },
    { month: 'Dec', maintenance: 4280, parts: 2400, labor: 3100 },
  ];

  const categoryDistribution = [
    { name: 'Manufacturing', value: 680000, color: '#EF4444' },
    { name: 'Vehicles', value: 425000, color: '#10B981' },
    { name: 'Climate Control', value: 210000, color: '#3B82F6' },
    { name: 'IT Infrastructure', value: 185000, color: '#14B8A6' },
    { name: 'Material Handling', value: 145000, color: '#6366F1' },
    { name: 'Safety Equipment', value: 125000, color: '#EC4899' },
  ];

  const efficiencyData = [
    { month: 'Jul', completion: 88, uptime: 95 },
    { month: 'Aug', completion: 90, uptime: 94 },
    { month: 'Sep', completion: 85, uptime: 92 },
    { month: 'Oct', completion: 92, uptime: 96 },
    { month: 'Nov', completion: 89, uptime: 93 },
    { month: 'Dec', completion: 94, uptime: 97 },
  ];

  const topEquipment = [
    { name: 'CNC Machine #5', cost: 12400, tasks: 24, efficiency: 95 },
    { name: 'Forklift #A-203', cost: 8200, tasks: 18, efficiency: 88 },
    { name: 'Generator B-45', cost: 7800, tasks: 16, efficiency: 92 },
    { name: 'HVAC Unit #12', cost: 9600, tasks: 20, efficiency: 85 },
    { name: 'Compressor C-19', cost: 11200, tasks: 22, efficiency: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">
            Track performance, costs, and efficiency metrics
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-white text-opacity-80 mb-1">Total Savings</p>
          <p className="text-3xl mb-2">$48.2K</p>
          <p className="text-sm text-white text-opacity-70">↑ 12% vs last period</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-2xl">⏱️</span>
          </div>
          <p className="text-gray-600 mb-1">Avg Response Time</p>
          <p className="text-3xl text-gray-900 mb-2">2.3h</p>
          <p className="text-sm text-green-600">↓ 15% improvement</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-[#10B981]" />
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-gray-600 mb-1">Equipment Uptime</p>
          <p className="text-3xl text-gray-900 mb-2">96.8%</p>
          <p className="text-sm text-green-600">↑ 2.4% this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-[#8B5CF6]" />
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-gray-600 mb-1">Task Completion</p>
          <p className="text-3xl text-gray-900 mb-2">94%</p>
          <p className="text-sm text-green-600">On-time delivery</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="maintenance" fill="#6366F1" radius={[8, 8, 0, 0]} name="Maintenance" />
              <Bar dataKey="parts" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Parts" />
              <Bar dataKey="labor" fill="#A78BFA" radius={[8, 8, 0, 0]} name="Labor" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Equipment Value by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Efficiency Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="completion"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5 }}
                name="Task Completion %"
              />
              <Line
                type="monotone"
                dataKey="uptime"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: '#6366F1', r: 5 }}
                name="Equipment Uptime %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Equipment by Maintenance Cost */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Top Equipment by Maintenance Cost</h3>
          <div className="space-y-4">
            {topEquipment.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-900">{item.name}</span>
                    <span className="text-gray-700">${item.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{item.tasks} tasks</span>
                    <span>•</span>
                    <span className={item.efficiency >= 90 ? 'text-green-600' : item.efficiency >= 80 ? 'text-blue-600' : 'text-orange-600'}>
                      {item.efficiency}% efficiency
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] rounded-xl p-6 border border-[#C7D2FE]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2">🤖 AI-Powered Insights</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 mb-1">Predictive Maintenance Alert</p>
                    <p className="text-sm text-gray-600">
                      Compressor C-19 shows signs of early wear. Schedule inspection within 2 weeks to prevent costly downtime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 mb-1">Cost Optimization</p>
                    <p className="text-sm text-gray-600">
                      Switching to preventive maintenance for HVAC systems could save $3,200 annually based on current patterns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 mb-1">Team Performance</p>
                    <p className="text-sm text-gray-600">
                      Mike Johnson is 23% more efficient than average. Consider assigning him to high-priority tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
