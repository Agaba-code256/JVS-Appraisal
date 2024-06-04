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
  ref as dbRef,
  onValue,
  off,
  remove,
  update,
  imgDB,
  uploadBytes,
  getDownloadURL,
  storageRef as storageRef,
} from "../../firebase/firebase";
import { push, child } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function Technical() {
  const [courses, setCourses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const decodedEmail = currentUser.email.replace(/[.#$/[\]]/g, "_");
        const coursesRef = dbRef(database, `Growth-${decodedEmail}`);
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
      }
    };

    fetchData();
  }, []);

  const addRow = async () => {
    const newCourse = { name: "", duration: "", institution: "", fileURL: "" };
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const decodedEmail = currentUser.email.replace(/[.#$/[\]]/g, "_");
      const newCourseRef = push(
        child(dbRef(database), `Growth-${decodedEmail}`)
      );
      await update(newCourseRef, newCourse);
      setCourses([...courses, { ...newCourse, id: newCourseRef.key }]);
    }
  };

  const removeRow = async (index) => {
    const courseToDelete = courses[index];
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const decodedEmail = currentUser.email.replace(/[.#$/[\]]/g, "_");
      await remove(
        dbRef(database, `Growth-${decodedEmail}/${courseToDelete.id}`)
      );
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = async (value, index, field) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const decodedEmail = currentUser.email.replace(/[.#$/[\]]/g, "_");
      await update(
        dbRef(database, `Growth-${decodedEmail}/${updatedCourses[index].id}`),
        {
          [field]: value,
        }
      );
    }
  };

  const handleFileUpload = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const fileRef = storageRef(
        imgDB,
        `courses/${courses[index].id}/${file.name}`
      );
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      console.log("File available at", fileURL); // Log the download URL

      const updatedCourses = [...courses];
      updatedCourses[index].fileURL = fileURL;
      setCourses(updatedCourses);
      setIsUploading(false);
      // Not updating the database here; it will be done in saveCourses
    }
  };

  const saveCourses = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const decodedEmail = currentUser.email.replace(/[.#$/[\]]/g, "_");
      const updates = {};
      courses.forEach((course) => {
        updates[`Growth-${decodedEmail}/${course.id}`] = course;
      });
      await update(dbRef(database), updates);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Hide the success message after 3 seconds
    }
  };

  return (
    <>
      <div className="border rounded-lg w-full p-10 bg-white">
        <div className="relative w-full overflow-auto bg-white">
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
                    {course.fileURL ? (
                      <Button
                        size="icon"
                        variant="outline"
                        className="bg-blue-500 text-white"
                        onClick={() => window.open(course.fileURL, "_blank")}
                      >
                        <DownloadIcon className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    ) : (
                      <>
                        <Input
                          type="file"
                          onChange={(e) => handleFileUpload(e, index)}
                        />
                        {isUploading && <span>Uploading...</span>}
                      </>
                    )}
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
      <div className="flex justify-center mt-4 gap-2 bg-white">
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
      {isSaved && (
        <div className="flex justify-center mt-4">
          <span className="text-green-500">Courses saved successfully!</span>
        </div>
      )}
    </>
  );
}

function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
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
