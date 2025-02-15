const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    console.log('Getting all events...');
    const Event = req.app.locals.models.Event;
    console.log('Event model:', Event);
    const events = await Event.find().sort('-date');
    console.log('Found events:', events);
    res.json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addEvent = async (req, res) => {
  try {
    console.log('Adding new event with data:', req.body);
    const Event = req.app.locals.models.Event;
    console.log('Event model:', Event);
    const event = await Event.create(req.body);
    console.log('Created event:', event);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    console.log('Updating event with id:', req.params.id);
    console.log('Update data:', req.body);
    const Event = req.app.locals.models.Event;
    console.log('Event model:', Event);
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      console.log('Event not found with id:', req.params.id);
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log('Updated event:', event);
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    console.log('Deleting event with id:', req.params.id);
    const Event = req.app.locals.models.Event;
    console.log('Event model:', Event);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      console.log('Event not found with id:', req.params.id);
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log('Deleted event:', event);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.bulkUpdateEvents = async (req, res) => {
  try {
    console.log('Bulk updating events with data:', req.body);
    const Event = req.app.locals.models.Event;
    console.log('Event model:', Event);

    // Delete all existing events
    await Event.deleteMany({});
    console.log('Deleted existing events');

    // Create new events
    const events = await Event.insertMany(req.body);
    console.log('Created new events:', events);

    res.json(events);
  } catch (error) {
    console.error('Error bulk updating events:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
