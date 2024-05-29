import React, { useState, useEffect } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  database,
  ref,
  onValue,
  remove,
  update,
} from "../../firebase/firebase";
import { push, child } from "firebase/database";

export default function Technical() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesRef = ref(database, "Growth");
      onValue(coursesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const coursesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setCourses(coursesArray);
        }
      });

      // Cleanup subscription on unmount
      return () => off(coursesRef);
    };

    fetchData();
  }, []);

  const addRow = async () => {
    const newCourse = { name: "", duration: "", institution: "" };
    const newCourseRef = push(child(ref(database), "Growth"));
    await update(newCourseRef, newCourse);
    setCourses([...courses, { ...newCourse, id: newCourseRef.key }]);
  };

  const removeRow = async (index) => {
    const courseToDelete = courses[index];
    await remove(ref(database, `Growth/${courseToDelete.id}`));
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleInputChange = async (value, index, field) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
    await update(ref(database, `Growth/${updatedCourses[index].id}`), {
      [field]: value,
    });
  };

  const saveCourses = async () => {
    const updates = {};
    courses.forEach((course) => {
      updates[`Growth/${course.id}`] = course;
    });
    await update(ref(database), updates);
  };

  return (
    <>
      <div className="border rounded-lg w-full p-10">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Input
                      value={course.name}
                      onChange={(e) =>
                        handleInputChange(e.target.value, index, "name")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.duration}
                      onChange={(e) =>
                        handleInputChange(e.target.value, index, "duration")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.institution}
                      onChange={(e) =>
                        handleInputChange(e.target.value, index, "institution")
                      }
                    />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="bg-blue-500 text-white"
                      // Add any desired edit functionality here
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="bg-red-500 text-white"
                      onClick={() => removeRow(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <Button
          variant="outline"
          className="hover:bg-green-500 text-black"
          onClick={saveCourses}
        >
          Save
        </Button>
        <Button
          variant="outline"
          className="hover:bg-green-500 text-black"
          onClick={addRow}
        >
          Add
        </Button>
      </div>
    </>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
