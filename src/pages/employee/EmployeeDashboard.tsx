// src/pages/employee/EmployeeDashboard.tsx
import { useEffect, useState } from 'react';
import Banner from '../../components/layout/Banner';
import Card from '../../components/base/Card';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const [presentDays, setPresentDays] = useState(0);
  const [leavesThisMonth, setLeavesThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      setLoading(true);

      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 01-12
        const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate(); // e.g., 31

        // Query attendance records for current month
        const q = query(
          collection(db, 'attendance'),
          where('userId', '==', currentUser.uid),
          where('date', '>=', `${year}-${month}-01`),
          where('date', '<=', `${year}-${month}-${daysInMonth}`)
        );

        const snapshot = await getDocs(q);

        // Set of dates the employee has attendance
        const attendedDates = new Set<string>();
        let presentCount = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          attendedDates.add(data.date);

          // Count as present if working hours >= 4h (240 minutes) or status is 'present'
          if (data.workingHours >= 20 || data.status === 'present') {
            presentCount++;
          }
        });

        // Total working days this month = total days - weekends? Or just all days?
        // We'll assume all calendar days (you can adjust later)
        const totalDaysThisMonth = new Date(today).getDate()

        // Leaves = total days - days with any attendance record
        const leavesTaken = totalDaysThisMonth - attendedDates.size;

        setPresentDays(presentCount);
        setLeavesThisMonth(leavesTaken);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setPresentDays(0);
        setLeavesThisMonth(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  if (!currentUser) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      <section className="w-full h-auto">
        <Banner 
          employeeName={currentUser.name || 'Employee'} 
          role={currentUser.role || 'employee'} 
        />

        <main className="w-full h-auto flex items-center justify-center gap-5 sm:m-5 pt-10 flex-wrap">
          <Card 
            label='Attendance'
            value={loading ? '...' : presentDays}
            color='#0496ff'
          />
          <Card 
            label='Leaves'
            value={loading ? '...' : leavesThisMonth}
            color='#0496ff'
          />
        </main>
      </section>
    </>
  );
};

export default EmployeeDashboard;
