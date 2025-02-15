const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Debug log Cloudinary configuration
console.log('Cloudinary Configuration:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: '***' // Don't log the secret
});

// Validate the image data
const validateImage = (base64Data) => {
  // Check if the data is base64
  if (!base64Data.match(/^data:image\/(jpeg|png|gif|webp);base64,/)) {
    throw new Error('Invalid image format. Only JPEG, PNG, GIF, and WebP images are allowed.');
  }

  // Get the raw base64 data
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '');
  
  // Check the file size (max 10MB)
  const fileSize = Buffer.from(base64String, 'base64').length;
  if (fileSize > 10 * 1024 * 1024) {
    throw new Error('File size must be less than 10MB');
  }
};

exports.uploadImage = async (req, res) => {
  try {
    console.log('Received upload request');
    
    if (!req.body.image) {
      console.log('No image provided in request body');
      return res.status(400).json({ message: 'No image provided' });
    }

    try {
      validateImage(req.body.image);
    } catch (error) {
      console.log('Image validation failed:', error.message);
      return res.status(400).json({ message: error.message });
    }

    // Extract base64 data - remove data:image/jpeg;base64, prefix if present
    const base64Data = req.body.image;
    
    // Create buffer from base64
    const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    console.log('Uploading image to Cloudinary...');
    
    // Upload buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'abcclub',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          format: 'webp', // Convert all images to WebP for better compression
          quality: 'auto:good', // Automatically optimize quality
          fetch_format: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    console.log('Upload successful:', {
      url: result.secure_url,
      public_id: result.public_id
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Handle specific Cloudinary errors
    if (error.http_code) {
      return res.status(error.http_code).json({ 
        message: 'Failed to upload image to cloud storage',
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to upload image', 
      error: error.message 
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    console.log('Received delete request for public_id:', req.params.public_id);
    
    const { public_id } = req.params;
    if (!public_id) {
      console.log('No public_id provided');
      return res.status(400).json({ message: 'No public_id provided' });
    }

    console.log('Deleting image from Cloudinary...');
    
    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id, {
      invalidate: true // Invalidate CDN cache
    });
    
    console.log('Delete result:', result);
    
    if (result.result !== 'ok') {
      throw new Error('Failed to delete image from cloud storage');
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    // Handle specific Cloudinary errors
    if (error.http_code) {
      return res.status(error.http_code).json({ 
        message: 'Failed to delete image from cloud storage',
        error: error.message 
      });
    }

    res.status(500).json({ 
      message: 'Failed to delete image', 
      error: error.message 
    });
  }
};
