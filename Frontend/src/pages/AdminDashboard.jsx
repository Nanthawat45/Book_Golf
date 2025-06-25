import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeDetail from "../components/EmployeeDetail"; 
import employees from "../data/employees";
import BookingTable from "../components/BookingTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [tab, setTab] = useState("All");
  const [activePage, setActivePage] = useState("employeeData");
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const filtered = tab === "All" ? employees : employees.filter(e => e.position === tab);

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-6 bg-gray-100">
        <Header activePage={activePage} />

        {activePage === "employeeData" && (
          <>
            {selectedEmployee ? (
              <EmployeeDetail
                employee={selectedEmployee}
                onBack={() => setSelectedEmployee(null)}
              />
            ) : (
              <>
                <Tabs defaultValue="All" value={tab} onValueChange={setTab}>
                  <TabsList className="flex gap-2 mb-4 bg-gray-200 p-2 rounded shadow-inner">
                    {["All", "General", "Admin", "Caddy", "Starter"].map(position => (
                      <TabsTrigger
                        key={position}
                        value={position}
                        className={`px-4 py-2 rounded ${
                          tab === position ? "bg-gray-500 text-white" : "text-black"
                        }`}
                      >
                        {position}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filtered.map((e, i) => (
                    <EmployeeCard key={i} employee={e} onClick={() => setSelectedEmployee(e)} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {activePage === "addEmployee" && <EmployeeForm />}
        {activePage === "booking" && <BookingTable />}

      </div>
    </div>
  );
}
