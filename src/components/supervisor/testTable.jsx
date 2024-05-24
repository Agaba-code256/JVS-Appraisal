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
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const attributes = [
  {
    title: "Behavioural Competences",
    description: "Self-management and related factors influencing performance",
  },
  {
    title: "Honesty and Integrity",
    description:
      "Displays and builds the highest standards of ethical and moral conduct...",
  },
  {
    title: "Professionalism",
    description:
      "Draws from own experience, knowledge and expertise to demonstrate good judgment...",
  },
];

export default function TestTable() {
  const [selectedValues, setSelectedValues] = useState(
    attributes.map(() => null) // Initialize with null values for each attribute
  );

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
    const overallValue = (totalSelected / (5 * attributes.length)) * 30;
    return overallValue.toFixed(2); // Format to two decimal places
  };

  const [overallValue, setOverallValue] = useState(calculateOverallValue);

  useEffect(() => {
    setOverallValue(calculateOverallValue());
  }, [selectedValues]);

  const handleSubmit = () => {
    // Implement submit functionality here
    console.log("Form submitted with values:", selectedValues);
  };

  return (
    <div className="border rounded-lg w-full p-10">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Attributes</TableHead>
              <TableHead className="w-[20%]">Performance level</TableHead>
              <TableHead className="w-[40%]">Improvement plan</TableHead>
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
                <TableCell>
                  <Textarea className="w-full" placeholder="Enter your plan" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
