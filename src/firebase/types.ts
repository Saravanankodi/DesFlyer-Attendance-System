// src/firebase/types.ts
import { Timestamp } from "firebase/firestore";

export type Role = "employee" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  employeeId: string;
  role: Role;
  createdAt?: Timestamp;
}

export interface AttendanceRecord {
  id?: string;
  userId: string;
  employeeId: string;
  name: string;
  date: string; // YYYY-MM-DD
  checkIn: Timestamp | null;
  checkOut: Timestamp | null;
  workingHours: number | null; // in minutes
  status: "present" | "leave" | "partial";
}