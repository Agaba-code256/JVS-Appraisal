import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <section className="w-full max-w-2xl mx-auto py-8 px-4 md:px-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Data</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" placeholder="Enter your surname" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="given-names">Given Names</Label>
            <Input id="given-names" placeholder="Enter your given names" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-of-birth">Date of Birth</Label>
            <Input id="date-of-birth" type="date" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-appointment">First Appointment</Label>
            <Input id="first-appointment" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="first-appointment-date">Date</Label>
            <Input id="first-appointment-date" type="date" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="present-appointment">Present Appointment</Label>
            <Input id="present-appointment" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="present-appointment-date">Date</Label>
            <Input id="present-appointment-date" type="date" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="directorate">Directorate</Label>
          <Input id="directorate" placeholder="Enter your directorate" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="Enter your department" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appraisal-period">Appraisal Period</Label>
            <Input id="appraisal-period" type="date" />
          </div>
        </div>
        <div className="space-y-2 ">
          <Label htmlFor="supervisor">Select Supervisor</Label>
          <Select id="supervisor">
            <SelectTrigger>
              <SelectValue placeholder="Select supervisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
              </SelectItem>
              <SelectItem value="jane-smith">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      alt="Jane Smith"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <span>Jane Smith</span>
                </div>
              </SelectItem>
              <SelectItem value="bob-johnson">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      alt="Bob Johnson"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>BJ</AvatarFallback>
                  </Avatar>
                  <span>Bob Johnson</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full bg-green-500 text-white rounded-md hover:bg-green-600"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </section>
  );
}
