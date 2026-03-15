// src/pages/admin/EmployeesDetails.tsx

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Input } from "../../components/base/Input";
import SvgSearch from "../../assets/icons/Search";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  notes: string;
}

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));

        const data: Employee[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Employee, "id">),
        }));

        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Search filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-8">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl btn-text font-bold">Employees Details</h1>
        <p className="text-gray-500 mt-2 text text-lg">
          All Employees Details List
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="text"
          Icon={<SvgSearch className="w-6 h-6 text-[#717182]"/>}
          placeholder="Search by Employee ID, Employee Name..."
          className="w-full bg-[#F3F3F5] border border-[#00000000] "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#0000001A] overflow-hidden">
        <table className="w-full text-left">

          <thead className="border-b bg-gray-50 border-[#0000001A]">
            <tr className="text-lg heading">
              <th className="p-4">Employee Name</th>
              <th className="p-4">Employee ID</th>
              <th className="p-4">Employee Position</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4" colSpan={4}>Loading...</td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={4}>No employees found</td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-[#0000001A] hover:bg-gray-50">
                  <td className="p-4">{emp.name}</td>
                  <td className="p-4">{emp.employeeId}</td>
                  <td className="p-4">{emp.position}</td>
                  <td className="p-4">{emp.notes}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-gray-500">
        Showing {filteredEmployees.length} of {employees.length} records
      </div>

    </div>
  );
};

export default EmployeeDetails;