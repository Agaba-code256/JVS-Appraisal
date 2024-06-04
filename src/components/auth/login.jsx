import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get the idToken (optional)
      const idToken = await user.getIdToken();
      localStorage.setItem("idToken", idToken);

      // Fetch user data from the Realtime Database
      const db = getDatabase();
      const dbRef = ref(db, "users");
      const userQuery = query(dbRef, orderByChild("email"), equalTo(email));
      const snapshot = await get(userQuery);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
        const personnelType = userData[userId].personnelType;

        switch (personnelType) {
          case "supervisor":
            navigate("/supervisor");
            break;
          case "employee":
            navigate("/employee");
            break;
          case "administrator":
            navigate("/admin");
            break;
          case "executive":
            navigate("/HR");
            break;
          default:
            setLoginError("Invalid personnel type");
        }
      } else {
        setLoginError("No user data found");
        console.error("No user data found for email:", email);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <img src={logo} alt="Logo" className="mx-auto h-12 w-24" />
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-gray-800 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              required
            />
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
