import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Upload, X, Edit, Plus, Move, ZoomIn, ZoomOut, RotateCw, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SaveButton from '../components/SaveButton';

// Define the TeamMember type
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  email: string;
  order: number;
}

// Initial team members with proper type
const initialTeamMembers: TeamMember[] = [];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [editMode, setEditMode] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [cropMode, setCropMode] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const { isEditor } = useAuth(); // Add this line to get editor status
  const [hasChanges, setHasChanges] = useState(false);

  // Load team members from localStorage
  useEffect(() => {
    const savedMembers = localStorage.getItem('teamMembers');
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    }
  }, []);

  // Update hasChanges whenever team members change
  useEffect(() => {
    const savedMembers = localStorage.getItem('teamMembers');
    const currentMembers = JSON.stringify(teamMembers);
    if (savedMembers !== currentMembers && teamMembers.length > 0) {
      setHasChanges(true);
    }
  }, [teamMembers]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingMember({ ...editingMember, image: reader.result });
        setCropMode(true);
        // Reset transformations
        setImageScale(1);
        setImageRotation(0);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleDrag = (e) => {
    if (!dragStart.x && !dragStart.y) return;
    e.preventDefault();
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setDragStart({ x: 0, y: 0 });
  };

  const handleZoom = (direction) => {
    setImageScale(prev => Math.max(0.5, Math.min(3, prev + direction * 0.1)));
  };

  const handleRotate = () => {
    setImageRotation(prev => (prev + 90) % 360);
  };

  const handleSaveCrop = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    // Use the original image dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // Center the transformation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((imageRotation * Math.PI) / 180);
    ctx.scale(imageScale, imageScale);
    
    // Draw the image maintaining its original dimensions
    ctx.drawImage(
      img,
      -canvas.width / 2 - position.x / imageScale,
      -canvas.height / 2 - position.y / imageScale,
      canvas.width,
      canvas.height
    );
    
    const croppedImage = canvas.toDataURL('image/jpeg', 1.0);
    setEditingMember({ ...editingMember, image: croppedImage });
    setCropMode(false);
  };

  const handleAddMember = () => {
    // Generate a unique ID using timestamp and random number
    const newId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setEditingMember({
      id: newId,
      name: '',
      role: '',
      image: '',
      linkedin: '#',
      email: '',
      order: teamMembers.length, // Set order to current length
    });
    setEditMode(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setEditMode(true);
  };

  // Function to compress image before saving
  const compressImage = async (base64String: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions (max 800px width/height)
        let width = img.width;
        let height = img.height;
        const maxSize = 800;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        // Compress to JPEG with 0.7 quality
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  // Modified handleSaveMember function
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      try {
        // Validate required fields
        if (!editingMember.name || !editingMember.role || !editingMember.email) {
          alert('Please fill in all required fields');
          return;
        }

        // Compress image if it exists
        let compressedMember = { ...editingMember };
        if (editingMember.image) {
          compressedMember.image = await compressImage(editingMember.image);
        }

        // Update or add member
        let updatedMembers;
        if (teamMembers.find(m => m.id === editingMember.id)) {
          updatedMembers = teamMembers.map(member =>
            member.id === editingMember.id ? compressedMember : member
          );
        } else {
          updatedMembers = [...teamMembers, compressedMember];
        }

        // Try to save to localStorage with error handling
        try {
          const membersString = JSON.stringify(updatedMembers);
          if (membersString.length > 4.5 * 1024 * 1024) { // Check if near 5MB limit
            throw new Error('Storage limit reached');
          }
          localStorage.setItem('teamMembers', membersString);
          setTeamMembers(updatedMembers);
          setHasChanges(false);
        } catch (storageError) {
          if (storageError.name === 'QuotaExceededError' || 
              storageError.message === 'Storage limit reached') {
            alert('Storage limit reached. Try reducing image sizes or removing unused members.');
          } else {
            alert('Failed to save team member. Please try again.');
          }
          console.error('Storage error:', storageError);
          return;
        }

        setEditMode(false);
        setEditingMember(null);
      } catch (error) {
        console.error('Error saving team member:', error);
        alert('Failed to save team member. Please try again.');
      }
    }
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    setHasChanges(true); // Set hasChanges when removing member
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newMembers = [...teamMembers];
    const temp = newMembers[index];
    newMembers[index] = newMembers[index - 1];
    newMembers[index - 1] = temp;
    // Update order numbers
    newMembers.forEach((member, idx) => {
      member.order = idx;
    });
    setTeamMembers(newMembers);
    setHasChanges(true);
  };

  const handleMoveDown = (index: number) => {
    if (index === teamMembers.length - 1) return;
    const newMembers = [...teamMembers];
    const temp = newMembers[index];
    newMembers[index] = newMembers[index + 1];
    newMembers[index + 1] = temp;
    // Update order numbers
    newMembers.forEach((member, idx) => {
      member.order = idx;
    });
    setTeamMembers(newMembers);
    setHasChanges(true);
  };

  // Modified handleSaveChanges function
  const handleSaveChanges = async () => {
    try {
      // Compress all images before saving
      const compressedMembers = await Promise.all(
        teamMembers.map(async (member) => ({
          ...member,
          image: member.image ? await compressImage(member.image) : member.image
        }))
      );

      const membersString = JSON.stringify(compressedMembers);
      if (membersString.length > 4.5 * 1024 * 1024) {
        throw new Error('Storage limit reached');
      }

      localStorage.setItem('teamMembers', membersString);
      setTeamMembers(compressedMembers);
      setHasChanges(false);
      alert('Team members saved successfully!');
    } catch (error) {
      if (error.message === 'Storage limit reached') {
        alert('Storage limit reached. Try reducing image sizes or removing unused members.');
      } else {
        alert('Failed to save team members. Please try again.');
      }
      console.error('Save error:', error);
    }
  };

  if (editMode && isEditor) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
            {editingMember.id ? 'Edit' : 'Add'} Team Member
          </h2>
          
          <div className="flex justify-center mb-4">
            {cropMode ? (
              <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden border-2 border-yellow-400 rounded-lg">
                <div
                  className="absolute inset-0 cursor-move"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDrag}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDrag}
                  onTouchEnd={handleDragEnd}
                >
                  <img
                    ref={imageRef}
                    src={editingMember.image}
                    alt="Crop preview"
                    className="max-w-none w-auto h-auto"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) rotate(${imageRotation}deg) scale(${imageScale})`
                    }}
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2">
                  <button
                    type="button"
                    onClick={() => handleZoom(1)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleZoom(-1)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <ZoomOut className="w-4 h-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRotate}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <RotateCw className="w-4 h-4 text-white" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSaveCrop}
                  className="absolute top-4 right-4 bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Done
                </button>
              </div>
            ) : editingMember.image ? (
              <div className="relative">
                <img
                  src={editingMember.image}
                  alt="Preview"
                  className="max-w-full h-auto max-h-[250px] md:max-h-[300px] object-contain border-2 border-yellow-400 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setEditingMember({ ...editingMember, image: '' })}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer w-full">
                <div className="w-full h-[150px] md:h-[200px] border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-center">
                  <Upload className="w-8 h-8 text-yellow-400" />
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            )}
          </div>

          <form onSubmit={handleSaveMember} className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Role</label>
              <input
                type="text"
                placeholder="Enter role"
                value={editingMember.role}
                onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">LinkedIn URL</label>
              <input
                type="text"
                placeholder="Enter LinkedIn profile URL"
                value={editingMember.linkedin}
                onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={editingMember.email}
                onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white text-sm"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setEditingMember(null);
                  setCropMode(false);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="text-gray-400">
            Meet the passionate individuals behind ABC Club
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers
            .sort((a, b) => a.order - b.order)
            .map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: (index % 9) * 0.1 } }}
                viewport={{ once: true }}
                className="relative group h-[400px] rounded-xl overflow-hidden border-2 border-yellow-600/50 hover:border-yellow-400 transition-all duration-500"
              >
                <div className="absolute inset-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                {/* Edit/Delete buttons */}
                {isEditor && (
                  <div className="absolute top-4 right-4 space-y-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="p-2 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white transition-colors shadow-lg backdrop-blur-sm"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 bg-red-600 hover:bg-red-500 rounded-full text-white transition-colors shadow-lg backdrop-blur-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Member Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.name}
                    </h3>
                    <p className="text-yellow-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {member.role}
                    </p>
                    <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500 delay-300">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 transition-colors p-2 rounded-full border border-white/20 hover:border-yellow-400 hover:scale-110 transform duration-300 backdrop-blur-sm"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-white hover:text-yellow-400 transition-colors p-2 rounded-full border border-white/20 hover:border-yellow-400 hover:scale-110 transform duration-300 backdrop-blur-sm"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Name at bottom when not hovered */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-center transform translate-y-0 group-hover:translate-y-4 opacity-100 group-hover:opacity-0 transition-all duration-300 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                </div>

                {/* Add order controls for editors */}
                {isEditor && (
                  <div className="absolute top-4 left-4 space-y-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className={`p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white transition-colors ${
                        index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                      }`}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === teamMembers.length - 1}
                      className={`p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white transition-colors ${
                        index === teamMembers.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                      }`}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}

          {/* Add placeholder card for adding new member */}
          {isEditor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={handleAddMember}
              className="relative h-[400px] rounded-xl border-2 border-dashed border-yellow-600/50 hover:border-yellow-400 transition-all duration-500 flex items-center justify-center cursor-pointer group"
            >
              <div className="text-center">
                <Plus className="w-12 h-12 mx-auto text-yellow-600/50 group-hover:text-yellow-400 transition-colors" />
                <p className="mt-4 text-gray-400 group-hover:text-white transition-colors">
                  Add New Member
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pagination or load more button if needed */}
        {teamMembers.length > 0 && (
          <div className="mt-8 text-center text-gray-400">
            Showing {teamMembers.length} team members
          </div>
        )}

        {/* Save button */}
        {isEditor && (
          <SaveButton 
            onSave={handleSaveChanges}
            disabled={!hasChanges}
            className={!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}
          />
        )}
      </div>
    </div>
  );
}