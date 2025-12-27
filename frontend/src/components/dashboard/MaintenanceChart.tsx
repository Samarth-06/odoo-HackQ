import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

export function MaintenanceChart() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const data = [
    { month: 'Jan', maintenance: 12, cost: 2400 },
    { month: 'Feb', maintenance: 15, cost: 2800 },
    { month: 'Mar', maintenance: 10, cost: 2200 },
    { month: 'Apr', maintenance: 18, cost: 3200 },
    { month: 'May', maintenance: 14, cost: 2600 },
    { month: 'Jun', maintenance: 16, cost: 3000 },
    { month: 'Jul', maintenance: 20, cost: 4200 },
    { month: 'Aug', maintenance: 17, cost: 3400 },
    { month: 'Sep', maintenance: 19, cost: 3800 },
    { month: 'Oct', maintenance: 22, cost: 4500 },
    { month: 'Nov', maintenance: 18, cost: 3600 },
    { month: 'Dec', maintenance: 21, cost: 4280 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Maintenance Overview</h3>
          <p className="text-gray-600 text-sm">Monthly maintenance frequency and costs</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'line' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'bar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'line' ? (
          <LineChart data={data}>
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
              dataKey="maintenance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Maintenance Tasks"
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              name="Cost ($)"
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
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
            <Bar dataKey="maintenance" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Maintenance Tasks" />
            <Bar dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} name="Cost ($)" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
