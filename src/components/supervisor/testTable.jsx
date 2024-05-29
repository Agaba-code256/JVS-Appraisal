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
import { database } from "../../firebase/firebase"; // Adjust the import path as needed
import { ref, push, set } from "firebase/database";

const attributes = [
  {
    title: "Honesty and Integrity",
    description:
      "Displays and builds the highest standards of ethical and moral conduct in order to promote confidence and trust in Public Service, communicates values to others, monitors own actions for consistency with values and beliefs, does not divulge confidential information to un authorized people, is open and honest and provides quality service without need for inducements.",
  },
  {
    title: "Professionalism",
    description:
      "Draws from own experience, knowledge and expertise to demonstrate good judgment and relates professional knowledge to work.",
  },
  {
    title: "Objectivity",
    description:
      "Makes a balanced assessment of all relevant circumstances, is impartial, honest, and unduly influenced by own interest or by others in forming judgments.",
  },
  {
    title: "Customer Service",
    description:
      "Treats all customers with respect, responds to customer needs within agreed time frames, addresses customer concerns and problem situations with patience and tact. ",
  },
  {
    title: "Interpersonal / Social Skills",
    description:
      "Exhibits cordial relationship with Clients (internal/external) Commands respect and trust, Exhibits cordial relationship with supervisors.",
  },
  {
    title: "Communication",
    description:
      "Actively listens and speaks respectfully, exchanges information in a clear manner, expresses self clearly both orally   and in writing, able to present issues in a convincing manner.",
  },
  {
    title: "Creativity  and innovation",
    description:
      "Provides practical solutions to problems, makes useful suggestions for improvements, forward thinking, keen to seek and grasp new opportunities and ideas.",
  },
  {
    title: "Time Management ",
    description:
      "Adheres to schedules; Is effective in setting priorities; manages time well, completes work assignment on time.",
  },
  {
    title: "People management and Empathy ",
    description:
      "Manages and respects diversity, respects  divergent views irrespective of the source, engages  others to develop commitment, appreciates  other’s efforts and puts self in the position of others.",
  },
  {
    title: "Leadership",
    description:
      "Keeps people informed, models and encourages personal accountability, develops others, champions new ideas, reinforces and communicates a compelling vision for change.",
  },
  {
    title: "Team work",
    description:
      "Works cooperatively and collaboratively; builds strong teams, shares resources and develops processes to improve the efficiency of the team, listens and respects others and does his/her share of work.",
  },
];

export default function TestTable({ email, onSubmit }) {
  const [selectedValues, setSelectedValues] = useState(
    attributes.map(() => null) // Initialize with null values for each attribute
  );
  const [improvementPlans, setImprovementPlans] = useState(
    attributes.map(() => "") // Initialize with empty strings for each attribute
  );
  const [comments, setComments] = useState(""); // State for comments

  const handleRadioChange = (index, value) => {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleImprovementPlanChange = (index, value) => {
    setImprovementPlans((prevPlans) => {
      const newPlans = [...prevPlans];
      newPlans[index] = value;
      return newPlans;
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
    const supervisorAppraisalRef = ref(database, "SupervisorAppraisal");
    const newDataRef = push(supervisorAppraisalRef);

    const dataToSave = {
      email, // Include email in the data to be saved
      attributes: attributes.map((attribute, index) => ({
        title: attribute.title,
        description: attribute.description,
        performanceLevel: selectedValues[index],
        improvementPlan: improvementPlans[index],
      })),
      overallValue: calculateOverallValue(),
      comments, // Include comments in the data to be saved
    };

    set(newDataRef, dataToSave)
      .then(() => {
        console.log("Data saved successfully!");
        onSubmit(email); // Notify parent component of submission
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
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
                  <Textarea
                    className="w-full"
                    placeholder="Enter your plan"
                    value={improvementPlans[index]}
                    onChange={(e) =>
                      handleImprovementPlanChange(index, e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Label htmlFor="comments" className="block mb-2 font-bold">
            Comments and Recommendations
          </Label>
          <Textarea
            id="comments"
            className="w-full"
            placeholder="Enter your comments and recommendations"
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
