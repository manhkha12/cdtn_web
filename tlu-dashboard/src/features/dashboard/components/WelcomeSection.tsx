import React from "react";

interface WelcomeSectionProps {
  userName: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  return (
    <div className="mb-2">
      <h1 className="text-5xl font-bold text-slate-950 mb-2 tracking-tight">
        Welcome back, {userName}!
      </h1>
      <p className="text-lg text-slate-500">
        Monday, March 17, 2026 • Here's what's happening with your dashboard
        today
      </p>
    </div>
  );
};

export default WelcomeSection;
