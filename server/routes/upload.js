const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const auth = require('../middleware/auth');

router.post('/upload', auth, async (req, res) => {
    try {
        console.log('Starting image upload...');
        
        if (!req.body.image) {
            console.error('No image provided in request body');
            return res.status(400).json({ message: 'No image provided' });
        }

        // Remove header from base64 string if present
        const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
        
        console.log('Uploading to Cloudinary...');
        const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`, {
            folder: 'abc-club',
            resource_type: 'auto',
            timeout: 120000 // 2 minutes timeout
        });
        
        console.log('Upload successful:', result.public_id);
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('Upload error details:', error);
        res.status(500).json({ 
            message: 'Error uploading image',
            error: error.message,
            details: error.http_code ? `Cloudinary error: ${error.http_code}` : 'Server error'
        });
    }
});

router.delete('/delete/:public_id', auth, async (req, res) => {
    try {
        console.log('Deleting image:', req.params.public_id);
        const result = await cloudinary.uploader.destroy(req.params.public_id);
        console.log('Delete result:', result);
        res.json(result);
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ 
            message: 'Error deleting image',
            error: error.message
        });
    }
});

module.exports = router;
