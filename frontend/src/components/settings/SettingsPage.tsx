import React, { useState } from 'react';
import { User, Bell, Shield, Moon, Sun, LogOut, Save, Mail, Building } from 'lucide-react';

interface SettingsPageProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLogout: () => void;
}

export function SettingsPage({ theme, onThemeChange, onLogout }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Corporation',
    role: 'Admin',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    maintenanceReminders: true,
    overdueAlerts: true,
    weeklyReport: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? Moon : Sun },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Profile Information</h3>
                  <p className="text-gray-600 text-sm">Update your personal information</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Notification Preferences</h3>
                  <p className="text-gray-600 text-sm">Choose what notifications you receive</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'maintenanceReminders', label: 'Maintenance Reminders', desc: 'Get reminders for upcoming maintenance' },
                    { key: 'overdueAlerts', label: 'Overdue Alerts', desc: 'Alert when maintenance is overdue' },
                    { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive weekly summary reports' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div>
                        <div className="text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [item.key]: e.target.checked })
                        }
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>
                  ))}
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Security Settings</h3>
                  <p className="text-gray-600 text-sm">Manage your password and security</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <Shield className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Appearance</h3>
                  <p className="text-gray-600 text-sm">Customize how GearGuard looks</p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-4">Theme</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => onThemeChange('light')}
                      className={`p-6 border-2 rounded-lg transition-all ${
                        theme === 'light'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun className={`w-8 h-8 mx-auto mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-gray-600'}`} />
                      <div className="text-gray-900">Light</div>
                      <div className="text-sm text-gray-600">Default theme</div>
                    </button>

                    <button
                      onClick={() => onThemeChange('dark')}
                      className={`p-6 border-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-blue-600' : 'text-gray-600'}`} />
                      <div className="text-gray-900">Dark</div>
                      <div className="text-sm text-gray-600">Coming soon</div>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    More customization options coming soon, including custom color schemes and layout preferences.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <h3 className="text-red-600 mb-2">Danger Zone</h3>
            <p className="text-gray-600 text-sm mb-4">
              Irreversible actions that affect your account
            </p>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
