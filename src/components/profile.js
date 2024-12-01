import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="auth-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="auth-inner" style={{ textAlign: "center", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", width: "100%", maxWidth: "400px" }}>
        {userDetails ? (
          <>
            <div style={{ marginBottom: "20px" }}>
              <img
                src={userDetails.photo}
                width={"40%"}
                style={{ borderRadius: "50%" }}
                alt="User profile"
              />
            </div>
            <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
            <div style={{ marginBottom: "20px" }}>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
            </div>
            <button className="btn btn-primary" onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "5px" }}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
