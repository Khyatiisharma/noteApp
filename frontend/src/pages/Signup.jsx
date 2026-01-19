// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     await API.post("/user/signup", {
//       name: form.name.value,
//       email: form.email.value,
//       password: form.password.value,
//     });

//     alert("Signup successful");
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-[#f5f7fa]">
//       <form onSubmit={submit} className="p-6 bg-white shadow rounded w-96">
//         <h2 className="text-xl mb-4 font-bold">Signup</h2>
//         <input name="name" placeholder="Name" className="input" />
//         <input name="email" placeholder="Email" className="input" />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="input"
//         />
//         <button className="btn">Signup</button>
//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/user/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="card p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input name="name" placeholder="Name" className="input" />
        <input name="email" placeholder="Email" className="input" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />

        <button className="btn">Signup</button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
