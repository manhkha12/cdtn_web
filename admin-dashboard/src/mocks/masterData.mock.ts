import type { MasterDataRecord } from "../types";

export const masterDataRecords: MasterDataRecord[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@student.edu",
    studentId: "STU001",
    class: "CS-2024-A",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@student.edu",
    studentId: "STU002",
    class: "ENG-2024-B",
    status: "active",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol.white@student.edu",
    studentId: "STU003",
    class: "BUS-2024-A",
    status: "active",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@student.edu",
    studentId: "STU004",
    class: "SCI-2024-C",
    status: "pending",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma.davis@student.edu",
    studentId: "STU005",
    class: "ART-2024-B",
    status: "active",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@student.edu",
    studentId: "STU006",
    class: "ENG-2024-A",
    status: "inactive",
  },
  {
    id: "7",
    name: "Grace Lee",
    email: "grace.lee@student.edu",
    studentId: "STU007",
    class: "CS-2024-B",
    status: "active",
  },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry.wilson@student.edu",
    studentId: "STU008",
    class: "BUS-2024-C",
    status: "active",
  },
  {
    id: "9",
    name: "Iris Chen",
    email: "iris.chen@student.edu",
    studentId: "STU009",
    class: "CS-2024-C",
    status: "active",
  },
  {
    id: "10",
    name: "Jack Robinson",
    email: "jack.robinson@student.edu",
    studentId: "STU010",
    class: "SCI-2024-A",
    status: "pending",
  },
];

export const quickInsights = [
  {
    label: "Total Records",
    value: "2,543",
    trend: "+12%",
  },
  {
    label: "Active Students",
    value: "2,401",
    trend: "+5%",
  },
  {
    label: "Pending Approval",
    value: "87",
    trend: "-3%",
  },
  {
    label: "Inactive",
    value: "55",
    trend: "+1%",
  },
];
