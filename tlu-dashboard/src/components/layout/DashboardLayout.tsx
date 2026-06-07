import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import TopbarComponent from "./TopbarComponent";
import { NotificationService } from "../../services/NotificationService";
import toast from "react-hot-toast";

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = location.pathname.split("/")[1] || "dashboard";

  const handleMenuChange = (menu: string) => {
    navigate(`/${menu}`);
  };

  React.useEffect(() => {
    let isSubscribed = true;

    const initFCM = async () => {
      try {
        const token = await NotificationService.requestPermissionAndRegister();
        if (token && isSubscribed) {
          console.log("FCM initialized and token registered");
        }
      } catch (err) {
        console.error("FCM Init Error:", err);
      }
    };
    
    initFCM();

    const unsubscribe = NotificationService.onForegroundMessage((payload) => {
      if (isSubscribed) {
        toast(payload.notification.body || "Bạn có thông báo mới", {
          icon: '🔔',
          duration: 4000,
        });
      }
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      <SidebarComponent
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopbarComponent notificationCount={0} /> 

        <main className="flex-1 overflow-y-auto bg-[#f4f6f9] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;