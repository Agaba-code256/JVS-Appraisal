import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailList() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Stay up to date
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Subscribe to our newsletter to get the latest updates.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-md space-y-4">
        <form className="flex items-center space-x-2">
          <Input
            className="flex-1"
            placeholder="Enter your email"
            type="email"
          />
          <Button type="submit">Subscribe</Button>
        </form>
        <div className="rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-lg font-medium">Subscribed Emails</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-between">
              <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                john@example.com
              </div>
              <Button size="icon" variant="ghost">
                <XIcon className="h-4 w-4" />
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                jane@example.com
              </div>
              <Button size="icon" variant="ghost">
                <XIcon className="h-4 w-4" />
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                bob@example.com
              </div>
              <Button size="icon" variant="ghost">
                <XIcon className="h-4 w-4" />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
