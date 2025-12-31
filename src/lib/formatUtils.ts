// src/lib/formatUtils.ts
import { Timestamp } from "firebase/firestore";

export const formatTime = (timestamp: Timestamp | null): string => {
  if (!timestamp) return "--:--";
  const date = timestamp.toDate();
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatHours = (minutes: number | null): string => {
  if (!minutes || minutes <= 0) return "0h 0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};