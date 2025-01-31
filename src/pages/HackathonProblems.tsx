import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SaveButton from '../components/SaveButton';

interface Problem {
  id: number;
  title: string;
  description: string;
  requirements: string[];
}

interface ExpandedProblems {
  [key: number]: boolean;
}

export default function HackathonProblems() {
  const { isEditor } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([
    {
      id: 1,
      title: "AI-Powered Healthcare Assistant",
      description: "Create an AI-powered healthcare assistant that can help patients schedule appointments, answer basic medical queries, and provide medication reminders.",
      requirements: [
        "Must use natural language processing",
        "Include appointment scheduling system",
        "Implement medication reminder feature",
        "Provide basic medical information"
      ]
    }
  ]);

  const [expandedProblems, setExpandedProblems] = useState<ExpandedProblems>({});
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Load problems from localStorage on mount
  useEffect(() => {
    const savedProblems = localStorage.getItem('hackathonProblems');
    if (savedProblems) {
      setProblems(JSON.parse(savedProblems));
    }
  }, []);

  const handleSaveChanges = () => {
    try {
      localStorage.setItem('hackathonProblems', JSON.stringify(problems));
      setHasChanges(false);
      alert('Problems saved successfully!');
    } catch (error) {
      alert('Failed to save problems. Please try again.');
    }
  };

  // Update hasChanges whenever problems changes
  useEffect(() => {
    setHasChanges(true);
  }, [problems]);

  const toggleProblem = (id: number) => {
    setExpandedProblems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = () => {
    if (!selectedProblem) {
      alert('Please select a problem statement');
      return;
    }
    setShowThankYou(true);
  };

  const handleAddProblem = () => {
    const newProblem: Problem = {
      id: problems.length + 1,
      title: '',
      description: '',
      requirements: ['']
    };
    setEditingProblem(newProblem);
    setIsEditing(true);
  };

  const handleEditProblem = (problem: Problem) => {
    setEditingProblem(problem);
    setIsEditing(true);
  };

  const handleDeleteProblem = (problemId: number) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      setProblems(prev => prev.filter(p => p.id !== problemId));
    }
  };

  const handleSaveProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProblem) {
      setProblems(prev => {
        const exists = prev.find(p => p.id === editingProblem.id);
        if (exists) {
          return prev.map(p => p.id === editingProblem.id ? editingProblem : p);
        }
        return [...prev, editingProblem];
      });
    }
    setIsEditing(false);
    setEditingProblem(null);
  };

  const addRequirement = () => {
    if (editingProblem) {
      setEditingProblem({
        ...editingProblem,
        requirements: [...editingProblem.requirements, '']
      });
    }
  };

  const updateRequirement = (index: number, value: string) => {
    if (editingProblem) {
      setEditingProblem({
        ...editingProblem,
        requirements: editingProblem.requirements.map((req, i) => i === index ? value : req)
      });
    }
  };

  const removeRequirement = (index: number) => {
    if (editingProblem) {
      setEditingProblem({
        ...editingProblem,
        requirements: editingProblem.requirements.filter((_, i) => i !== index)
      });
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Thank You for Participating!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We wish you all the best for the hackathon.
          </p>
          <p className="text-gray-400">
            You will receive further instructions via email.
          </p>
        </div>
      </div>
    );
  }

  if (isEditing && isEditor && editingProblem) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {editingProblem.id ? 'Edit Problem' : 'Add New Problem'}
          </h2>

          <form onSubmit={handleSaveProblem} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editingProblem.title}
                onChange={(e) => setEditingProblem({ ...editingProblem, title: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={editingProblem.description}
                onChange={(e) => setEditingProblem({ ...editingProblem, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-32"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Requirements
              </label>
              {editingProblem.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingProblem(null);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Save Problem
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Problem Statements
          </h2>
          {isEditor && (
            <button
              onClick={handleAddProblem}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Problem
            </button>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleProblem(problem.id)}
              >
                <div className="flex items-center space-x-4">
                  {!isEditor && (
                    <input
                      type="radio"
                      name="problem"
                      value={problem.id}
                      onChange={() => setSelectedProblem(problem.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                  )}
                  <h3 className="text-lg font-medium text-white">
                    {problem.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {isEditor && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProblem(problem);
                        }}
                        className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProblem(problem.id);
                        }}
                        className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {expandedProblems[problem.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedProblems[problem.id] && (
                <div className="px-4 pb-4">
                  <p className="text-gray-300 mb-4">{problem.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-400">Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {problem.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!isEditor && (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-200"
          >
            Submit Selection
          </button>
        )}
      </div>

      {/* Show save button when there are changes and user is editor */}
      {hasChanges && isEditor && (
        <SaveButton onSave={handleSaveChanges} />
      )}
    </div>
  );
}
