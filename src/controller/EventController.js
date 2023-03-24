const eventColl = require("../models/Events");

// Creating Events
exports.AddEvent = async (req, res, next) => {
  const { title, description, location, startTime, endTime } = req.body;
  if (!title || !description || !location || !startTime || !endTime) {
    return res.status(403).json({
      success: false,
      message: "All fields are mandatory",
    });
  }
  let event = await eventColl.create(req.body);
  const totalEvents = await eventColl.countDocuments();
  try {
    res.status(200).json({
      success: true,
      message: "Event added Successfully",
      event,
      totalEvents,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message, totalEvent });
  }
};

// Getting All Events
exports.GetEvents = async (req, res, next) => {
  const event = await eventColl.find(req.body);
  const totalEvents = await eventColl.countDocuments();
  try {
    res.status(200).json({ success: true, event, totalEvents });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

// Getting A Specific Event
exports.GetSingleEvent = async (req, res, next) => {
  const event = await eventColl.findOne({ _id: req.params.id });
  const totalEvents = await eventColl.countDocuments();
  if (!event) {
    return res.status(404).json({
      success: false,
      message: `There is no event with id: ${req.params.id}`,
    });
  }
  try {
    res.status(200).json({ success: true, event, totalEvents });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
//Updating A specific Event by Giving all Fields
exports.UpdateEvent = async (req, res, next) => {
  let event = await eventColl.findById({ _id: req.params.id });
  if (!event) {
    return res.status(404).json({
      success: false,
      message: `There is no event with id: ${req.params.id}`,
    });
  }
  if (!req.body.title) {
    return res.status(403).json({
      success: false,
      message: "title field is mandatory",
    });
  }
  event = await eventColl.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  try {
    res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
      event,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

//Deleting a specific Event
exports.DeleteEvent = async (req, res, next) => {
  const { title, description, location, startTime, endTime } = req.body;
  let event = await eventColl.findById({ _id: req.params.id });
  if (!event) {
    return res.status(404).json({
      success: false,
      message: `There is no event with id: ${req.params.id}`,
    });
  }
  event = await eventColl.findByIdAndDelete(req.params.id);
  const totalEvents = await eventColl.countDocuments();
  try {
    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
      totalEvents,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
