// src/pages/admin/AllAttendance.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import type { AttendanceRecord } from '../../firebase/types';
import { formatTime, formatHours } from '../../lib/formatUtils';

interface Employee {
  uid: string;
  employeeId: string;
  name: string;
}

function AllAttendance() {
  const [, setEmployees] = useState<Employee[]>([]);
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
      const q = query(collection(db, 'attendance'), orderBy('date', 'desc'), orderBy('checkIn', 'desc'));

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
    const [year, month, day] = record.date.split('-');
    const dateKey = `${day}/${month}/${year}`; // DD/MM/YYYY
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
        const formattedFilterDate = filterDate
        .split('-')
        .reverse()
        .join('/');

      if (dateKey !== formattedFilterDate) return false;
      }
      if (filterMonth) {
        const [, month, year] = dateKey.split('/');
        const monthKey = `${year}${month}`; // YYYYMM
      
        if (monthKey !== filterMonth.replace('-', '')) return false;
      }
      
      return true;
    })
    .sort((a, b) => b.localeCompare(a)); // Latest first

  return (
    <>
      <section className="w-full max-h-screen grid gap-5 grid-rows-[auto_auto_90%] transition duration-300 ">
        <header className="w-full h-auto m-auto">
          <h1 className="heading text-4xl max-w-7xl m-auto my-2.5">
            Attendance <span className="text-[#0496ff] ">(Admin)</span>
          </h1>
        </header>

        {/* Filters */}
        <div className="max-w-4xl max-h-12 mx-auto flex flex-wrap gap-4 justify-center">
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
        <div className="max-w-7xl max-h-4/5 mx-auto overflow-y-scroll ">
          {loading ? (
            <p className="text-center py-8 text-gray-600">Loading attendance data...</p>
          ) : filteredDates.length === 0 ? (
            <p className="text-center py-8 text-gray-600">No attendance records found.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0496ff] sticky top-0 text-white">
                <tr>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Date</th>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Employee ID</th>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Name</th>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Check In</th>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Check Out</th>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Total Hours</th>
                  <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Status</th>
                  {/* <th className="py-4 px-6 font-semibold border border-black sub-heading text-base text-center">Calendar</th> */}
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
                        <td className="py-4 px-6 font-medium border border-black text text-base">{dateKey}</td>
                        <td className="py-4 px-6 border border-black text text-base">{empId}</td>
                        <td className="py-4 px-6 border border-black text text-base">{name}</td>
                        <td className="py-4 px-6 border border-black text text-base">
                          <div className="space-y-2">
                            {records.map((r, i) => (
                              <div key={i} className="text-sm">{formatTime(r.checkIn)}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 border border-black text text-base">
                          <div className="space-y-2">
                            {records.map((r, i) => (
                              <div key={i} className="text-sm">{formatTime(r.checkOut || null)}</div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold text-purple-600 border border-black">{totalHoursStr}</td>
                        <td className="py-4 px-6 border border-black text text-base">
                          <span className={`px-4 py-2 text-nowrap rounded-full text-white font-medium ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        {/* <td className="py-4 px-6 text-center border border-black text text-base">
                          <button className="flex items-center gap-2 mx-auto text-[#0496ff] hover:underline font-medium">
                            <img src="/src/assets/celander.png" alt="Calendar" className="w-6 h-6" />
                            View Details
                          </button>
                        </td> */}
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