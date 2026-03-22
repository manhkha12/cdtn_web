import type { StatCard, ActivityItem, ChartData } from "../types";

export const dashboardStats: StatCard[] = [
  {
    icon: "Users",
    label: "Total Students",
    value: "2,543",
    subtitle: "+12 new this week",
  },
  {
    icon: "BookOpen",
    label: "Active Classes",
    value: "24",
    subtitle: "All running smoothly",
  },
  {
    icon: "TrendingUp",
    label: "Attendance Rate",
    value: "94.2%",
    subtitle: "+2.1% from last week",
    badge: "URGENT",
  },
  {
    icon: "Clock",
    label: "Pending Requests",
    value: "18",
    subtitle: "4 need urgent attention",
  },
];

export const attendanceTrendsData: ChartData[] = [
  { name: "Mon", value: 88 },
  { name: "Tue", value: 92 },
  { name: "Wed", value: 89 },
  { name: "Thu", value: 95 },
  { name: "Fri", value: 91 },
  { name: "Sat", value: 87 },
  { name: "Sun", value: 84 },
];

export const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "attendance",
    message: "System attendance scan completed",
    timestamp: "5 mins ago",
    avatar: "JD",
  },
  {
    id: "2",
    type: "alert",
    message: "Alert: 3 students marked absent",
    timestamp: "15 mins ago",
    avatar: "AL",
  },
  {
    id: "3",
    type: "news",
    message: "New announcement published",
    timestamp: "2 hours ago",
    avatar: "NP",
  },
  {
    id: "4",
    type: "system",
    message: "Database backup completed",
    timestamp: "4 hours ago",
    avatar: "DB",
  },
  {
    id: "5",
    type: "config",
    message: "Attendance config updated",
    timestamp: "1 day ago",
    avatar: "CF",
  },
];
