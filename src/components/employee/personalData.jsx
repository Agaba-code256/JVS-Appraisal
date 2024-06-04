import { useState, useEffect } from "react";
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
import { database, auth } from "../../firebase/firebase"; // Adjust the import path as needed
import { ref, set, onValue, off } from "firebase/database";

export default function PersonalData() {
  const [formData, setFormData] = useState({
    email: "",
    dateOfBirth: "",
    firstAppointmentText: "",
    firstAppointmentDate: "",
    presentAppointmentText: "",
    presentAppointmentDate: "",
    directorate: "",
    department: "",
    appraisalPeriod: "",
    supervisor: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          const decodedEmail = user.email;
          setFormData((prevData) => ({
            ...prevData,
            email: decodedEmail,
          }));
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    const fetchSupervisors = () => {
      const usersRef = ref(database, "users");
      onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        if (users) {
          const supervisorUsers = Object.entries(users)
            .filter(([id, user]) => user.personnelType === "supervisor")
            .map(([id, user]) => ({ id, ...user }));
          console.log("Supervisors fetched:", supervisorUsers); // Debugging line
          setSupervisors(supervisorUsers);
        }
      });
    };

    fetchEmail();
    fetchSupervisors();

    return () => {
      const usersRef = ref(database, "users");
      off(usersRef);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    console.log(`Selected supervisor ID: ${value}`); // Debugging line
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const newEmployeeRef = ref(database, "personnelData/" + formData.surname);
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
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
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
                {supervisors.map((supervisor) => (
                  <SelectItem key={supervisor.id} value={supervisor.id}>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          alt={`${supervisor.surname} ${supervisor.givenName}`}
                          src={supervisor.imageUrl}
                        />
                        <AvatarFallback>{supervisor.surname[0]}</AvatarFallback>
                      </Avatar>
                      <div>{`${supervisor.surname} ${supervisor.givenName}`}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
