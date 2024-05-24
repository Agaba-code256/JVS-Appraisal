import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";

export default function Contactcard() {
  return (
    <div className="p-10">
      <Card className="w-full max-w-sm p-5">
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar>
            <AvatarImage alt="Jane Doe" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-lg font-semibold">Jane Doe</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Product Designer
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MailboxIcon className="h-4 w-4" />
              <span>jane.doe@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <PhoneIcon className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          <Button className="ml-auto bg-green-500 text-white">Appraise</Button>
        </CardContent>
      </Card>
    </div>
  );
}

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
