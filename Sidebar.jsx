// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Calendar,
  MessageSquare,
  Settings,
  Folder,
  Users,
  FileText,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { path: '/', icon: <LayoutDashboard />, label: 'Dashboard', badge: 3 },
    { path: '/tasks', icon: <CheckSquare />, label: 'Tasks', badge: 12 },
    { path: '/projects', icon: <Folder />, label: 'Projects' },
    { path: '/calendar', icon: <Calendar />, label: 'Calendar' },
    { path: '/analytics', icon: <BarChart3 />, label: 'Analytics' },
    { path: '/team', icon: <Users />, label: 'Team' },
    { path: '/messages', icon: <MessageSquare />, label: 'Messages', badge: 5 },
    { path: '/documents', icon: <FileText />, label: 'Documents' },
    { path: '/settings', icon: <Settings />, label: 'Settings' },
  ];

  const projects = [
    { id: 1, name: 'Website Redesign', color: 'bg-blue-500', progress: 75 },
    { id: 2, name: 'Mobile App', color: 'bg-green-500', progress: 45 },
    { id: 3, name: 'Marketing Campaign', color: 'bg-purple-500', progress: 90 },
  ];

  return (
    <aside className={`
      fixed md:relative h-screen z-30 transition-all duration-300
      ${collapsed ? 'w-20' : 'w-64'}
      ${theme === 'dark' ? 'bg-gray-850' : 'bg-white'}
      border-r border-gray-200 dark:border-gray-700
      flex flex-col
    `}>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <h2 className="text-xl font-bold">TaskFlow</h2>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center mx-auto">
            <span className="text-white font-bold">T</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center p-3 rounded-lg transition-all group
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-600' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="relative">
                {item.icon}
                {item.badge && !collapsed && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </span>
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Projects Section */}
        {!collapsed && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Active Projects
            </h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${project.color} rounded-full mr-2`}></div>
                      <span className="text-sm font-medium">{project.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${project.color} rounded-full transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold">JD</span>
            </div>
            <div className="ml-3">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        )}

        <div className={`flex ${collapsed ? 'flex-col items-center space-y-2' : 'justify-between'}`}>
          <button className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <HelpCircle className="w-5 h-5" />
            {!collapsed && <span className="ml-2">Help</span>}
          </button>
          <button className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-red-500">
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;