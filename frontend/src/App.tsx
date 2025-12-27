import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { Dashboard } from './components/dashboard/Dashboard';
import { EquipmentManagement } from './components/equipment/EquipmentManagement';
import { MaintenanceDetails } from './components/maintenance/MaintenanceDetails';
import { CalendarView } from './components/calendar/CalendarView';
import { NotificationsPanel } from './components/notifications/NotificationsPanel';
import { SettingsPage } from './components/settings/SettingsPage';
import { TeamManagement } from './components/team/TeamManagement';
import { Categories } from './components/categories/Categories';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { Analytics } from './components/analytics/Analytics';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
    setShowNotifications(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#DDD6FE]">
        {currentScreen === 'login' ? (
          <LoginScreen 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setCurrentScreen('register')} 
          />
        ) : (
          <RegisterScreen 
            onRegister={handleLogin}
            onSwitchToLogin={() => setCurrentScreen('login')} 
          />
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-[#F5F7FA]'}`}>
      <Sidebar 
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <TopNav 
          onNotificationClick={() => setShowNotifications(!showNotifications)}
          onLogout={handleLogout}
          showNotifications={showNotifications}
        />
        
        <main className="p-6 md:p-8">
          {currentScreen === 'dashboard' && <Dashboard />}
          {currentScreen === 'equipment' && <EquipmentManagement />}
          {currentScreen === 'maintenance' && <MaintenanceDetails />}
          {currentScreen === 'calendar' && <CalendarView />}
          {currentScreen === 'team' && <TeamManagement />}
          {currentScreen === 'categories' && <Categories />}
          {currentScreen === 'kanban' && <KanbanBoard />}
          {currentScreen === 'analytics' && <Analytics />}
          {currentScreen === 'settings' && (
            <SettingsPage 
              theme={theme}
              onThemeChange={setTheme}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}