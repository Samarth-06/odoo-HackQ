import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings } from 'lucide-react';

interface TopNavProps {
  onNotificationClick: () => void;
  onLogout: () => void;
  showNotifications: boolean;
}

export function TopNav({ onNotificationClick, onLogout, showNotifications }: TopNavProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search equipment, maintenance records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <button
          onClick={onNotificationClick}
          className={`relative p-2 rounded-lg transition-colors ${
            showNotifications ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <hr className="my-2 border-gray-200" />
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
