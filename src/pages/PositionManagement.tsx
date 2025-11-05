import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Users,
  Bot,
  ArrowLeft,
  Mail,
  User,
  MapPin,
  DollarSign,
  Clock,
  Building,
  GraduationCap,
} from "lucide-react";

const PositionManagement = () => {
  const [currentView, setCurrentView2] = useState("positions");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [groupBy, setGroupBy] = useState("none");
  const [showTagForm, setShowTagForm] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [tagFormData, setTagFormData] = useState<TagCandidateFormData>({
    positionName: "",
    applicant: "",
    recruiter: "",
    immediateJoiner: false,
    status: "",
  });
  const [showCreatePosition, setShowCreatePosition] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [currentUser] = useState("John Doe"); // Simulated current user

  // Sample data
  const [positions, setPositions] = useState([
    {
      id: 1,
      positionName: "Senior Software Engineer",
      clientName: "TechCorp Inc",
      submittedResumes: 15,
      targetedResumes: 25,
      ctcBudget: "15-20 LPA",
      location: "Bangalore",
      priority: "High",
      experience: "4-6 years",
      workplaceType: "Hybrid",
      status: "Active",
      ctcBudgetNumeric: 2000000,
      city: "Bangalore",
      experienceYears: "4-6",
      education: "B.Tech/M.Tech in Computer Science",
      roleDescription:
        "We are looking for a Senior Software Engineer to join our dynamic team...",
      preferredIndustry: "Technology, SaaS",
      preferredCompanies: "Google, Microsoft, Amazon",
      reportees: 2,
      deadline: "2025-08-15",
      rounds: 4,
      interviewerName: "Sarah Johnson",
      interviewerLinkedIn: "linkedin.com/in/sarahjohnson",
      ctcStructure: "80% Fixed + 15% Variable + 5% ESOPs",
      roleType: "New",
      diversityPreference: "Gender Diverse",
      interviewMode: "Video Call",
      jobType: "Full-time",
      clientSPOC: "Mike Wilson",
      lakshSPOC: "Priya Sharma",
      recruiter: "John Doe",
      function: "Engineering",
      role: "Software Engineer",
      budgetForRole: "20 LPA",
      target: 2,
      keywords: "React, Node.js, JavaScript, MongoDB",
      prompt:
        "Find experienced full-stack developers with strong problem-solving skills",
      aiPreferredIndustries: ["Technology", "Fintech", "E-commerce"],
      aiPreferredFunctions: ["Engineering", "Product Development"],
      aiPreferredRole: "Senior Software Engineer",
      createdDate: "2025-07-20",
      lastActivityDate: "2025-07-22",
    },
    {
      id: 2,
      positionName: "Product Manager",
      clientName: "StartupXYZ",
      submittedResumes: 8,
      targetedResumes: 20,
      ctcBudget: "25-30 LPA",
      location: "Mumbai",
      priority: "Medium",
      experience: "5-8 years",
      workplaceType: "Remote",
      status: "Active",
      ctcBudgetNumeric: 2750000,
      city: "Mumbai",
      experienceYears: "5-8",
      education: "MBA/B.Tech with Product Management experience",
      roleDescription:
        "Seeking an experienced Product Manager to drive product strategy...",
      preferredIndustry: "Fintech, E-commerce",
      preferredCompanies: "Flipkart, Paytm, Razorpay",
      reportees: 3,
      deadline: "2025-09-01",
      rounds: 3,
      interviewerName: "Rajesh Kumar",
      interviewerLinkedIn: "linkedin.com/in/rajeshkumar",
      ctcStructure: "70% Fixed + 20% Variable + 10% ESOPs",
      roleType: "Replacement",
      diversityPreference: "None",
      interviewMode: "In-person + Video",
      jobType: "Full-time",
      clientSPOC: "Anita Desai",
      lakshSPOC: "Vikram Singh",
      recruiter: "Jane Smith",
      function: "Product",
      role: "Product Manager",
      budgetForRole: "30 LPA",
      target: 1,
      keywords: "Product Strategy, Analytics, User Experience, Agile",
      prompt:
        "Find product managers with strong analytical skills and startup experience",
      aiPreferredIndustries: ["Fintech", "E-commerce", "SaaS"],
      aiPreferredFunctions: ["Product Management", "Strategy"],
      aiPreferredRole: "Product Manager",
      createdDate: "2025-07-15",
      lastActivityDate: "2025-07-15",
    },
  ]);

  const [newPosition, setNewPosition] = useState({
    // Basic Job Details
    positionName: "",
    clientName: "",
    status: "Active",
    roleType: "",
    jobType: "",
    priority: "",
    recruiter: currentUser,
    clientSPOC: "",

    // Role Requirements
    experienceYears: "",
    education: "",
    roleDescription: "",
    function: "",
    role: "",

    // Compensation Details
    ctcBudgetNumeric: "",
    ctcStructure: "",
    budgetForRole: "",

    // Workplace Information
    workplaceType: "",
    city: "",

    // Candidate Preferences
    preferredIndustry: "",
    preferredCompanies: "",
    diversityPreference: "",
    target: "",

    // Interview Process
    rounds: "",
    interviewerName: "",
    interviewerLinkedIn: "",
    interviewMode: "",

    // Timeline
    deadline: "",

    // AI Input Fields
    keywords: "",
    prompt: "",
    aiPreferredIndustries: [],
    aiPreferredFunctions: [],
    aiPreferredRole: "",
  });
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      email: "john.smith@email.com",
      name: "John Smith",
      currentCTC: 1500000,
      expectedCTC: 2000000,
      noticePeriod: 30,
      status: "submitted",
      positionId: 1,
      recruiter: "John Doe",
      source: "recruiter",
    },
    {
      id: 2,
      email: "jane.doe@email.com",
      name: "Jane Doe",
      currentCTC: 1200000,
      expectedCTC: 1800000,
      noticePeriod: 60,
      status: "internal_screening",
      positionId: 1,
      recruiter: "AI Matcher",
      source: "direct",
      aiScore: null,
    },
    {
      id: 3,
      email: "alex.kumar@email.com",
      name: "Alex Kumar",
      currentCTC: 1800000,
      expectedCTC: 2500000,
      noticePeriod: 45,
      status: "internal_screening",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: null,
    },
    {
      id: 4,
      email: "priya.sharma@email.com",
      name: "Priya Sharma",
      currentCTC: 1600000,
      expectedCTC: 2200000,
      noticePeriod: 30,
      status: "internal_screening",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: null,
    },
    {
      id: 5,
      email: "rajesh.patel@email.com",
      name: "Rajesh Patel",
      currentCTC: 1400000,
      expectedCTC: 2000000,
      noticePeriod: 60,
      status: "internal_reject",
      positionId: 1,
      recruiter: "Direct Application",
      source: "direct",
      aiScore: 12,
    },
  ]);

  const [newCandidate, setNewCandidate] = useState({
    email: "",
    resume: null,
    currentCTC: "",
    specialComments: "",
    education: "",
    gender: "",
    openToRelocation: false,
    engagementType: "",
    expectedCTC: "",
    noticePeriod: "",
    recruiter: currentUser,
  });

  // Calculate days since no action
  const calculateDaysSinceNoAction = (position: string) => {
    const today = new Date("2025-07-24"); // Current date
    const positionCandidates = candidates.filter(
      (c) => c.positionId === position.id
    );

    // If no resumes are tagged, calculate from creation date
    if (positionCandidates.length === 0) {
      const createdDate = new Date(position.createdDate);
      const diffTime = Math.abs(today - createdDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Check if there are candidates with status updates
    const hasRecentStatusUpdates = positionCandidates.some((candidate) => {
      // If candidate has been moved beyond 'submitted' status recently
      return (
        candidate.status !== "submitted" &&
        candidate.status !== "internal_screening"
      );
    });

    if (!hasRecentStatusUpdates) {
      // Calculate from last activity date
      const lastActivityDate = new Date(position.lastActivityDate);
      const diffTime = Math.abs(today - lastActivityDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return 0; // Recent activity found
  };

  // Filter and group positions
  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.positionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.experience.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === "all") return matchesSearch;
    return matchesSearch && position.priority === filterBy;
  });

  const groupedPositions =
    groupBy === "clientName"
      ? filteredPositions.reduce((acc, position) => {
          const client = position.clientName;
          if (!acc[client]) acc[client] = [];
          acc[client].push(position);
          return acc;
        }, {})
      : { "All Positions": filteredPositions };

  const handleAddCandidate = (positionId) => {
    setShowAddCandidate(positionId);
    setCandidateEmail("");
  };

  const handleEmailCheck = () => {
    const existingCandidate = candidates.find(
      (c) => c.email === candidateEmail
    );
    if (existingCandidate) {
      // Tag existing candidate to position
      const updatedCandidates = [...candidates];
      const candidateIndex = updatedCandidates.findIndex(
        (c) => c.email === candidateEmail
      );
      updatedCandidates[candidateIndex] = {
        ...updatedCandidates[candidateIndex],
        positionId: showAddCandidate,
      };
      setCandidates(updatedCandidates);
      setShowAddCandidate(false);
      setCandidateEmail("");
      alert("Candidate tagged to position successfully!");
    } else {
      setShowCandidateForm(true);
      setNewCandidate({ ...newCandidate, email: candidateEmail });
    }
  };

  const handleCreateCandidate = () => {
    const candidate = {
      id: candidates.length + 1,
      ...newCandidate,
      status: "submitted",
      positionId: showAddCandidate,
      source: "recruiter",
      name: newCandidate.email.split("@")[0].replace(".", " "),
    };
    setCandidates([...candidates, candidate]);
    setShowCandidateForm(false);
    setShowAddCandidate(false);
    setNewCandidate({
      email: "",
      resume: null,
      currentCTC: "",
      specialComments: "",
      education: "",
      gender: "",
      openToRelocation: false,
      engagementType: "",
      expectedCTC: "",
      noticePeriod: "",
      recruiter: currentUser,
    });
    alert("Candidate created and tagged successfully!");
  };

  const handleCreatePosition = () => {
    const position = {
      id: positions.length + 1,
      ...newPosition,
      submittedResumes: 0,
      targetedResumes: parseInt(newPosition.target) || 0,
      ctcBudget: newPosition.budgetForRole,
      location: newPosition.city,
      experience: newPosition.experienceYears,
      lakshSPOC: currentUser, // Auto-assign current user as Laksh SPOC
      createdDate: "2025-07-20",
      lastActivityDate: "2025-07-22",
    };
    setPositions([...positions, position]);
    setShowCreatePosition(false);
    setNewPosition({
      positionName: "",
      clientName: "",
      status: "Active",
      roleType: "",
      jobType: "",
      priority: "",
      recruiter: currentUser,
      clientSPOC: "",
      experienceYears: "",
      education: "",
      roleDescription: "",
      function: "",
      role: "",
      ctcBudgetNumeric: "",
      ctcStructure: "",
      budgetForRole: "",
      workplaceType: "",
      city: "",
      preferredIndustry: "",
      preferredCompanies: "",
      diversityPreference: "",
      target: "",
      rounds: "",
      interviewerName: "",
      interviewerLinkedIn: "",
      interviewMode: "",
      deadline: "",
      keywords: "",
      prompt: "",
      aiPreferredIndustries: [],
      aiPreferredFunctions: [],
      aiPreferredRole: "",
    });
    alert("Position created successfully!");
  };

  const handleMultiSelectChange = (field, value) => {
    const currentValues = newPosition[field];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setNewPosition({ ...newPosition, [field]: updatedValues });
  };

  const runAIMatcher = (positionId) => {
    alert(`AI Matcher running for position ${positionId}...`);
    // Simulate AI matching
    setTimeout(() => {
      alert("AI Matcher completed! New candidates have been suggested.");
    }, 2000);
  };

  const runAIResumeMatcherForPosition = (positionId) => {
    // Get all direct application candidates with internal_screening status for this position
    const eligibleCandidates = candidates.filter(
      (c) =>
        c.positionId === positionId &&
        c.source === "direct" &&
        c.status === "internal_screening"
    );

    if (eligibleCandidates.length === 0) {
      alert(
        'No candidates with "Internal Screening" status found for AI matching.'
      );
      return;
    }

    // Simulate AI scoring (normally this would call an actual AI API)
    alert(
      `Running AI Resume Matcher for ${eligibleCandidates.length} candidates...`
    );

    setTimeout(() => {
      const updatedCandidates = [...candidates];

      // Generate random scores for simulation
      eligibleCandidates.forEach((candidate) => {
        const score = Math.floor(Math.random() * 100) + 1; // Random score 1-100
        const candidateIndex = updatedCandidates.findIndex(
          (c) => c.id === candidate.id
        );
        updatedCandidates[candidateIndex] = {
          ...updatedCandidates[candidateIndex],
          aiScore: score,
          status: score >= 85 ? "internal_screening" : "internal_reject", // Top 15% threshold
        };
      });

      setCandidates(updatedCandidates);

      const topCandidates = eligibleCandidates.filter((_, index) => {
        const score =
          updatedCandidates.find((c) => c.id === eligibleCandidates[index].id)
            ?.aiScore || 0;
        return score >= 85;
      });

      alert(
        `AI Resume Matcher completed! ${topCandidates.length} candidates qualified for recruiter review. Others moved to "Internal Reject" status.`
      );
    }, 3000);
  };

  const PositionTable = ({ positions }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client & Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CTC & Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days Since No Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positions.map((position) => {
              const daysSinceNoAction = calculateDaysSinceNoAction(position);
              return (
                <tr
                  key={position.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedPosition(position);
                    setCurrentView2("position-detail");
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {position.positionName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {position.experience} • {position.workplaceType}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {position.clientName}
                      </div>
                      <div
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          position.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : position.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {position.priority}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">
                        {position.submittedResumes}/{position.targetedResumes}
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (position.submittedResumes /
                                position.targetedResumes) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {position.ctcBudget}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {position.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        daysSinceNoAction === 0
                          ? "bg-green-100 text-green-800"
                          : daysSinceNoAction <= 3
                          ? "bg-yellow-100 text-yellow-800"
                          : daysSinceNoAction <= 7
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {daysSinceNoAction === 0
                        ? "Active"
                        : `${daysSinceNoAction} days`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded hover:bg-green-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPosition(position.positionName);
                          setTagFormData({
                            positionName: position.positionName,
                            applicant: "",
                            recruiter: "",
                            immediateJoiner: false,
                            status: "",
                          });
                          setShowTagForm(true);
                        }}
                      >
                        Tag Candidate
                      </button>
                      <button
                        onClick={() => navigate("/ai-matcher")}
                        className="text-purple-600 hover:text-purple-900 px-2 py-1 rounded hover:bg-purple-50"
                      >
                        AI Matcher
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
  const TagCandidateModal = ({ onClose }: { onClose: () => void }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", tagFormData);
      setShowTagForm(false);
      setTagFormData({
        positionName: "",
        applicant: "",
        recruiter: "",
        immediateJoiner: false,
        status: "",
      });
      setSelectedPosition("");
    };

    const handleClose = () => {
      setTagFormData({
        positionName: "",
        applicant: "",
        recruiter: "",
        immediateJoiner: false,
        status: "",
      });
      setSelectedPosition("");
      onClose();
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tag Candidate</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.positionName}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      positionName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="Enter position name"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.applicant}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      applicant: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter applicant name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recruiter <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.recruiter}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      recruiter: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recruiter name"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Edit to tag your name for this position if candidate already
                  in the system
                </p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="immediateJoiner"
                  checked={tagFormData.immediateJoiner}
                  onChange={(e) =>
                    setTagFormData({
                      ...tagFormData,
                      immediateJoiner: e.target.checked,
                    })
                  }
                  className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <label
                    htmlFor="immediateJoiner"
                    className="text-sm font-medium text-gray-700"
                  >
                    Immediate Joiner
                  </label>
                  <p className="text-xs text-gray-500">
                    Pl tick this if its an immediate joiner (within 15 days max)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={tagFormData.status}
                  onChange={(e) =>
                    setTagFormData({ ...tagFormData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="R1">R1</option>
                  <option value="R2">R2</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  const PositionDetail = ({
    position,
    candidates = [],
    currentUser,
    setCurrentView,
    setCandidates,
    runAIResumeMatcherForPosition,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPosition, setEditedPosition] = useState({ ...position });
    const [directAppStatusFilter, setDirectAppStatusFilter] = useState("all");

    const handleInputChange = (field, value) => {
      setEditedPosition((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      console.log("Saving updated position:", editedPosition);
      setIsEditing(false);
      // TODO: Replace with API or parent state update
    };

    const handleCancel = () => {
      setEditedPosition({ ...position });
      setIsEditing(false);
    };

    const submittedCandidates = candidates.filter(
      (c) => c.positionId === position.id && c.source === "recruiter"
    );
    const allDirectApplications = candidates.filter(
      (c) => c.positionId === position.id && c.source === "direct"
    );

    const directApplications =
      directAppStatusFilter === "all"
        ? allDirectApplications
        : allDirectApplications.filter(
            (c) => c.status === directAppStatusFilter
          );

    const getStatusBadge = (status) => {
      const statusStyles = {
        internal_screening: "bg-yellow-100 text-yellow-800",
        internal_reject: "bg-red-100 text-red-800",
        submitted: "bg-blue-100 text-blue-800",
        interview_scheduled: "bg-purple-100 text-purple-800",
        selected: "bg-green-100 text-green-800",
      };

      const statusLabels = {
        internal_screening: "Internal Screening",
        internal_reject: "Internal Reject",
        submitted: "Submitted",
        interview_scheduled: "Interview Scheduled",
        selected: "Selected",
      };

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            statusStyles[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {statusLabels[status] || status}
        </span>
      );
    };

    const renderField = (label, field, isTextarea = false) => (
      <div>
        <strong>{label}:</strong>{" "}
        {isEditing ? (
          isTextarea ? (
            <textarea
              value={editedPosition[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="border px-2 py-1 rounded w-full mt-1 text-sm"
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={editedPosition[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="border px-2 py-1 rounded w-full mt-1 text-sm"
            />
          )
        ) : (
          position[field]
        )}
      </div>
    );

    return (
      <div className="max-w-6xl mx-auto p-6 bg-white m-6 rounded-lg">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentView2("positions")}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {position.positionName}
          </h2>
        </div>

        {/* Editable Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Position Details</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="grid gap-4">
              {renderField("Client Name", "clientName")}
              {renderField("Status", "status")}
              {renderField("CTC Budget", "ctcBudget")}
              {renderField("Location", "location")}
              {renderField("Experience", "experience")}
              {renderField("Education", "education")}
              {renderField("Workplace Type", "workplaceType")}
              {renderField("Reportees", "reportees")}
              {renderField("Deadline", "deadline")}
              {renderField("Interview Rounds", "rounds")}
              {renderField("Interviewer", "interviewerName")}
              {renderField("Job Type", "jobType")}
              {renderField("Client SPOC", "clientSPOC")}
              {renderField("Laksh SPOC", "lakshSPOC")}
              {renderField("Role Description", "roleDescription", true)}
              {renderField("Preferred Industry", "preferredIndustry")}
              {renderField("Preferred Companies", "preferredCompanies")}
            </div>
          </div>

          {/* Right section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Info</h2>
            <div className="space-y-3">
              {renderField("CTC Structure", "ctcStructure")}
              {renderField("Role Type", "roleType")}
              {position.diversityPreference &&
                renderField("Diversity Preference", "diversityPreference")}
              {position.interviewMode &&
                renderField("Interview Mode", "interviewMode")}
              <div>
                <strong>LinkedIn:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedPosition.interviewerLinkedIn || ""}
                    onChange={(e) =>
                      handleInputChange("interviewerLinkedIn", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full mt-1 text-sm"
                  />
                ) : (
                  <a
                    href={`https://${position.interviewerLinkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    View Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submitted Candidates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Submitted Candidates ({submittedCandidates.length})
            </h2>
            <div className="space-y-3">
              {submittedCandidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4">
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-gray-600 text-sm">{candidate.email}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <div>
                        Current CTC: ₹
                        {(candidate.currentCTC / 100000).toFixed(1)} LPA
                      </div>
                      <div>
                        Expected CTC: ₹
                        {(candidate.expectedCTC / 100000).toFixed(1)} LPA
                      </div>
                      <div>Notice Period: {candidate.noticePeriod} days</div>
                      <div>Recruiter: {candidate.recruiter}</div>
                    </div>
                  </div>
                </div>
              ))}
              {submittedCandidates.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No submitted candidates yet
                </p>
              )}
            </div>
          </div>

          {/* Direct Applications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Direct Applications ({directApplications.length})
              </h2>
              <div className="flex items-center gap-3">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  value={directAppStatusFilter}
                  onChange={(e) => setDirectAppStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="internal_screening">Internal Screening</option>
                  <option value="internal_reject">Internal Reject</option>
                  <option value="interview_scheduled">
                    Interview Scheduled
                  </option>
                  <option value="selected">Selected</option>
                </select>
                <button
                  onClick={() => runAIResumeMatcherForPosition(position.id)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Bot className="w-4 h-4" />
                  AI Resume Matcher
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {directApplications.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{candidate.name}</h3>
                      {getStatusBadge(candidate.status)}
                      {candidate.aiScore && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            candidate.aiScore >= 85
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          AI Score: {candidate.aiScore}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {candidate.email}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        Current CTC: ₹
                        {(candidate.currentCTC / 100000).toFixed(1)} LPA
                      </div>
                      <div>
                        Expected CTC: ₹
                        {(candidate.expectedCTC / 100000).toFixed(1)} LPA
                      </div>
                      <div>Notice Period: {candidate.noticePeriod} days</div>
                      <div>Source: {candidate.recruiter}</div>
                    </div>
                    {candidate.status === "internal_screening" &&
                      candidate.aiScore >= 85 && (
                        <div className="mt-3">
                          <button
                            onClick={() => {
                              const updatedCandidates = [...candidates];
                              const candidateIndex =
                                updatedCandidates.findIndex(
                                  (c) => c.id === candidate.id
                                );
                              updatedCandidates[candidateIndex] = {
                                ...updatedCandidates[candidateIndex],
                                status: "submitted",
                                source: "recruiter",
                                recruiter: currentUser,
                              };
                              setCandidates(updatedCandidates);
                              alert(
                                "Candidate tagged to position successfully!"
                              );
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Tag to Position
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              ))}
              {directApplications.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  {directAppStatusFilter === "all"
                    ? "No direct applications yet"
                    : `No candidates with "${directAppStatusFilter.replace(
                        "_",
                        " "
                      )}" status`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === "position-detail" && selectedPosition) {
    return <PositionDetail position={selectedPosition} />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div>
              <div className="max-w-6x1 mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Header */}
                  {showTagForm && (
                    <TagCandidateModal onClose={() => setShowTagForm(false)} />
                  )}
                  <div className="border-b border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Position Management
                      </h2>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        onClick={() => setShowCreatePosition(true)}
                      >
                        <Plus className="w-4 h-4" />
                        Create Position
                      </button>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by client name, location, priority, CTC budget, experience..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-4">
                        <select
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={filterBy}
                          onChange={(e) => setFilterBy(e.target.value)}
                        >
                          <option value="all">All Priorities</option>
                          <option value="High">High Priority</option>
                          <option value="Medium">Medium Priority</option>
                          <option value="Low">Low Priority</option>
                        </select>
                        <select
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={groupBy}
                          onChange={(e) => setGroupBy(e.target.value)}
                        >
                          <option value="none">No Grouping</option>
                          <option value="clientName">Group by Client</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Positions List */}
                  <div className="space-y-6">
                    {Object.entries(groupedPositions).map(
                      ([groupName, groupPositions]) => (
                        <div key={groupName}>
                          {groupBy !== "none" && (
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              {groupName}
                            </h2>
                          )}
                          <PositionTable positions={groupPositions} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Add Candidate Modal */}
              {showAddCandidate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">
                      Add Candidate
                    </h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email ID
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="Enter candidate email"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleEmailCheck}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={!candidateEmail}
                      >
                        Check Email
                      </button>
                      <button
                        onClick={() => setShowAddCandidate(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Create Candidate Form Modal */}
              {showCandidateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                  <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Create New Candidate
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.email}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current CTC (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.currentCTC}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              currentCTC: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expected CTC (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.expectedCTC}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              expectedCTC: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notice Period (days)
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.noticePeriod}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              noticePeriod: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Education
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.education}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              education: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.gender}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              gender: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Engagement Type
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          value={newCandidate.engagementType}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              engagementType: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Recruiter
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                          value={newCandidate.recruiter}
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={newCandidate.openToRelocation}
                            onChange={(e) =>
                              setNewCandidate({
                                ...newCandidate,
                                openToRelocation: e.target.checked,
                              })
                            }
                          />
                          Open to Relocation
                        </label>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Comments
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          value={newCandidate.specialComments}
                          onChange={(e) =>
                            setNewCandidate({
                              ...newCandidate,
                              specialComments: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleCreateCandidate}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Candidate
                      </button>
                      <button
                        onClick={() => setShowCandidateForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Create Position Form Modal */}
              {showCreatePosition && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                  <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4 max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">
                        Create New Position
                      </h2>
                      <button
                        onClick={() => setShowCreatePosition(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-8">
                      {/* Basic Job Details */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          📌 Basic Job Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Position Name *
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.positionName}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  positionName: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Client Name *
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.clientName}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  clientName: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.status}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  status: e.target.value,
                                })
                              }
                            >
                              <option value="Active">Active</option>
                              <option value="On Hold">On Hold</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              New / Replacement Role
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.roleType}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  roleType: e.target.value,
                                })
                              }
                            >
                              <option value="">Select</option>
                              <option value="New">New</option>
                              <option value="Replacement">Replacement</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Job Type
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.jobType}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  jobType: e.target.value,
                                })
                              }
                            >
                              <option value="">Select</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Priority
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.priority}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  priority: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Priority</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Recruiter
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                              value={newPosition.recruiter}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Client SPOC
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.clientSPOC}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  clientSPOC: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Role Requirements */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          💼 Role Requirements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Experience Needed (years)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 3-5 years"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.experienceYears}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  experienceYears: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Education
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., B.Tech/M.Tech in Computer Science"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.education}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  education: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Function
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.function}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  function: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Function</option>
                              <option value="Engineering">Engineering</option>
                              <option value="Product">Product</option>
                              <option value="Sales">Sales</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Operations">Operations</option>
                              <option value="Finance">Finance</option>
                              <option value="HR">HR</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Select the Role
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Senior Software Engineer"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.role}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  role: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Role Description
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              rows={4}
                              placeholder="Detailed job description..."
                              value={newPosition.roleDescription}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  roleDescription: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Compensation Details */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          💰 Compensation Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CTC Budget (₹)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 2000000"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.ctcBudgetNumeric}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  ctcBudgetNumeric: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Budget for Role
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 15-20 LPA"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.budgetForRole}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  budgetForRole: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CTC Structure (Fixed + Variable + ESOPs)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 80% Fixed + 15% Variable + 5% ESOPs"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.ctcStructure}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  ctcStructure: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Workplace Information */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          🏢 Workplace Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Workplace Type
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.workplaceType}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  workplaceType: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Type</option>
                              <option value="Remote">Remote</option>
                              <option value="On-site">On-site</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Bangalore"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.city}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  city: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Candidate Preferences */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          👥 Candidate Preferences
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Industry (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Technology, SaaS"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.preferredIndustry}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  preferredIndustry: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Companies (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Google, Microsoft, Amazon"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.preferredCompanies}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  preferredCompanies: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Diversity Preference (Optional)
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.diversityPreference}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  diversityPreference: e.target.value,
                                })
                              }
                            >
                              <option value="">No Preference</option>
                              <option value="Gender Diverse">
                                Gender Diverse
                              </option>
                              <option value="Ethnically Diverse">
                                Ethnically Diverse
                              </option>
                              <option value="Age Diverse">Age Diverse</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Target (Number of candidates to hire)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 2"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.target}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  target: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interview Process */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          📝 Interview Process
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Number of Rounds
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 4"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.rounds}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  rounds: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Interviewer Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Sarah Johnson"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.interviewerName}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  interviewerName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Interviewer LinkedIn
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., linkedin.com/in/sarahjohnson"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.interviewerLinkedIn}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  interviewerLinkedIn: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Mode of Interview (Optional)
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.interviewMode}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  interviewMode: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Mode</option>
                              <option value="Video Call">Video Call</option>
                              <option value="In-person">In-person</option>
                              <option value="Phone Call">Phone Call</option>
                              <option value="In-person + Video">
                                In-person + Video
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          📅 Timeline
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Deadline to Close
                            </label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.deadline}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  deadline: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* AI Input Fields */}
                      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          🤖 AI Input Fields
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Keywords
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., React, Node.js, JavaScript, MongoDB"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.keywords}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  keywords: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              AI Prompt
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              placeholder="e.g., Find experienced full-stack developers with strong problem-solving skills"
                              value={newPosition.prompt}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  prompt: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Industries (Multiple allowed)
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                "Technology",
                                "Fintech",
                                "E-commerce",
                                "Healthcare",
                                "Education",
                                "Manufacturing",
                                "Consulting",
                                "Media",
                                "Real Estate",
                              ].map((industry) => (
                                <label
                                  key={industry}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={newPosition.aiPreferredIndustries.includes(
                                      industry
                                    )}
                                    onChange={() =>
                                      handleMultiSelectChange(
                                        "aiPreferredIndustries",
                                        industry
                                      )
                                    }
                                  />
                                  <span className="text-sm">{industry}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Functions (Multiple allowed)
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                "Engineering",
                                "Product",
                                "Sales",
                                "Marketing",
                                "Operations",
                                "Finance",
                                "HR",
                                "Design",
                                "Strategy",
                              ].map((func) => (
                                <label key={func} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={newPosition.aiPreferredFunctions.includes(
                                      func
                                    )}
                                    onChange={() =>
                                      handleMultiSelectChange(
                                        "aiPreferredFunctions",
                                        func
                                      )
                                    }
                                  />
                                  <span className="text-sm">{func}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Role
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Senior Software Engineer"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              value={newPosition.aiPreferredRole}
                              onChange={(e) =>
                                setNewPosition({
                                  ...newPosition,
                                  aiPreferredRole: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 mt-8 pt-6 border-t">
                      <button
                        onClick={handleCreatePosition}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        disabled={
                          !newPosition.positionName || !newPosition.clientName
                        }
                      >
                        Create Position
                      </button>
                      <button
                        onClick={() => setShowCreatePosition(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionManagement;
