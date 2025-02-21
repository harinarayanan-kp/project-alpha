const Event = require("../models/event.model");
const Club = require("../models/club.model");
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  try {
    const {
      ename,
      date,
      time,
      venue,
      socialmedia_link,
      reg_fee,
      reg_link,
      contact,
      club,
    } = req.body;
    const clubId = new mongoose.Types.ObjectId(club);
    const existingClub = await Club.findById(clubId);
    if (!existingClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    const token = req.cookies.Authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = new mongoose.Types.ObjectId(decoded.sub);
    const newEvent = await Event.create({
      ename,
      date,
      time,
      venue,
      socialmedia_link,
      reg_fee,
      reg_link,
      contact,
      club,
      admin: adminId,
    });
    // const newEvent = new Event(req.body);
    // await newEvent.save();
    // const
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
