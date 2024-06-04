import { useState, useEffect } from "react";
import { database, ref, onValue, off } from "../../firebase/firebase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestTable from "./testTable"; // Adjust the import path as needed

function MailboxIcon(props) {
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
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      <polyline points="15,9 18,9 18,11" />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ContactCard({ user, onAppraiseClick }) {
  return (
    <Card
      className="w-full max-w-sm"
      onClick={() => onAppraiseClick(user.email)}
    >
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              alt={`${user.givenName} ${user.surname}`}
              src={user.imageUrl || "/placeholder-avatar.jpg"}
            />
            <AvatarFallback>
              {user.givenName[0] + user.surname[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="text-lg font-semibold truncate">
              {user.givenName} {user.surname}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {user.personnelType}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 truncate">
          <MailboxIcon className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 truncate">
          <PhoneIcon className="h-4 w-4" />
          <span>{user.contact}</span>
        </div>
        <Button
          className={`ml-auto text-white mt-4 ${
            user.appraised ? "bg-green-500" : "bg-gray-800"
          }`}
        >
          {user.appraised ? "Appraised" : "Appraise"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ContactCardList() {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, "users");

    const fetchData = async () => {
      try {
        onValue(usersRef, (snapshot) => {
          const usersData = snapshot.val();
          if (usersData) {
            const usersArray = Object.keys(usersData)
              .map((key) => ({
                id: key,
                ...usersData[key],
              }))
              .filter((user) => user.personnelType === "employee"); // Filter users based on personnelType
            setUsers(usersArray);
          } else {
            setUsers([]);
          }
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();

    return () => {
      off(usersRef);
    };
  }, []);

  const handleAppraiseClick = (email) => {
    setSelectedEmail(email);
  };

  const handleAppraiseSubmit = (email) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, appraised: true } : user
      )
    );
    setSelectedEmail(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedEmail ? (
        <TestTable email={selectedEmail} onSubmit={handleAppraiseSubmit} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <ContactCard
              key={user.id}
              user={user}
              onAppraiseClick={handleAppraiseClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
