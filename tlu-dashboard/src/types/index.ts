import React from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  status: "present" | "absent" | "late" | "ai_verified";
  studentId?: string;
  avatar?: string;
}

export interface ClassStudent {
  id: string;
  student_code: string;
  full_name: string;
  class_name: string;
  phone_number: string;
  email: string;
  avatar_url: string | null;
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

export type ClassStatus = 'ONGOING' | 'UP NEXT' | 'AFTERNOON';

export interface CourseClass {
  id: string;
  subject: {
    id: string;
    subject_code: string;
    subject_name: string;
    credits: number;
  };
  semester: {
    id: string;
    semester_name: string;
    academic_year: string;
  };
  room: string;
  latitude: number | null;
  longitude: number | null;
  allowed_radius: number;
  max_students: number;
  current_students: number;
  day_of_week: number;
  lesson_slot: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  status?: ClassStatus;
}

export interface AttendanceSession {
  id: string;
  course_class_id: string;
  check_in_time: string | null;
  date: string | null;
  course_class?: CourseClass;
  _count?: {
    records: number;
  };
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  student_id: string;
  arrival_time: string | null;
  status: number; // 0: absent, 1: present, 2: late, 3: excused
  confidence_score: number;
  is_manual_override: boolean;
  evidence_url: string | null;
  attendance_method: string;
  updated_by: string | null;
  note: string | null;
  student?: {
    id: string;
    student_code: string;
    full_name: string;
    class_name: string;
  };
}



