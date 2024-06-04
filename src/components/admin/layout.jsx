import Users from "./Users";
import ANavbar from "./adminNavbar";

const Layout = () => {
  return (
    <div className="relative bg-white">
      <ANavbar />
      <Users />
    </div>
  );
};

export default Layout;
