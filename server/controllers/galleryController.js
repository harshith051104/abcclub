const GalleryItem = require('../models/Gallery');

exports.getAllItems = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort('-date');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllAlbums = async (req, res) => {
  try {
    const Gallery = req.app.locals.models.Gallery;
    const albums = await Gallery.find().sort('-date');
    res.json(albums);
  } catch (error) {
    console.error('Error getting albums:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addAlbum = async (req, res) => {
  try {
    const Gallery = req.app.locals.models.Gallery;
    const album = await Gallery.create(req.body);
    res.status(201).json(album);
  } catch (error) {
    console.error('Error adding album:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const Gallery = req.app.locals.models.Gallery;
    const album = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const Gallery = req.app.locals.models.Gallery;
    const album = await Gallery.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.bulkUpdateAlbums = async (req, res) => {
  try {
    const Gallery = req.app.locals.models.Gallery;
    await Gallery.deleteMany({});
    const albums = await Gallery.insertMany(req.body);
    res.json(albums);
  } catch (error) {
    console.error('Error bulk updating albums:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
