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
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

        const q = query(
          collection(db, 'attendance'),
          where('userId', '==', currentUser.uid),
          where('date', '>=', `${year}-${month}-01`),
          where('date', '<=', `${year}-${month}-${daysInMonth}`)
        );

        const snapshot = await getDocs(q);

        const attendedDates = new Set<string>();
        const presentDates = new Set<string>();

        snapshot.forEach(doc => {
          const data = doc.data();

          // any attendance recorded
          attendedDates.add(data.date);

          // present condition
          if (data.workingHours >= 240 || data.status === 'present') {
            presentDates.add(data.date);
          }
        });

        const elapsedDays = today.getDate();

        const leavesTaken = Math.max(
          0,
          elapsedDays - attendedDates.size
        );

        setPresentDays(presentDates.size);
        setLeavesThisMonth(leavesTaken);

      } catch (error) {
        console.error('Error fetching stats:', error);
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
            label="Attendance"
            value={loading ? '...' : presentDays}
            color="#0496ff"
          />
          <Card
            label="Leaves"
            value={loading ? '...' : leavesThisMonth}
            color="#0496ff"
          />
        </main>
      </section>
    </>
  );
};

export default EmployeeDashboard;
