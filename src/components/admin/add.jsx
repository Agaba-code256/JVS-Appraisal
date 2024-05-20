import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Add() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="surname">Surname</Label>
                <Input id="surname" placeholder="Enter your surname" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="givenName">Given name</Label>
                <Input id="givenName" placeholder="Enter your given name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" placeholder="Enter your contact number" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="personnelType">Personnel type</Label>
              <Select>
                <SelectTrigger id="personnelType">
                  <SelectValue placeholder="Select personnel type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="file">File upload</Label>
              <Input id="file" type="file" />
              <div className="mt-2">
                <img
                  alt="Uploaded file preview"
                  className="rounded-md object-cover"
                  height={100}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width={100}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
