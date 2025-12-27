import React from 'react';
import { LayoutDashboard, Wrench, Calendar, Settings, ChevronLeft, ChevronRight, Package, Users, FolderOpen, Kanban, TrendingUp } from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentScreen, onNavigate, isCollapsed, onToggleCollapse }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'kanban', label: 'Task Board', icon: Kanban },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">GearGuard</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center mx-auto">
            <Wrench className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] text-[#6366F1]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute bottom-6 right-0 transform translate-x-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}