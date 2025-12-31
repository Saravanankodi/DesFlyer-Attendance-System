// src/pages/admin/AllAttendance.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import type { AttendanceRecord } from '../../firebase/types';
import { formatTime, formatHours } from '../../lib/formatUtils';

interface Employee {
  uid: string;
  employeeId: string;
  name: string;
}

function AllAttendance() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEmployeeId, setFilterEmployeeId] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const empList: Employee[] = [];
      usersSnapshot.forEach(doc => {
        const data = doc.data();
        empList.push({
          uid: doc.id,
          employeeId: data.employeeId || '',
          name: data.name || '',
        });
      });
      setEmployees(empList);
    };
    fetchEmployees();
  }, []);

  // Fetch all attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      let q = query(collection(db, 'attendance'), orderBy('date', 'desc'), orderBy('checkIn', 'desc'));

      const snapshot = await getDocs(q);
      const records: AttendanceRecord[] = [];
      snapshot.forEach(doc => {
        records.push({ id: doc.id, ...doc.data() } as AttendanceRecord);
      });

      setAttendanceRecords(records);
      setLoading(false);
    };
    fetchAttendance();
  }, []);

  // Group records by date and employee
  const groupedData = attendanceRecords.reduce((groups, record) => {
    const dateKey = record.date.split('-').reverse().join(''); // DDMMYYYY
    const empKey = record.employeeId;

    if (!groups[dateKey]) groups[dateKey] = {};
    if (!groups[dateKey][empKey]) {
      groups[dateKey][empKey] = {
        name: record.name,
        records: [],
      };
    }
    groups[dateKey][empKey].records.push(record);
    return groups;
  }, {} as Record<string, Record<string, { name: string; records: AttendanceRecord[] }>>);

  // Apply filters
  const filteredDates = Object.keys(groupedData)
    .filter(dateKey => {
      if (filterEmployeeId) {
        const hasMatchingEmp = Object.keys(groupedData[dateKey]).some(empId => empId.toLowerCase().includes(filterEmployeeId.toLowerCase()));
        if (!hasMatchingEmp) return false;
      }
      if (filterDate) {
        if (dateKey !== filterDate.split('-').reverse().join('')) return false;
      }
      if (filterMonth) {
        const month = dateKey.substring(2, 6); // MMYYYY
        if (month !== filterMonth.replace('-', '')) return false;
      }
      return true;
    })
    .sort((a, b) => b.localeCompare(a)); // Latest first

  return (
    <>
      <section className="w-full transition duration-300">
        <header className="w-full h-auto m-auto mb-8">
          <h1 className="heading text-4xl my-2.5 text-center">
            All Employees Attendance
          </h1>
        </header>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
          <input
            type="text"
            placeholder="Filter by Employee ID"
            value={filterEmployeeId}
            onChange={(e) => setFilterEmployeeId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
          />
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0496ff]"
          />
          <button
            onClick={() => {
              setFilterEmployeeId('');
              setFilterDate('');
              setFilterMonth('');
            }}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center py-8 text-gray-600">Loading attendance data...</p>
          ) : filteredDates.length === 0 ? (
            <p className="text-center py-8 text-gray-600">No attendance records found.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0496ff] text-white">
                <tr>
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold">Employee ID</th>
                  <th className="py-4 px-6 font-semibold">Name</th>
                  <th className="py-4 px-6 font-semibold">Check In</th>
                  <th className="py-4 px-6 font-semibold">Check Out</th>
                  <th className="py-4 px-6 font-semibold">Total Hours</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold">Calendar</th>
                </tr>
              </thead>
              <tbody>
                {filteredDates.map(dateKey => {
                  return Object.entries(groupedData[dateKey]).map(([empId, { name, records }]) => {
                    const totalMinutes = records.reduce((sum, r) => sum + (r.workingHours || 0), 0);
                    const totalHoursStr = formatHours(totalMinutes);
                    const hasOpenSession = records.some(r => r.checkOut === null);
                    const status = hasOpenSession ? "In Progress" : "Complete";
                    const statusColor = status === "Complete" ? "bg-green-500" : "bg-yellow-500";

                    return (
                      <tr key={`${dateKey}-${empId}`} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium">{dateKey}</td>
                        <td className="py-4 px-6">{empId}</td>
                        <td className="py-4 px-6">{name}</td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            {records.map((r, i) => (
                              <div key={i} className="text-sm">{formatTime(r.checkIn)}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            {records.map((r, i) => (
                              <div key={i} className="text-sm">{formatTime(r.checkOut || null)}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold text-purple-600">{totalHoursStr}</td>
                        <td className="py-4 px-6">
                          <span className={`px-4 py-2 rounded-full text-white font-medium ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button className="flex items-center gap-2 mx-auto text-[#0496ff] hover:underline font-medium">
                            <img src="/src/assets/celander.png" alt="Calendar" className="w-6 h-6" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

export default AllAttendance;