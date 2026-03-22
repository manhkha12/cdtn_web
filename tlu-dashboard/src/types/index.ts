import React from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  status: "present" | "absent" | "late" | "ai_verified";
  studentId?: string;
  avatar?: string;
}

export interface StatCard {
  icon: React.ElementType;
  iconSize: number;
  label: string;
  value: string | number;
  description: string;
  color: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
