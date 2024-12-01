import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css"; // Thêm CSS nếu cần

import { DealsContext } from "./DealsContext";
const Dashboard = () => {
  const [deal, setDeal] = useState({
    amount: "",
    closedate: "",
    dealname: "",
    pipeline: "default", // Để mặc định là "default"
    dealstage: "appointmentScheduled", // Để mặc định là "appointmentScheduled"
  });
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Các stage có thể thay đổi theo nhu cầu
  const stages = [
  "appointmentscheduled", // Thay đổi thành chữ thường
    "qualifiedtobuy",
    "presentationscheduled",
    "decisionmakerboughtin",
    "contractsent",
    "closedwon",
    "closedlost",
  ];

  // Fetch deals từ backend (proxy request tới HubSpot API)
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getdeals");
        setDeals(response.data.results);
      } catch (err) {
        setError("Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal({ ...deal, [name]: value });
  };

  // Xử lý form submit để tạo deal mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/createdeal", deal);
      if (response.data.id) {
        alert("Deal created successfully!");
        setDeal({
          amount: "",
          closedate: "",
          dealname: "",
          pipeline: "default",
          dealstage: "appointmentScheduled",
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error creating deal.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Create a New Deal</h1>
      <form onSubmit={handleSubmit} className="deal-form">
        <div>
          <label>Deal Name:</label>
          <input
            type="text"
            name="dealname"
            value={deal.dealname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pipeline:</label>
          <input
            type="text"
            name="pipeline"
            value={deal.pipeline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deal Stage:</label>
          <select
            name="dealstage"
            value={deal.dealstage}
            onChange={handleChange}
            required
          >
            <option value="">Select a stage</option>
            {stages.map((stage, index) => (
              <option key={index} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={deal.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Close Date:</label>
          <input
            type="date"
            name="closedate"
            value={deal.closedate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Deal</button>
      </form>

      <h2>Existing Deals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Deal Stage</th>
              <th>Close Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.properties.dealname}</td>
                <td>{deal.properties.dealstage}</td>
                <td>{new Date(deal.properties.closedate).toLocaleDateString()}</td>
                <td>{deal.properties.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
