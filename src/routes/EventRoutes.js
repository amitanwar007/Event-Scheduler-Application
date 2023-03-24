const express = require("express");
const {
  AddEvent,
  GetEvents,
  UpdateEvent,
  DeleteEvent,
  GetSingleEvent,
} = require("../controller/EventController");
const router = express.Router();

router.route("/events").post(AddEvent);
router.route("/events").get(GetEvents);
router
  .route("/events/:id")
  .put(UpdateEvent)
  .get(GetSingleEvent)
  .delete(DeleteEvent);

module.exports = router;
