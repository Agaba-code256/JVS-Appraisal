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
import { ref, push, set } from "firebase/database";
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

  const [selectedValues, setSelectedValues] = useState(
    attributes.map(() => null)
  );
  const [comments, setComments] = useState("");

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

  const handleSubmit = () => {
    const supervisorAppraisalRef = ref(database, "EmployeeAppraisal");
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
        onSubmit(email);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className="border rounded-lg w-full p-10 bg-white">
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
          />
        </div>
        <div className="flex justify-end mt-4">
          <span className="text-gray-500 font-bold">Overall Value:</span>
          <span className="ml-2 text-lg font-bold">{overallValue}</span>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="bg-green-500 text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
