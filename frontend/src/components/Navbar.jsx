import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((s) => s.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-blue-950 text-white">
      {/* LOGO */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        📝 SmartNotes
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user?.name} ({user?.role === "premium" ? "Premium 👑" : "Free"})
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
