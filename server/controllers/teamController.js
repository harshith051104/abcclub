const TeamMember = require('../models/Team');

exports.getAllMembers = async (req, res) => {
  try {
    const Team = req.app.locals.models.Team;
    const members = await Team.find().sort('order');
    res.json(members);
  } catch (error) {
    console.error('Error getting team members:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const Team = req.app.locals.models.Team;
    const lastMember = await Team.findOne().sort('-order');
    const order = lastMember ? lastMember.order + 1 : 0;
    const member = await Team.create({ ...req.body, order });
    res.status(201).json(member);
  } catch (error) {
    console.error('Error adding team member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const Team = req.app.locals.models.Team;
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const Team = req.app.locals.models.Team;
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Update order for remaining members
    await Team.updateMany(
      { order: { $gt: member.order } },
      { $inc: { order: -1 } }
    );

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.reorderMembers = async (req, res) => {
  try {
    const Team = req.app.locals.models.Team;
    const { members } = req.body;

    // Update each member's order
    await Promise.all(
      members.map(member => 
        Team.findByIdAndUpdate(
          member._id,
          { order: member.order },
          { new: true, runValidators: true }
        )
      )
    );

    const updatedMembers = await Team.find().sort('order');
    res.json(updatedMembers);
  } catch (error) {
    console.error('Error reordering team members:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
