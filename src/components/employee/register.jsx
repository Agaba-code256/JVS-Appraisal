import { useState } from "react";
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
import placeholder from "../images/placeholder.png";
import { database } from "../../firebase/firebase"; // Adjust the import path as needed
import { ref, set } from "firebase/database";

export default function Component() {
  const [formData, setFormData] = useState({
    email: "",
    dateOfBirth: "",
    personnelType: "",
    firstAppointmentText: "",
    firstAppointmentDate: "",
    presentAppointmentText: "",
    presentAppointmentDate: "",
    directorate: "",
    department: "",
    appraisalPeriod: "",
    supervisor: "",
  });

  const [profilePicture, setProfilePicture] = useState(placeholder);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const newEmployeeRef = ref(database, "users/" + formData.surname);
      await set(newEmployeeRef, formData);
      setLoading(false);
      setAlert({ type: "success", message: "Data saved successfully!" });
    } catch (error) {
      setLoading(false);
      setAlert({ type: "error", message: "Failed to save data." });
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Personnel Information
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to update your personnel details.
        </p>
      </div>
      {alert.message && (
        <div
          className={`p-4 mb-4 text-sm ${
            alert.type === "success"
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          } rounded-lg`}
        >
          {alert.message}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              placeholder="Enter your surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="givenNames">Given Names</Label>
            <Input
              id="givenNames"
              placeholder="Enter your given names"
              value={formData.givenNames}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personnelType">Personnel Type</Label>
            <Select
              id="personnelType"
              onValueChange={(value) =>
                handleSelectChange("personnelType", value)
              }
              value={formData.personnelType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select personnel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstAppointmentText">First Appointment</Label>
            <Input
              id="firstAppointmentText"
              placeholder="Enter first appointment"
              value={formData.firstAppointmentText}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstAppointmentDate">Date</Label>
            <Input
              id="firstAppointmentDate"
              type="date"
              value={formData.firstAppointmentDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="presentAppointmentText">Present Appointment</Label>
            <Input
              id="presentAppointmentText"
              placeholder="Enter present appointment"
              value={formData.presentAppointmentText}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentAppointmentDate">Date</Label>
            <Input
              id="presentAppointmentDate"
              type="date"
              value={formData.presentAppointmentDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="directorate">Directorate</Label>
            <Input
              id="directorate"
              placeholder="Enter your directorate"
              value={formData.directorate}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="Enter your department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="appraisalPeriod">Appraisal Period</Label>
            <Input
              id="appraisalPeriod"
              placeholder="Enter appraisal period"
              value={formData.appraisalPeriod}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supervisor">Select Supervisor</Label>
            <Select
              id="supervisor"
              onValueChange={(value) => handleSelectChange("supervisor", value)}
              value={formData.supervisor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supervisor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        alt="                       John Doe"
                        src="/avatars/01.png"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>John Doe</div>
                  </div>
                </SelectItem>
                <SelectItem value="jane-smith">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Jane Smith" src="/avatars/02.png" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>Jane Smith</div>
                  </div>
                </SelectItem>
                <SelectItem value="bob-johnson">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage alt="Bob Johnson" src="/avatars/03.png" />
                      <AvatarFallback>BJ</AvatarFallback>
                    </Avatar>
                    <div>Bob Johnson</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Input
                id="profile-picture"
                type="file"
                onChange={handleImageUpload}
              />
              <img
                alt="Profile Picture"
                className="rounded-full"
                height={100}
                src={profilePicture}
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width={100}
              />
            </div>
          </div>
        </div> */}
        <div className="flex justify-end">
          <Button type="submit">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
