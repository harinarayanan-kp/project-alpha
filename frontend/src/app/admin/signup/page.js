"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    club: "",
  });
  const [clubs, setClubs] = useState([]); // Store fetched clubs
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Fetch the list of clubs from the backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/club/get-clubs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        const data = await response.json();
        setClubs(Array.isArray(data.clubs) ? data.clubs : []);

        console.log(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Ensures JWT is stored in cookies
      });

      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <select
          name="club"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        >
          <option value="">Select a Club</option>
          {clubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
