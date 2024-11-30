import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './user.css'; // Import file CSS vào đây
import axios from "axios";
import moment from 'moment';
function Contacts() {
  // State để lưu dữ liệu form
  const [contact, setContact] = useState({
    email: '',
    firstname: '',
    lastname: '',
   
    lifecyclestage: '',
  });

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  // Xử lý form submit (chỉ in dữ liệu ra console)
  const handleSubmit =async  (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/createContact", contact);
      if (response.data.id) {
        alert("Deal created successfully!");
        setContact({
      email: '',
      firstname: '',
      lastname: '',
      lifecyclestage: '',
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error creating contact.");
    }
  };

  // Fetch contacts từ API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcontacts");
        console.log("Fetched contacts:", response.data); // Kiểm tra dữ liệu trả về
        setContacts(response.data.results); // Cập nhật state với dữ liệu
      } catch (err) {
        setError("Failed to fetch contacts");
        console.error(err); // Log lỗi ra console
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []); // Chạy chỉ một lần khi component mount

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Create Contact</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={contact.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={contact.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Lifecycle Stage:</label>
            <select
              name="lifecyclestage"
              value={contact.lifecyclestage}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="marketingqualifiedlead">Marketing Qualified Lead</option>
              <option value="lead">Lead</option>
              <option value="subscriber">Subscriber</option>
              <option value="opportunity">Opportunity</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button type="submit">Create Contact</button>
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
                <th>Name</th>
                <th>Email</th>
                <th>createdate</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  {/* Kết hợp lastname và firstname thành tên đầy đủ */}
                  <td>{contact.properties.lastname} {contact.properties.firstname}</td>
                  <td>{contact.properties.email}</td>
                  <td>{contact.properties.createdate ? moment(contact.properties.createdate).format('DD/MM/YYYY') : 'N/A'}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Contacts;
