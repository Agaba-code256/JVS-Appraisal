import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "../../firebase/firebase"; // Adjust the import path as needed
import EmployeeCard from "./employeeCard";

export default function EmployeeCardList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, "users");
    const employeeAppraisalsRef = ref(database, "EmployeeAppraisal");
    const supervisorAppraisalsRef = ref(database, "SupervisorAppraisal");

    const fetchData = async () => {
      try {
        onValue(usersRef, (snapshot) => {
          const usersData = snapshot.val();
          if (usersData) {
            const usersArray = Object.keys(usersData).map((key) => ({
              id: key,
              ...usersData[key],
            }));

            // Filter users whose personnelType is 'employee'
            const filteredUsers = usersArray.filter(
              (user) => user.personnelType === "employee"
            );

            onValue(employeeAppraisalsRef, (snapshot) => {
              const employeeAppraisalsData = snapshot.val();
              onValue(supervisorAppraisalsRef, (snapshot) => {
                const supervisorAppraisalsData = snapshot.val();
                const combinedData = filteredUsers.map((user) => {
                  const employeeAppraisal = employeeAppraisalsData
                    ? Object.values(employeeAppraisalsData).find(
                        (appraisal) => appraisal.email === user.email
                      )
                    : null;
                  const supervisorAppraisal = supervisorAppraisalsData
                    ? Object.values(supervisorAppraisalsData).find(
                        (appraisal) => appraisal.email === user.email
                      )
                    : null;
                  const employeeOverallValue = employeeAppraisal
                    ? parseFloat(employeeAppraisal.overallValue) || 0
                    : 0;
                  const supervisorOverallValue = supervisorAppraisal
                    ? parseFloat(supervisorAppraisal.overallValue) || 0
                    : 0;
                  const totalAppraisalScore = (
                    employeeOverallValue + supervisorOverallValue
                  ).toFixed(1);
                  return {
                    ...user,
                    appraisalScore: totalAppraisalScore,
                  };
                });

                setUsers(combinedData);
              });
            });
          } else {
            setUsers([]);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      off(usersRef);
      off(employeeAppraisalsRef);
      off(supervisorAppraisalsRef);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <EmployeeCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
