import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { v4 } from "uuid";
import { imgDB, database } from "../../firebase/firebase"; // Adjust the import path as needed
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth";
import placeholder from "../images/placeholder.png";

export default function Adduser() {
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [personnelType, setPersonnelType] = useState("");
  const [salary, setSalary] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploading(true);
      const imgRef = ref(imgDB, `Imgs/${v4()}`);
      uploadBytes(imgRef, selectedFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImgURL(url);
            console.log("File URL:", url);
            setUploading(false);
          });
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
          setUploading(false);
        });
    }
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let generatedPassword = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    return generatedPassword;
  };

  const handleCreateAccount = async (email, password) => {
    setMessage(null);
    setError(null);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setMessage("Account created successfully!");
      console.log(`Email: ${email}, Password: ${password}`);
    } catch (error) {
      setError("Failed to create account: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      surname &&
      givenName &&
      contact &&
      email &&
      personnelType &&
      salary &&
      imgURL
    ) {
      setSubmitting(true);
      const userId = v4();
      const password = generatePassword(); // Generate password

      try {
        await set(dbRef(database, `users/${userId}`), {
          surname,
          givenName,
          contact,
          email,
          personnelType,
          salary,
          imageUrl: imgURL,
        });
        console.log("Data saved successfully!");

        // Create account
        await handleCreateAccount(email, password);

        // Reset form
        setSurname("");
        setGivenName("");
        setContact("");
        setEmail("");
        setPersonnelType("");
        setSalary("");
        setImgURL("");
        setFile(null);

        setMessage("User added successfully!");
      } catch (error) {
        console.error("Error saving data: ", error);
        setError("Failed to add user: " + error.message);
      } finally {
        setSubmitting(false);
        // Refresh the page
        window.location.reload();
      }
    } else {
      alert("Please fill out all fields and upload an image.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="border-none w-[700px] bg-white">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">User Details</h2>
            <p className="text-sm text-gray-600">
              Make sure emails match above and below.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="surname"
                    className="text-sm font-medium text-gray-700"
                  >
                    Surname
                  </label>
                  <input
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter your surname"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="givenName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Given name
                  </label>
                  <input
                    id="givenName"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                    placeholder="Enter your given name"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="contact"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contact
                  </label>
                  <input
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter your contact number"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="Email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="personnelType"
                    className="text-sm font-medium text-gray-700"
                  >
                    Personnel type
                  </label>
                  <select
                    id="personnelType"
                    value={personnelType}
                    onChange={(e) => setPersonnelType(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="" disabled>
                      Select personnel type
                    </option>
                    <option value="executive">Executive</option>
                    <option value="employee">Employee</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="salary"
                    className="text-sm font-medium text-gray-700"
                  >
                    Salary
                  </label>
                  <input
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Enter personnel salary"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  htmlFor="file"
                  className="text-sm font-medium text-gray-700"
                >
                  File upload
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <div className="mt-2">
                  <img
                    alt="Uploaded file preview"
                    className="rounded-md object-cover"
                    height={100}
                    src={imgURL || placeholder}
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    width={100}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  // Reset form
                  setSurname("");
                  setGivenName("");
                  setContact("");
                  setEmail("");
                  setPersonnelType("");
                  setImgURL("");
                  setFile(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded-md"
                disabled={uploading || submitting}
              >
                {submitting ? "Submitting..." : "Create"}
              </button>
            </div>
          </form>
          {message && (
            <div className="mb-4 text-green-500 bg-green-100 p-2 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-500 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
