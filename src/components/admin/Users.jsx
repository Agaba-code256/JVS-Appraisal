import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";

export default function Users() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by personnel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="intern">Intern</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 text-white">
            Add User
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Avatar
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Personnel Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Edit
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-6 py-4">
                <Avatar>
                  <AvatarImage alt="Avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                #001
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                John Doe
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                john.doe@example.com
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                +1 (555) 123-4567
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Manager
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 hover:bg-blue-600 text-white">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-6 py-4">
                <Avatar>
                  <AvatarImage alt="Avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                #002
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Jane Doe
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                jane.doe@example.com
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                +1 (555) 987-6543
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Developer
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 hover:bg-blue-600 text-white">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-6 py-4">
                <Avatar>
                  <AvatarImage alt="Avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                #003
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Bob Smith
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                bob.smith@example.com
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                +1 (555) 555-5555
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Designer
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 hover:bg-blue-600 text-white">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="px-6 py-4">
                <Avatar>
                  <AvatarImage alt="Avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                #004
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Sarah Lee
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                sarah.lee@example.com
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                +1 (555) 123-4567
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                Intern
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 hover:bg-blue-600 text-white">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
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
