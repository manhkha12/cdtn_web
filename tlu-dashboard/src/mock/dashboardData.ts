import { BookOpen, Users, TrendingUp, Award } from "lucide-react";
import type { Student, StatCard } from "../types";

export const studentsMockData: Student[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@tlu.edu.vn",
    status: "present",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@tlu.edu.vn",
    status: "present",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@tlu.edu.vn",
    status: "late",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@tlu.edu.vn",
    status: "absent",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    email: "hoangvane@tlu.edu.vn",
    status: "present",
  },
];

export const getStatsMockData = (): StatCard[] => [
  {
    icon: BookOpen,
    iconSize: 24,
    label: "Total Courses",
    value: 4,
    description: "This semester",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Users,
    iconSize: 24,
    label: "Total Students",
    value: 360,
    description: "Across all courses",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: TrendingUp,
    iconSize: 24,
    label: "Avg. Attendance",
    value: "92%",
    description: "Last 30 days",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Award,
    iconSize: 24,
    label: "Rating",
    value: "4.8★",
    description: "Student feedback",
    color: "bg-yellow-100 text-yellow-600",
  },
];
