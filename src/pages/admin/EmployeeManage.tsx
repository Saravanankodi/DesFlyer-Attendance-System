import { useState } from "react";
import AddEmployee from "./AddEmployee";
import EmployeeDetails from "./EmployeeDetails";

const EmployeeManage = () => {
  const [activeTab, setActiveTab] = useState<"add" | "details">("add");

  return (
    <div className="w-full flex flex-col items-center">

      {/* Toggle Buttons */}
      <div className="w-full h-11 flex bg-gray-200 rounded-full p-1 justify-between">
        <button
          onClick={() => setActiveTab("add")}
          className={`flex-1 rounded-full text-xl font-semibold transition btn-text
          ${activeTab === "add" ? "bg-white shadow" : "text-gray-500"}`}
        >
          Add Employees
        </button>

        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 rounded-full text-xl font-semibold transition btn-text
          ${activeTab === "details" ? "bg-white shadow" : "text-gray-500"}`}
        >
          Employees Details
        </button>
      </div>

      {/* UI Section */}
      <div className="w-full mt-10">

        {activeTab === "add" && (
          <AddEmployee/>
        )}

        {activeTab === "details" && (
          <EmployeeDetails/>
        )}

      </div>
    </div>
  );
};

export default EmployeeManage;