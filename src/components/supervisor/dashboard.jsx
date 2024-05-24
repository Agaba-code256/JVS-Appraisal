import Contactcard from "./contactCard";
import Navbar from "../navbar";

const Dashboard = () => {
  return (
    <div className="relative bg-white">
      <Navbar />
      <Contactcard />

      {/* Adding green cloud-like spots */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-200 rounded-full opacity-20 transform translate-x-20 translate-y-20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full opacity-20 transform translate-x-24 translate-y-24"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-green-100 rounded-full opacity-20 transform translate-x-28 translate-y-28"></div>

      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-200 rounded-full opacity-20 transform -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 transform -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-100 rounded-full opacity-20 transform -translate-x-28 -translate-y-28"></div>
    </div>
  );
};

export default Dashboard;
