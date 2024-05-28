import Navbar from "../navbar";
import Stats from "./stats";
import Register from "../auth/register";
import Adduser from "./addUser";

const Create = () => {
  return (
    <div className="relative bg-white">
      <Navbar />
      <Register />
      <Adduser />
    </div>
  );
};

export default Create;
