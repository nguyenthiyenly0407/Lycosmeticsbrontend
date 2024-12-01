import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/dashboard";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "15px", margin: "0 auto", height: "auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h3>

      <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "100%" }}
        />
      </div>

      <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "100%" }}
        />
      </div>

      <div className="d-grid" style={{ marginTop: "15px" }}>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%" }}>
          Submit
        </button>
      </div>



      <SignInwithGoogle />
    </form>
  );
}

export default Login;
