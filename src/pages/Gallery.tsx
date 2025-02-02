import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Plus, ArrowLeft, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SaveButton from '../components/SaveButton';

// Define the GalleryItem type
interface GalleryItem {
  id: string;
  images: string[];
  title: string;
  description: string;
  date: string;
}

// Initial gallery items with proper type
const initialGalleryItems: GalleryItem[] = [];

interface ViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageViewer: React.FC<ViewerProps> = ({ images, currentIndex, onClose, onPrevious, onNext }) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      />

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50"
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default function Gallery() {
  const [isManagementView, setIsManagementView] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { isEditor } = useAuth();
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editingAlbum, setEditingAlbum] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);

  // Load gallery items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      setGalleryItems(JSON.parse(savedItems));
    }
  }, []);

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImagePromises = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePromises).then(images => {
      setNewImages(prev => [...prev, ...images]);
      setHasChanges(true);
    });
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleAddAlbum = () => {
    if (!newTitle || newImages.length === 0) {
      alert('Please add a title and at least one image');
      return;
    }

    const newAlbum: GalleryItem = {
      id: Date.now().toString(),
      images: newImages,
      title: newTitle,
      description: newDescription,
      date: new Date().toISOString()
    };

    setGalleryItems(prev => [newAlbum, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setNewImages([]);
    setHasChanges(true);
  };

  const handleDeleteAlbum = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    try {
      localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
      setHasChanges(false);
      alert('Gallery saved successfully!');
    } catch (error) {
      alert('Failed to save gallery. Please try again.');
    }
  };

  const handleViewAlbum = (album: GalleryItem) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedAlbum && currentImageIndex < selectedAlbum.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (selectedAlbum) {
      if (e.key === 'ArrowLeft') handlePreviousImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setSelectedAlbum(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedAlbum, currentImageIndex]);

  const handleEditAlbum = (album: GalleryItem) => {
    setEditingAlbum(album);
    setEditTitle(album.title);
    setEditDescription(album.description);
    setEditImages([...album.images]);
    setIsManagementView(true);
  };

  const handleUpdateAlbum = () => {
    if (!editingAlbum || !editTitle || editImages.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedAlbum: GalleryItem = {
      ...editingAlbum,
      title: editTitle,
      description: editDescription,
      images: editImages,
    };

    setGalleryItems(prev => 
      prev.map(item => item.id === editingAlbum.id ? updatedAlbum : item)
    );

    // Reset edit state
    setEditingAlbum(null);
    setEditTitle('');
    setEditDescription('');
    setEditImages([]);
    setHasChanges(true);
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImagePromises = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePromises).then(images => {
      setEditImages(prev => [...prev, ...images]);
      setHasChanges(true);
    });
  };

  const handleRemoveEditImage = (index: number) => {
    setEditImages(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  if (isManagementView && isEditor) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {editingAlbum ? 'Edit Album' : 'Manage Gallery'}
            </h2>
            <button
              onClick={() => {
                setIsManagementView(false);
                setEditingAlbum(null);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              View Gallery
            </button>
          </div>

          {/* Edit/Add Album Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl mb-8 border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingAlbum ? 'Edit Album' : 'Add New Album'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingAlbum ? editTitle : newTitle}
                  onChange={(e) => editingAlbum ? setEditTitle(e.target.value) : setNewTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Album Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingAlbum ? editDescription : newDescription}
                  onChange={(e) => editingAlbum ? setEditDescription(e.target.value) : setNewDescription(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Album Description"
                  rows={3}
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Images
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {(editingAlbum ? editImages : newImages).map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Upload Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => editingAlbum 
                          ? handleRemoveEditImage(index) 
                          : handleRemoveNewImage(index)
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <span className="text-sm text-gray-400">Add Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={editingAlbum ? handleEditImageUpload : handleImagesUpload}
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={editingAlbum ? handleUpdateAlbum : handleAddAlbum}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                {editingAlbum ? 'Update Album' : 'Create Album'}
              </button>

              {editingAlbum && (
                <button
                  onClick={() => {
                    setEditingAlbum(null);
                    setEditTitle('');
                    setEditDescription('');
                    setEditImages([]);
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* Existing Albums */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleViewAlbum(item)}
              >
                <div className="aspect-video relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {isEditor && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAlbum(item);
                        }}
                        className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <Edit2 className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAlbum(item.id);
                        }}
                        className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {item.images.length > 1 && (
                      <p className="text-gray-400 text-sm">
                        +{item.images.length - 1} more photos
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Viewer Modal */}
        <AnimatePresence>
          {selectedAlbum && (
            <ImageViewer
              images={selectedAlbum.images}
              currentIndex={currentImageIndex}
              onClose={() => setSelectedAlbum(null)}
              onPrevious={handlePreviousImage}
              onNext={handleNextImage}
            />
          )}
        </AnimatePresence>

        {/* Save Button */}
        {hasChanges && isEditor && (
          <SaveButton onSave={handleSaveChanges} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Event Gallery
          </h1>
          <p className="text-gray-400 mb-8">
            Capturing moments from our amazing events and activities
          </p>
          {isEditor && (
            <button
              onClick={() => setIsManagementView(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Manage Gallery
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}