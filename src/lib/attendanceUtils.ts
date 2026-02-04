// src/lib/attendanceUtils.ts
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { AttendanceRecord } from "../firebase/types";

const ATTENDANCE_COLLECTION = "attendance";

export const getTodayDateString = (): string => {
  const now = new Date();
  return now.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const getTodayAttendance = async (
  userId: string
): Promise<AttendanceRecord | null> => {
  const today = getTodayDateString();

  const q = query(
    collection(db, ATTENDANCE_COLLECTION),
    where("userId", "==", userId),
    where("date", "==", today),
    orderBy("checkIn", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  } as AttendanceRecord;
};


// Allow multiple check-ins
export const checkIn = async (userId: string, employeeId: string, name: string): Promise<void> => {
  const today = getTodayDateString();
  const now = Timestamp.now();

  await addDoc(collection(db, ATTENDANCE_COLLECTION), {
    userId,
    employeeId,
    name,
    date: today,
    checkIn: now,
    checkOut: null,
    workingHours: null,
    status: "present",
  });
};

// Pair with the latest open check-in
export const checkOut = async (userId: string): Promise<void> => {
  const today = getTodayDateString();
  const now = Timestamp.now();

  const q = query(
    collection(db, ATTENDANCE_COLLECTION),
    where("userId", "==", userId),
    where("date", "==", today),
    where("checkOut", "==", null),
    orderBy("checkIn", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    throw new Error("No active check-in found. Please check in first.");
  }

  const openRecord = snapshot.docs[0];
  const checkInTime = openRecord.data().checkIn as Timestamp;
  const checkInDate = checkInTime.toDate();
  const diffMs = now.toDate().getTime() - checkInDate.getTime();
  const diffMinutes = Math.max(0, Math.round(diffMs / 60000));

  await updateDoc(openRecord.ref, {
    checkOut: now,
    workingHours: diffMinutes,
    status: diffMinutes >= 480 ? "present" : "partial",
  });
};

export const getRecentAttendance = async (userId: string): Promise<AttendanceRecord[]> => {
  const q = query(
    collection(db, ATTENDANCE_COLLECTION),
    where("userId", "==", userId),
    orderBy("date", "desc"),
    orderBy("checkIn", "desc"),
    limit(30)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  } as AttendanceRecord));
};