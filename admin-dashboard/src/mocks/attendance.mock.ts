import type { AlertLevel, StudentRisk } from "../types";

export const alertLevels: AlertLevel[] = [
  {
    level: 1,
    name: "Low",
    color: "blue",
    percentage: 70,
  },
  {
    level: 2,
    name: "Medium",
    color: "yellow",
    percentage: 85,
  },
  {
    level: 3,
    name: "Critical",
    color: "red",
    percentage: 95,
  },
];

export const atRiskStudents: StudentRisk[] = [
  {
    id: "1",
    name: "Alice Johnson",
    studentId: "STU001",
    department: "Computer Science",
    absencePercentage: 78,
    riskLevel: "high",
  },
  {
    id: "2",
    name: "Bob Smith",
    studentId: "STU002",
    department: "Engineering",
    absencePercentage: 62,
    riskLevel: "high",
  },
  {
    id: "3",
    name: "Carol White",
    studentId: "STU003",
    department: "Business",
    absencePercentage: 45,
    riskLevel: "medium",
  },
  {
    id: "4",
    name: "David Brown",
    studentId: "STU004",
    department: "Science",
    absencePercentage: 38,
    riskLevel: "medium",
  },
  {
    id: "5",
    name: "Emma Davis",
    studentId: "STU005",
    department: "Arts",
    absencePercentage: 72,
    riskLevel: "high",
  },
  {
    id: "6",
    name: "Frank Miller",
    studentId: "STU006",
    department: "Engineering",
    absencePercentage: 55,
    riskLevel: "medium",
  },
  {
    id: "7",
    name: "Grace Lee",
    studentId: "STU007",
    department: "Computer Science",
    absencePercentage: 88,
    riskLevel: "high",
  },
  {
    id: "8",
    name: "Henry Wilson",
    studentId: "STU008",
    department: "Business",
    absencePercentage: 41,
    riskLevel: "medium",
  },
];

export const systemStatus = {
  status: "Operational",
  uptime: "99.8%",
  lastSync: "2 mins ago",
  nextScheduledScan: "Today at 6:00 PM",
};

export const currentAlerts = [
  {
    id: "1",
    type: "high",
    message: "8 students with critical absence rate",
    timestamp: "5 mins ago",
  },
  {
    id: "2",
    type: "medium",
    message: "15 students in medium risk category",
    timestamp: "10 mins ago",
  },
  {
    id: "3",
    type: "low",
    message: "Daily scan completed successfully",
    timestamp: "1 hour ago",
  },
];
