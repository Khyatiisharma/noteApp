import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const res = await API.post("/user/login", {
      email: form.email.value,
      password: form.password.value,
    });

    localStorage.setItem("token", res.data.token);
    dispatch(setUser(res.data.user));
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={submit} className="p-6 bg-white shadow rounded w-96">
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input name="email" placeholder="Email" className="input" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        <button className="btn">Login</button>
        {/* 👇 ADD THIS */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
