import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { database } from "../../firebase/firebase"; // Adjust the import path as needed
import { ref, push, set, get } from "firebase/database";
import { auth } from "../../firebase/firebase";

const attributes = [
  {
    title: "Key Outputs",
    description: "",
  },
  {
    title: "Performance Indicators",
    description: "(How will results be measured)",
  },
  {
    title: "Performance Targets",
    description: "(An agreed minimum level of performance)",
  },
  {
    title: "Appraisee's Rating",
    description: "(Self-rating)",
  },
  {
    title: "Appraiser's rating",
    description: "",
  },
  {
    title: "Agreed Performance Level",
    description: "",
  },
];

export default function Appraisal({ initialEmail = "", onSubmit }) {
  const [email, setEmail] = useState(initialEmail);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to check if the form is already submitted
  const [selectedValues, setSelectedValues] = useState(
    attributes.map(() => null)
  );
  const [comments, setComments] = useState("");
  const [currentQuarter, setCurrentQuarter] = useState(
    calculateCurrentQuarter()
  );
  const [successMessage, setSuccessMessage] = useState("");

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
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    const checkExistingAppraisal = async () => {
      const sanitizedEmail = sanitizeEmail(email);
      const quarterString = `${currentQuarter} quarter`;
      const encodedQuarterString = encodeURIComponent(quarterString);
      const appraisalRef = ref(
        database,
        `EmployeeAppraisal/${encodedQuarterString}-${sanitizedEmail}`
      );

      try {
        const snapshot = await get(appraisalRef);
        if (snapshot.exists()) {
          setIsSubmitted(true); // If data exists, set the form as submitted
        }
      } catch (error) {
        console.error("Error checking existing appraisal:", error);
      }
    };

    checkExistingAppraisal();
  }, [email, currentQuarter]);

  const handleRadioChange = (index, value) => {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const calculateOverallValue = () => {
    const totalSelected = selectedValues
      .filter((value) => value !== null)
      .reduce((acc, val) => acc + parseInt(val), 0);
    const overallValue = (totalSelected / (5 * attributes.length)) * 70;
    return overallValue.toFixed(2);
  };

  const [overallValue, setOverallValue] = useState(calculateOverallValue);

  useEffect(() => {
    setOverallValue(calculateOverallValue());
  }, [selectedValues]);

  const sanitizeEmail = (email) => {
    return email.replace(/[.#$[\]]/g, "_");
  };

  const handleSubmit = () => {
    const sanitizedEmail = sanitizeEmail(email);
    const quarterString = `${currentQuarter} quarter`; // Construct quarter string
    const encodedQuarterString = encodeURIComponent(quarterString);

    const supervisorAppraisalRef = ref(
      database,
      `EmployeeAppraisal/${encodedQuarterString}-${sanitizedEmail}`
    );
    const newDataRef = push(supervisorAppraisalRef);

    const dataToSave = {
      email,
      attributes: attributes.map((attribute, index) => ({
        title: attribute.title,
        description: attribute.description,
        performanceLevel: selectedValues[index],
      })),
      overallValue: calculateOverallValue(),
      comments,
    };

    set(newDataRef, dataToSave)
      .then(() => {
        console.log("Data saved successfully!");
        setSuccessMessage("Data saved successfully!");
        onSubmit(email);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  // Function to determine the current quarter (implementation depends on your needs)
  function calculateCurrentQuarter() {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed

    switch (true) {
      case month < 3:
        return 1; // Q1 (January - March)
      case month < 6:
        return 2; // Q2 (April - June)
      case month < 9:
        return 3; // Q3 (July - September)
      default:
        return 4; // Q4 (October - December)
    }
  }

  return (
    <div className="border rounded-lg w-full max-w-3xl mx-auto p-10 bg-white">
      <div className="mb-4">
        <Label htmlFor="email" className="block mb-2 font-bold">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          className="w-full"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </div>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Attributes</TableHead>
              <TableHead className="w-[20%]">Performance level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attribute, index) => (
              <TableRow key={index}>
                <TableCell>
                  <b>{attribute.title}</b>
                  <br />
                  {attribute.description}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div
                        key={`${index}-${value}`}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          id={`durability-${index}-${value}`}
                          name={`durability-${index}`}
                          value={value.toString()}
                          className="text-green-500"
                          checked={selectedValues[index] === value}
                          onChange={() => handleRadioChange(index, value)}
                          disabled={isSubmitted}
                        />
                        <Label htmlFor={`durability-${index}-${value}`}>
                          {value}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Label htmlFor="comments" className="block mb-2 font-bold">
            Comments on Performance
          </Label>
          <Textarea
            id="comments"
            className="w-full"
            placeholder="Enter your comments (Give work-related example)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={isSubmitted}
          />
        </div>
        <div className="flex justify-end mt-4">
          <span className="text-gray-500 font-bold">Overall Value:</span>
          <span className="ml-2 text-lg font-bold">{overallValue}</span>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            className="bg-green-500 text-white"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            Submit
          </Button>
        </div>
        {isSubmitted && (
          <div className="mt-4 text-red-500 font-bold">
            This employee has already been appraised for this quarter.
          </div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-500 font-bold">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
