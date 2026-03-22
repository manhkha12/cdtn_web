import React, { useState } from "react";
import type { ReactNode } from "react";
import SidebarComponent from "./SidebarComponent";
import TopbarComponent from "./TopbarComponent";

interface DashboardLayoutProps {
  children: ReactNode;
  onNavigate?: (page: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onNavigate,
}) => {
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");

  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
    onNavigate?.(menu);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <SidebarComponent
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <TopbarComponent notificationCount={3} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
