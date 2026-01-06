// src/pages/admin/AdminDashboard.tsx
import  { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getTodayDateString } from '../../lib/attendanceUtils';
import Card from '../../components/base/Card';
import profile from '../../assets/admin.png'
interface Stats {
  totalEmployees: number;
  checkedInToday: number;
  totalHoursToday: number;
  presentToday: number;
  partialToday: number;
  absentToday: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalEmployees: 0,
    checkedInToday: 0,
    totalHoursToday: 0,
    presentToday: 0,
    partialToday: 0,
    absentToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      try {
        // 1. Total employees
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const totalEmployees = usersSnapshot.size;

        // 2. Today's attendance records
        const today = getTodayDateString();
        const attendanceQuery = query(
          collection(db, 'attendance'),
          where('date', '==', today)
        );
        const attendanceSnapshot = await getDocs(attendanceQuery);

        let checkedInToday = 0;
        let totalHoursToday = 0;
        let presentToday = 0;
        let partialToday = 0;

        const checkedInEmployeeIds = new Set<string>();

        attendanceSnapshot.forEach(doc => {
          const data = doc.data();
          checkedInEmployeeIds.add(data.userId);

          if (data.workingHours) {
            totalHoursToday += data.workingHours;
          }

          if (data.status === 'present') presentToday++;
          if (data.status === 'partial') partialToday++;
        });

        checkedInToday = checkedInEmployeeIds.size;

        // 3. Absent today = total employees - checked in today
        const absentToday = totalEmployees - checkedInToday;

        setStats({
          totalEmployees,
          checkedInToday,
          totalHoursToday,
          presentToday,
          partialToday,
          absentToday,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // const formatHours = (minutes: number): string => {
  //   if (minutes === 0) return "0h 0m";
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours}h ${mins}m`;
  // };

  return (
    <>
      <section className="w-full transition duration-300">
        <header className="w-full h-auto flex items-center justify-between px-5 border-2 border-[#0496ff] rounded-2xl m-auto mb-10">
          <h1 className="heading text-[42px] my-2.5 text-center">
            Welcome Saravanankodi- <span className="text-[#0496ff] ">Admin</span>
          </h1>
          <img src={profile} alt="profile" />
        </header>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading dashboard stats...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
            {/* Total Employees */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Total Employees</h3>
              <p className="text-5xl font-extrabold text-[#0496ff]">{stats.totalEmployees}</p>
            </div> */}
            <Card label='Total Employees' value={stats.totalEmployees} color='#0496FF'/>
            <Card label='Today Attendance' value={stats.checkedInToday} color='#34C759'/>
            <Card label='Today Leave' value={stats.absentToday} color='#FF383C'/>           
          </div>
        )}
      </section>
    </>
  );
}

export default AdminDashboard;