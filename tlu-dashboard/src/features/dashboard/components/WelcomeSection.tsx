import React from "react";

interface WelcomeSectionProps {
  userName: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateString = today.toLocaleDateString('vi-VN', options);

  return (
    <div className="mb-2">
      <h1 className="text-5xl font-bold text-slate-950 mb-2 tracking-tight">
        Chào mừng trở lại, {userName}!
      </h1>
      <p className="text-lg text-slate-500 font-medium">
        {dateString} • Dưới đây là tóm tắt hoạt động giảng dạy của bạn hôm nay.
      </p>
    </div>
  );
};

export default WelcomeSection;
