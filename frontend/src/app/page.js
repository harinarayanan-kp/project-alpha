"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventTile from "./components/Eventtile";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://connectgectbackend.vercel.app/api/events");
        // const response = await fetch("https://localhost:5001/api/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-4">Upcoming Events</h1>
      <div className="flex-grow flex-wrap justify-center gap-4 p-4">
        {events.map((event) => (
          <EventTile key={event._id} event={event} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
