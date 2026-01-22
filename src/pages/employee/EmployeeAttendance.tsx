// src/pages/employee/EmployeeAttendance.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getTodayAttendance,
  checkIn,
  checkOut,
  getRecentAttendance,
} from "../../lib/attendanceUtils";
import { formatTime, formatHours } from "../../lib/formatUtils";
import type { AttendanceRecord } from "../../firebase/types";

const EmployeeAttendance = () => {
  const { currentUser } = useAuth();
  const [, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [recentRecords, setRecentRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);

  const loadData = async () => {
    if (!currentUser) return;
  
    setLoading(true);
  
    try {
      const today = await getTodayAttendance(currentUser.uid);
      setTodayRecord(today);
      const checkedIn = today?.checkIn && !today?.checkOut;
      setIsCheckedIn(Boolean(checkedIn));
  
      const recent = await getRecentAttendance(currentUser.uid);
      setRecentRecords(recent);
    } catch (error) {
      console.error("Load data error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fixed exhaustive-deps: loadData is stable, but to silence ESLint we memoize it
 useEffect(() => {
  if (currentUser) loadData();
}, [currentUser]);
 

const handleToggle = async () => {
  if (!currentUser || loading) return;

  setLoading(true);
  setMessage("");

  try {
    if (isCheckedIn) {
      await checkOut(currentUser.uid);
      setMessage("Checked out successfully!");
    } else {
      await checkIn(currentUser.uid, currentUser.employeeId, currentUser.name);
      setMessage("Checked in successfully!");
    }
    await loadData(); // now updates isCheckedIn immediately
  } catch (error: any) {
    console.error("Toggle error:", error);
    setMessage(error.message || "Operation failed. Please try again.");
  } finally {
    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  }
};
const formatDate = (dateStr: string) => {
  // Handle either DD.MM.YYYY or YYYY-MM-DD
  if (dateStr.includes(".")) {
    const [dd, mm, yyyy] = dateStr.split(".");
    return `${dd}/${mm}/${yyyy}`;
  } else if (dateStr.includes("-")) {
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}/${mm}/${yyyy}`;
  }
  return dateStr;
};


  // Get today's date for display
  const today = new Date().toLocaleDateString("en-GB");
  
  return (
      <div className="space-y-8">
    {/* Today's Attendance Card */}
    {/* <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"> */}
      <h2 className="text-[32px] heading text-center text-gray-800 mb-6">
        Employee <span className="text-[#0496ff]">Attendance</span>
      </h2>

      {message && (
        <div className={`px-6 py-3 rounded-lg text-center font-medium mb-6 ${
          message.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}>
          {message}
        </div>
      )}

      {/* Single Toggle Button */}
      <div className="flex gap-5">
        <p className="date py-4 px-4 text-center text-xl border rounded-xl">
          {today}
        </p>
        <button
          onClick={handleToggle}
          disabled={loading || !currentUser}
          className={`date px-10 py-4 text-white font-bold rounded-xl transition text-xl ${
            isCheckedIn
              ? 'bg-[#FF383C] hover:bg-red-700'
              : 'bg-[#34C759] hover:bg-blue-700'
          } disabled:bg-gray-400`}
        >
          {loading ? 'PROCESSING...' : isCheckedIn ? 'CHECK-OUT' : 'CHECK-IN'}
        </button>
      </div>

      {/* Recent History */}
      <div className=" rounded-2xl shadow-lg p-8 max-w-6xl mx-auto">
        {recentRecords.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No attendance records yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0496ff] text-white border">
                <tr>
                  <th className="py-4 px-6 font-semibold border sub-heading text-center text-base border-black">Date</th>
                  <th className="py-4 px-6 font-semibold border sub-heading text-center text-base border-black">Name</th>
                  <th className="py-4 px-6 font-semibold border sub-heading text-center text-base border-black">Check In</th>
                  <th className="py-4 px-6 font-semibold border sub-heading text-center text-base border-black">Check Out</th>
                  <th className="py-4 px-6 font-semibold border sub-heading text-center text-base border-black">Total Hours</th>
                  <th className="py-4 px-6 font-semibold border sub-heading text-center text-base border-black">Status</th>
                  {/* <th className="py-4 px-6 font-semibold border border-black">Calendar</th> */}
                </tr>
              </thead>
              <tbody>
                {/* Group records by date */}
                {Object.entries(
                  recentRecords.reduce((groups, record) => {
                    const dateKey = record.date.split('.').join(''); // DDMMYYYY
                    if (!groups[dateKey]) groups[dateKey] = [];
                    groups[dateKey].push(record);
                    return groups;
                  }, {} as Record<string, AttendanceRecord[]>)
                )
                  .sort(([a], [b]) => b.localeCompare(a)) // Descending date
                  .map(([dateKey, dayRecords]) => {
                    const totalMinutes = dayRecords.reduce((sum, r) => sum + (r.workingHours || 0), 0);
                    const totalHoursStr = formatHours(totalMinutes);
                    const hasCheckOut = dayRecords.some(r => r.checkOut);
                    const isFullDay = totalMinutes >= 480; // 8 hours
                    const status = hasCheckOut ? (isFullDay ? "Complete" : "Complete") : "In Progress"; // Adjust logic if needed
                    const statusColor = status === "Complete" ? "bg-green-500" : "bg-yellow-500";

                    return (
                      <tr key={dateKey} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6 text font-medium border text-center">{formatDate(dayRecords[0].date)}</td>
                        <td className="py-4 px-6 text border text-center">{dayRecords[0].name}</td>
                        <td className="py-4 px-6 text border text-center">
                          <div className="space-y-1">
                            {dayRecords.map((r, i) => (
                              <div key={i}>{formatTime(r.checkIn)}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 border text text-center">
                          <div className="space-y-1">
                            {dayRecords.map((r, i) => (
                              <div key={i}>{formatTime(r.checkOut)}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold border text text-center">{totalHoursStr}</td>
                        <td className="py-4 px-6 border text text-center">
                          <span className={`px-4 py-2 rounded-full text-white font-medium ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        {/* <td className="py-4 px-6 text-center border">
                          <button className="text-blue-600 hover:underline flex items-center gap-2 mx-auto">
                            <img src="/src/assets/celander.png" alt="Calendar" className="w-6 h-6" />
                            View Details
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendance;

