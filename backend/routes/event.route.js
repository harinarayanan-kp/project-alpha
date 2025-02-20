const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.post("/login", eventController.login);


router.post("/events",  eventController.createEvent);
router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getEventById);
router.put("/events/:id",eventController.updateEvent);
router.delete("/events/:id",eventController.deleteEvent);



// router.post("/events", eventController.authenticateAdmin, eventController.createEvent);
// router.get("/events", eventController.getAllEvents);
// router.get("/events/:id", eventController.getEventById);
// router.put("/events/:id", eventController.authenticateAdmin, eventController.updateEvent);
// router.delete("/events/:id", eventController.authenticateAdmin, eventController.deleteEvent);

module.exports = router;
