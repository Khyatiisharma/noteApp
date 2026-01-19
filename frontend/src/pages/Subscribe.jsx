// import API from "../api/axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";

// export default function Subscribe() {
//   const dispatch = useDispatch();

//   // const buy = async () => {
//   //   const res = await API.post("/user/subscribe");
//   //   dispatch(setUser(res.data.user));
//   //   alert("Premium Activated");
//   // };

//   const res = await API.post("/user/subscribe");

// localStorage.setItem("token", res.data.token);
// dispatch(setUser(res.data.user));

// alert("Premium Activated 🎉");
// navigate("/dashboard");
//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Buy Premium</h2>
//       <button onClick={buy} className="btn bg-yellow-500">
//         Buy for ₹199
//       </button>
//     </div>
//   );
// }

import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Subscribe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Button click handler
  const buy = async () => {
    try {
      const res = await API.post("/user/subscribe");

      // ✅ NEW TOKEN SET
      localStorage.setItem("token", res.data.token);

      // ✅ USER UPDATE
      dispatch(setUser(res.data.user));

      alert("Premium Activated 🎉");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Buy Premium</h2>

      <button onClick={buy} className="btn bg-yellow-500">
        Buy for ₹199
      </button>
    </div>
  );
}
