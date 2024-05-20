import React from "react";
import placeholder from "../images/placeholder.png";

export default function Adduser() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[500px] bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Create user account</h2>
            <p className="text-sm text-gray-600">
              Image uploads must be in png format.
            </p>
          </div>
          <form>
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
                    placeholder="Enter your contact number"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  htmlFor="personnelType"
                  className="text-sm font-medium text-gray-700"
                >
                  Personnel type
                </label>
                <select
                  id="personnelType"
                  className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="" disabled selected>
                    Select personnel type
                  </option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                  <option value="contractor">Contractor</option>
                  <option value="intern">Intern</option>
                </select>
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
                  className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <div className="mt-2">
                  <img
                    alt="Uploaded file preview"
                    className="rounded-md object-cover"
                    height={100}
                    src={placeholder}
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    width={100}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-between p-6 border-t border-gray-200">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
