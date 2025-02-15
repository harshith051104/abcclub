import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const uploadImage = async (file: File, token: string) => {
  try {
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }

    // Create a new FileReader
    const reader = new FileReader();

    // Convert file to base64
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    const base64 = await base64Promise;

    // Upload to server
    const response = await axios.post(
      '/api/upload',
      { image: base64 },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 30000 // 30 second timeout
      }
    );

    return {
      url: response.data.url,
      public_id: response.data.public_id
    };
  } catch (error: any) {
    console.error('Error in uploadImage:', error);
    
    if (error.response) {
      // Server responded with an error
      throw new Error(error.response.data.message || 'Failed to upload image');
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Server did not respond. Please check your internet connection.');
    } else {
      // Error in making the request
      throw error;
    }
  }
};

export const deleteImage = async (public_id: string, token: string) => {
  try {
    await axios.delete(
      `/api/upload/${public_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 10000 // 10 second timeout
      }
    );
  } catch (error: any) {
    console.error('Error in deleteImage:', error);
    
    if (error.response) {
      // Server responded with an error
      throw new Error(error.response.data.message || 'Failed to delete image');
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Server did not respond. Please check your internet connection.');
    } else {
      // Error in making the request
      throw error;
    }
  }
};
