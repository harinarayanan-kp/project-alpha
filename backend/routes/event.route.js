const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const authMiddleware = require("../middleware/Authmiddleware");
const upload = require("../middleware/fileUpload");

router.post("/", authMiddleware, upload.single("image"), eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", authMiddleware, eventController.updateEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);

// router.post("/events", authMiddleware, eventController.createEvent);
// router.get("/events", eventController.getAllEvents);
// router.get("/events/:id", eventController.getEventById);
// router.put("/events/:id", authMiddleware, eventController.updateEvent);
// router.delete("/events/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;
