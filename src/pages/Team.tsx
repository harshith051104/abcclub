import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Upload, X, Edit, Plus, Move, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const initialTeamMembers = [];

export default function Team({ isEditor = true }) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [editMode, setEditMode] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [cropMode, setCropMode] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

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
    setEditingMember({
      id: (teamMembers.length + 1).toString(),
      name: '',
      role: '',
      image: '',
      linkedin: '#',
    });
    setEditMode(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setEditMode(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (editingMember) {
      if (teamMembers.find(m => m.id === editingMember.id)) {
        setTeamMembers(prev =>
          prev.map(member =>
            member.id === editingMember.id ? editingMember : member
          )
        );
      } else {
        setTeamMembers(prev => [...prev, editingMember]);
      }
    }
    setEditMode(false);
    setEditingMember(null);
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  if (editMode && isEditor) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-xl p-6 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">
            {editingMember.id ? 'Edit' : 'Add'} Team Member
          </h2>
          <form onSubmit={handleSaveMember} className="space-y-4">
            <div className="flex justify-center mb-6">
              {cropMode ? (
                <div className="relative w-full max-w-[600px] h-[400px] overflow-hidden border-2 border-yellow-400">
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
                        transform: `translate(${position.x}px, ${position.y}px) rotate(${imageRotation}deg) scale(${imageScale})`,
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
                    className="max-w-[600px] max-h-[400px] w-auto h-auto object-contain border-2 border-yellow-400"
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
                <label className="cursor-pointer">
                  <div className="w-[600px] h-[400px] border-2 border-dashed border-yellow-400 flex items-center justify-center">
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

            <input
              type="text"
              placeholder="Name"
              value={editingMember.name}
              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
              required
            />

            <input
              type="text"
              placeholder="Role"
              value={editingMember.role}
              onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
              required
            />

            <input
              type="text"
              placeholder="LinkedIn URL"
              value={editingMember.linkedin}
              onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-white"
            />

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={cropMode}
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
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
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
      <div className="max-w-7xl mx-auto">
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
          {isEditor && (
            <button
              onClick={handleAddMember}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Team Member
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group h-96 rounded-xl overflow-hidden border-2 border-yellow-600/50 hover:border-yellow-400 transition-all duration-500"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              {isEditor && (
                <div className="absolute top-4 right-4 space-y-2 z-10">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white transition-colors shadow-lg"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 bg-red-600 hover:bg-red-500 rounded-full text-white transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

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
                      className="text-white hover:text-yellow-400 transition-colors p-2 rounded-full border border-white/20 hover:border-yellow-400 hover:scale-110 transform duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@abcclub.com`}
                      className="text-white hover:text-yellow-400 transition-colors p-2 rounded-full border border-white/20 hover:border-yellow-400 hover:scale-110 transform duration-300"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 text-center transform translate-y-0 group-hover:translate-y-4 opacity-100 group-hover:opacity-0 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}