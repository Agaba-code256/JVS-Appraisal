import { useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SupeTable() {
  const [ratings, setRatings] = useState({
    behaviouralCompetences: 0,
    honestyIntegrity: 0,
    professionalism: 0,
    objectivity: 0,
    customerService: 0,
    interpersonalSkills: 0,
    communication: 0,
    creativityInnovation: 0,
    timeManagement: 0,
    peopleManagementEmpathy: 0,
    leadership: 0,
    teamwork: 0,
  });

  const handleRadioChange = (attribute, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [attribute]: parseInt(value),
    }));
  };

  const attributesCount = Object.keys(ratings).length;
  const totalRating = Object.values(ratings).reduce(
    (acc, rating) => acc + rating,
    0
  );
  const overallValue = (totalRating / (5 * attributesCount)) * 30;

  const renderRadioGroup = (attribute) => (
    <RadioGroup
      aria-label={`${attribute} Rank`}
      className="flex items-center gap-2"
      value={ratings[attribute]}
      onChange={(e) => handleRadioChange(attribute, e.target.value)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`${attribute}-${i + 1}`}>
          <RadioGroupItem
            id={`${attribute}-${i + 1}`}
            value={i + 1}
            className="text-green-500"
            checked={ratings[attribute] === i + 1}
            onChange={(e) => handleRadioChange(attribute, e.target.value)}
          />
          <Label htmlFor={`${attribute}-${i + 1}`}>{i + 1}</Label>
        </div>
      ))}
    </RadioGroup>
  );

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
            <TableRow>
              <TableCell>
                <b>Behavioural Competences:</b>
                <br />
                Self-management and related factors influencing performance
              </TableCell>
              <TableCell>
                {renderRadioGroup("behaviouralCompetences")}
              </TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Honesty and Integrity:</b>
                <br />
                Displays and builds the highest standards of ethical and moral
                conduct in order to promote confidence and trust in Public
                Service, communicates values to others, monitors own actions for
                consistency with values and beliefs, does not divulge
                confidential information to un authorized people, is open and
                honest and provides quality service without need for
                inducements.
              </TableCell>
              <TableCell>{renderRadioGroup("honestyIntegrity")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Professionalism:</b>
                <br />
                Draws from own experience, knowledge and expertise to
                demonstrate good judgment and relates professional knowledge to
                work.
              </TableCell>
              <TableCell>{renderRadioGroup("professionalism")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Objectivity:</b>
                <br />
                Makes a balanced assessment of all relevant circumstances, is
                impartial, honest, and unduly influenced by own interest or by
                others in forming judgments.
              </TableCell>
              <TableCell>{renderRadioGroup("objectivity")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Customer Service:</b>
                <br />
                Treats all customers with respect, responds to customer needs
                within agreed time frames, addresses customer concerns and
                problem situations with patience and tact.
              </TableCell>
              <TableCell>{renderRadioGroup("customerService")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Interpersonal / Social Skills:</b>
                <br />
                Exhibits cordial relationship with Clients (internal/external)
                Commands respect and trust, Exhibits cordial relationship with
                supervisors.
              </TableCell>
              <TableCell>{renderRadioGroup("interpersonalSkills")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Communication:</b>
                <br />
                Actively listens and speaks respectfully, exchanges information
                in a clear manner, expresses self clearly both orally and in
                writing, able to present issues in a convincing manner.
              </TableCell>
              <TableCell>{renderRadioGroup("communication")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Creativity and innovation:</b>
                <br />
                Provides practical solutions to problems, makes useful
                suggestions for improvements, forward thinking, keen to seek and
                grasp new opportunities and ideas.
              </TableCell>
              <TableCell>{renderRadioGroup("creativityInnovation")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Time Management:</b>
                <br />
                Adheres to schedules; Is effective in setting priorities;
                manages time well, completes work assignment on time.
              </TableCell>
              <TableCell>{renderRadioGroup("timeManagement")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>People management and Empathy:</b>
                <br />
                Manages and respects diversity, respects divergent views
                irrespective of the source, engages others to develop
                commitment, appreciates other’s efforts and puts self in the
                position of others.
              </TableCell>
              <TableCell>
                {renderRadioGroup("peopleManagementEmpathy")}
              </TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Leadership:</b>
                <br />
                Keeps people informed, models and encourages personal
                accountability, develops others, champions new ideas, reinforces
                and communicates a compelling vision for change.
              </TableCell>
              <TableCell>{renderRadioGroup("leadership")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Team work:</b>
                <br />
                Works cooperatively and collaboratively; builds strong teams,
                shares resources and develops processes to improve the
                efficiency of the team, listens and respects others and does
                his/her share of work.
              </TableCell>
              <TableCell>{renderRadioGroup("teamwork")}</TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Enter your plan" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button className="bg-green-500 text-white">Submit</Button>
        </div>
        <div className="mt-4">
          <p>
            <b>Overall Value: </b>
            {overallValue.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
