import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-dvh bg-bg-app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarOpen ? false : collapsed}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
        <main
          className={clsx('flex-1 overflow-y-auto p-4 pt-20 sm:p-6', collapsed ? 'md:pl-18' : 'md:pl-64')}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
