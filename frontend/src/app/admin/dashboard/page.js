// "use client";

// import { useState } from "react";

// const AdminPage = () => {
//   const [event, setEvent] = useState({
//     name: "",
//     date: "",
//     time: "",
//     venue: "",
//     description: "",
//     clubName: "",
//     registrationLink: "",
//     instagramLink: "",
//     poster: null,
//   });
//   const [preview , setPreview] =useState(false)
//   const[posterURL,setPosterURL]=useState(null)

//    const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setEvent((prev) => ({ ...prev, poster: file }));

    
//     if (file) {
//       setPosterURL(URL.createObjectURL(file));
//     }
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Event Created:", event);
//     alert("Event Created Successfully!");
    
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      
//       <h1 className="text-2xl  font-bold text-center mb-6">Create New Event</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Event Name" required className="w-full p-2 border rounded" onChange={handleChange} />

//         <div className="grid grid-cols-2 gap-4">
//           <input type="date" name="date" required className="w-full p-2 border rounded" onChange={handleChange} />
//           <input type="time" name="time" required className="w-full p-2 border rounded" onChange={handleChange} />
//         </div>

//         <input type="text" name="venue" placeholder="Venue" required className="w-full p-2 border rounded" onChange={handleChange} />
        
//         <textarea name="description" placeholder="Event Description" required className="w-full p-2 border rounded" onChange={handleChange}></textarea>

//         <input type="text" name="clubName" placeholder="Club Name" required className="w-full p-2 border rounded" onChange={handleChange} />

//         <input type="url" name="registrationLink" placeholder="Registration Link" required className="w-full p-2 border rounded" onChange={handleChange} />

//         <input type="url" name="instagramLink" placeholder="Instagram Link" required className="w-full p-2 border rounded" onChange={handleChange} />

//         <input type="file" accept="image/*" required className="w-full p-2 border rounded" onChange={handleFileChange} />

//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Create Event</button>
//       </form>

//       {/* Event Preview */}
//       <button 
//         className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
//         onClick={() => setPreview(!preview)}
//       >
//         {preview ? "Hide Preview" : "Show Preview"}
//       </button>

//       {/* Event Preview Section */}
//       {preview && (
//         <div className="mt-6 p-6 border rounded-lg shadow-md bg-gray-100">
//           <h2 className="text-xl font-bold">{event.name || "Event Name"}</h2>
//           <p className="text-gray-600">{event.date} at {event.time}</p>
//           <p className="text-gray-700">{event.venue}</p>
//           <p className="mt-2">{event.description}</p>
//           <p className="font-semibold mt-2">Club: {event.clubName}</p>

//           {posterURL && (
//             <img src={posterURL} alt="Event Poster" className="w-full aspect-video object-cover rounded-lg mt-4" />
//           )}

//           <div className="mt-4 flex gap-4">
//             <a href={event.registrationLink} target="_blank" className="text-blue-500 underline">Register</a>
//             <a href={event.instagramLink} target="_blank" className="text-pink-500 underline">Instagram</a>
//           </div>
//         </div>
      
//       )}
//     </div>
//   );
// };

// export default AdminPage;
"use client";

import { useState, useEffect } from "react";

const AdminPage = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    clubName: "",
    registrationLink: "",
    instagramLink: "",
    poster: null,
  });

  const [preview, setPreview] = useState(false);
  const [posterURL, setPosterURL] = useState(null);
  const [clubs, setClubs] = useState([]);

  // Fetch clubs from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/club/get-clubs", {
          method: "POST",
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
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEvent((prev) => ({ ...prev, poster: file }));

    if (file) {
      setPosterURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", event);
    alert("Event Created Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Event Name" required className="w-full p-2 border rounded" onChange={handleChange} />

        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="date" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="time" name="time" required className="w-full p-2 border rounded" onChange={handleChange} />
        </div>

        <input type="text" name="venue" placeholder="Venue" required className="w-full p-2 border rounded" onChange={handleChange} />

        <textarea name="description" placeholder="Event Description" required className="w-full p-2 border rounded" onChange={handleChange}></textarea>

        {/* Dropdown for clubs */}
        <select name="clubName" required className="w-full p-2 border rounded" onChange={handleChange}>
          <option value="">Select a Club</option>
          { clubs.map((club) => (
            <option key={club._id} value={club.name}>
              {club.name}
            </option>
          ))}
        </select>

        <input type="url" name="registrationLink" placeholder="Registration Link" required className="w-full p-2 border rounded" onChange={handleChange} />

        <input type="url" name="instagramLink" placeholder="Instagram Link" required className="w-full p-2 border rounded" onChange={handleChange} />

        <input type="file" accept="image/*" required className="w-full p-2 border rounded" onChange={handleFileChange} />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Create Event</button>
      </form>

      {/* Event Preview Button */}
      <button 
        className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        onClick={() => setPreview(!preview)}
      >
        {preview ? "Hide Preview" : "Show Preview"}
      </button>

      {/* Event Preview Section */}
      {preview && (
        <div className="mt-6 p-6 border rounded-lg shadow-md bg-gray-100">
          <h2 className="text-xl font-bold">{event.name || "Event Name"}</h2>
          <p className="text-gray-600">{event.date} at {event.time}</p>
          <p className="text-gray-700">{event.venue}</p>
          <p className="mt-2">{event.description}</p>
          <p className="font-semibold mt-2">Club: {event.clubName}</p>

          {posterURL && (
            <img src={posterURL} alt="Event Poster" className="w-full aspect-video object-cover rounded-lg mt-4" />
          )}

          <div className="mt-4 flex gap-4">
            <a href={event.registrationLink} target="_blank" className="text-blue-500 underline">Register</a>
            <a href={event.instagramLink} target="_blank" className="text-pink-500 underline">Instagram</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
