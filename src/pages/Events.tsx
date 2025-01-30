import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp, Plus, Upload, X, Edit2, Trash2, Bell } from 'lucide-react';

const EventsEditor = () => {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    imageUrl: '',
    imageFile: null,
    duration: '60'
  });

  useEffect(() => {
    // Check notification permission on component mount
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const parseTime = (timeStr) => {
    const [start] = timeStr.split('-').map(t => t.trim());
    const [hours, minutes] = start.split(':').map(num => parseInt(num));
    return { hours, minutes };
  };

  const createGoogleCalendarUrl = (event) => {
    const { hours, minutes } = parseTime(event.time);
    const eventDate = new Date(event.date);
    eventDate.setHours(hours, minutes, 0);
    
    const endDate = new Date(eventDate.getTime() + parseInt(event.duration) * 60000);
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      location: event.location,
      dates: `${eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/` +
             `${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
  };

  const setDeviceReminder = async (event) => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications');
      return;
    }

    try {
      let permission = notificationPermission;
      
      if (permission === 'default') {
        permission = await Notification.requestPermission();
        setNotificationPermission(permission);
      }
      
      if (permission === 'granted') {
        const { hours, minutes } = parseTime(event.time);
        const eventDate = new Date(event.date);
        eventDate.setHours(hours, minutes, 0);
        
        // Set notification for 30 minutes before event
        const notificationTime = new Date(eventDate.getTime() - 30 * 60000);
        
        // Calculate time until notification
        const timeUntilNotification = notificationTime.getTime() - Date.now();
        
        if (timeUntilNotification > 0) {
          setTimeout(() => {
            new Notification(`Upcoming Event: ${event.title}`, {
              body: `Your event starts in 30 minutes at ${event.time}\nLocation: ${event.location}`,
              icon: event.imageUrl,
              silent: false
            });
          }, timeUntilNotification);
          
          alert('Reminder set for 30 minutes before the event');
        } else {
          alert('Cannot set reminder for past events');
        }
      } else {
        alert('Please enable notifications to set reminders');
      }
    } catch (error) {
      console.error('Error setting notification:', error);
      alert('Failed to set device reminder. Please check your browser notifications settings.');
    }
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      imageUrl: '',
      imageFile: null,
      duration: '60'
    });
    setImagePreview('');
    setIsEditing(false);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event.id);
    setIsEditing(true);
    setNewEvent({
      ...event,
      imageFile: null
    });
    setImagePreview(event.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const toggleDescription = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewEvent(prev => ({
          ...prev,
          imageFile: file,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setNewEvent(prev => ({
      ...prev,
      imageFile: null,
      imageUrl: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s*-\s*([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$/;
    if (!timeRegex.test(newEvent.time)) {
      alert('Please enter time in format HH:MM or HH:MM - HH:MM');
      return;
    }

    const imageUrl = newEvent.imageUrl || '/api/placeholder/400/320';
    
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent 
          ? { ...newEvent, imageUrl, id: editingEvent }
          : event
      ));
    } else {
      const eventId = Date.now().toString();
      setEvents(prev => [...prev, { 
        ...newEvent, 
        id: eventId,
        imageUrl 
      }]);
    }
    
    resetForm();
  };

  const validateTimeInput = (input) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s*-\s*([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$/;
    return timeRegex.test(input) ? '' : 'Please enter time in format HH:MM or HH:MM - HH:MM';
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-gray-400 mb-4">
            Join us in our upcoming events and be part of the community
          </p>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              Add New Event
            </button>
          )}
        </div>

        {isEditing && (
          <div className="max-w-xl mx-auto mb-12 bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-blue-900/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <label className="block text-gray-400 mb-2">Event Image</label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-2 text-gray-400"
                      >
                        <Upload className="h-8 w-8" />
                        <span>Click to upload image</span>
                        <span className="text-sm">PNG, JPG up to 5MB</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Time (HH:MM)</label>
                <input
                  type="text"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 15:30 or 15:30 - 16:50"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={newEvent.duration}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  min="15"
                  step="15"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Venue</label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-24"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6 max-w-xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleDescription(event.id)}
                  className="flex items-center text-gray-400 hover:text-gray-300 mb-4 w-full justify-between"
                >
                  <span>Description</span>
                  {expandedCards[event.id] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                
                {expandedCards[event.id] && (
                  <p className="text-gray-400 mb-6">{event.description}</p>
                )}
                
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <a
                      href={createGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-5 w-5" />
                      Add to Calendar
                    </a>
                    <button
                      onClick={() => setDeviceReminder(event)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Bell className="h-5 w-5" />
                      Set Reminder
                    </button>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsEditor;