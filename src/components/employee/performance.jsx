import React, { useState, useEffect } from "react";
import { database } from "../../firebase/firebase"; // Adjust the import path as needed
import { ref, get } from "firebase/database";
import { auth } from "../../firebase/firebase";

export default function Performance() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [appraisals, setAppraisals] = useState([]);
  const [salary, setSalary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          const decodedEmail = user.email;
          setEmail(decodedEmail);
        }
      } catch (error) {
        setError("Error fetching email. Please login again.");
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!email) return;

      try {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          for (const [key, value] of Object.entries(usersData)) {
            if (value.email === email) {
              setUserId(key);
              setSalary(parseFloat(value.salary));
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [email]);

  useEffect(() => {
    const fetchAppraisals = async () => {
      if (!email) return;

      const sanitizedEmail = email.replace(/[.#$[\]]/g, "_");
      const appraisalTypes = ["EmployeeAppraisal", "SupervisorAppraisal"];
      const allAppraisals = [];

      for (const type of appraisalTypes) {
        try {
          const appraisalsRef = ref(database, `${type}`);
          const snapshot = await get(appraisalsRef);
          if (snapshot.exists()) {
            const appraisalsData = snapshot.val();
            for (const [key, value] of Object.entries(appraisalsData)) {
              if (key.includes(sanitizedEmail)) {
                for (const [id, appraisal] of Object.entries(value)) {
                  allAppraisals.push({
                    quarter: decodeURIComponent(key).split(" ")[0],
                    type,
                    ...appraisal,
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching ${type}:`, error);
        }
      }

      setAppraisals(allAppraisals);
    };

    fetchAppraisals();
  }, [email]);

  const getAppraisalsByQuarter = () => {
    const groupedAppraisals = appraisals.reduce((acc, appraisal) => {
      const { quarter } = appraisal;
      if (!acc[quarter]) {
        acc[quarter] = [];
      }
      acc[quarter].push(appraisal);
      return acc;
    }, {});

    return groupedAppraisals;
  };

  const formatQuarter = (quarter) => {
    switch (quarter) {
      case "1":
        return "1st Quarter";
      case "2":
        return "2nd Quarter";
      case "3":
        return "3rd Quarter";
      case "4":
        return "4th Quarter";
      default:
        return quarter;
    }
  };

  const calculateTotalMarkForQuarter = (quarterAppraisals) => {
    const totalMark = quarterAppraisals.reduce(
      (acc, appraisal) => acc + parseFloat(appraisal.overallValue),
      0
    );
    return totalMark.toFixed(2);
  };

  const calculateBonus = (totalMark) => {
    if (salary === null) return null;
    const bonusPercentage = totalMark / 100;
    const calculatedValue = salary * bonusPercentage;
    const bonus = salary - calculatedValue;
    return Math.round(bonus);
  };

  const appraisalsByQuarter = getAppraisalsByQuarter();

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="border rounded-lg w-full p-10 bg-white">
      <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
      {Object.keys(appraisalsByQuarter).length === 0 ? (
        <div className="text-gray-500">No appraisals found.</div>
      ) : (
        Object.keys(appraisalsByQuarter).map((quarter) => (
          <div key={quarter} className="mb-6">
            <h3 className="text-lg font-bold mb-2">{formatQuarter(quarter)}</h3>
            <div className="w-full max-w-md mx-auto">
              <table className="min-w-full bg-white mb-4 border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Type</th>
                    <th className="py-2 px-4">Overall Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {appraisalsByQuarter[quarter].map((appraisal, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{appraisal.type}</td>
                      <td className="py-2 px-4">{appraisal.overallValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <span className="text-gray-500 font-bold">Total Mark:</span>
              <span className="ml-2 text-lg font-bold">
                {calculateTotalMarkForQuarter(appraisalsByQuarter[quarter])}
              </span>
            </div>
            {salary !== null && (
              <div className="flex justify-end mt-2">
                <span className="text-gray-500 font-bold">Your bonus is:</span>
                <span className="ml-2 text-lg font-bold">
                  {calculateBonus(
                    calculateTotalMarkForQuarter(appraisalsByQuarter[quarter])
                  )}
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
