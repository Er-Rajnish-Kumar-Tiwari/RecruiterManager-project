import { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Search, Filter, Calendar, FileText, Phone, Mail, Building, Clock, User, DollarSign, MapPin, History, Eye, X, ChevronDown, Upload, Download, Trash2, Plus } from 'lucide-react';

const SubmissionManagementSystem = () => {
  const [groupBy, setGroupBy] = useState('position');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    positionName: '',
    clientName: '',
    candidateName: '',
    location: ''
  });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [currentCandidateId, setCurrentCandidateId] = useState(null);
  const [documentForm, setDocumentForm] = useState({
    name: '',
    type: 'Resume',
    file: null
  });

  // Sample data
  const submissions = [
    {
      id: 1,
      candidateName: 'John Smith',
      email: 'john.smith@email.com',
      mobile: '+91-9876543210',
      positionName: 'Senior React Developer',
      clientName: 'TechCorp Solutions',
      candidateStatus: 'R1 Scheduled',
      recruiter: 'Sarah Johnson',
      resumeLink: 'resume_john_smith.pdf',
      noticePeriod: '30 days',
      currentCTC: '12 LPA',
      ctcBudget: '15-18 LPA',
      currentOrg: 'Digital Innovations Pvt Ltd',
      experience: '5.2 years',
      expectedCTC: '16 LPA',
      city: 'Bangalore',
      location: 'Bangalore',
      screeningComments: 'Strong React skills, good communication',
      submissionDate: '2025-01-15',
      interviewDateTime: '2025-01-25 10:00 AM',
      positionStatus: 'Active',
      profileSharedDate: '2025-01-16',
      clientSPOC: 'Mike Wilson',
      lakshSPOC: 'Priya Sharma',
      candidateHistory: [
        { date: '2025-01-15', action: 'Candidate submitted' },
        { date: '2025-01-18', action: 'Profile shared with client' },
        { date: '2025-01-22', action: 'R1 scheduled for 25th Jan' }
      ],
      documents: [
        { id: 1, name: 'Resume_John_Smith.pdf', type: 'Resume', uploadDate: '2025-01-15', size: '2.3 MB' },
        { id: 2, name: 'Cover_Letter.pdf', type: 'Cover Letter', uploadDate: '2025-01-15', size: '1.1 MB' },
        { id: 3, name: 'ID_Proof.pdf', type: 'ID Proof', uploadDate: '2025-01-16', size: '0.8 MB' }
      ]
    },
    {
      id: 2,
      candidateName: 'Emily Davis',
      email: 'emily.davis@email.com',
      mobile: '+91-9876543211',
      positionName: 'Senior React Developer',
      clientName: 'TechCorp Solutions',
      candidateStatus: 'Profile Shared',
      recruiter: 'David Chen',
      resumeLink: 'resume_emily_davis.pdf',
      noticePeriod: '45 days',
      currentCTC: '14 LPA',
      ctcBudget: '15-18 LPA',
      currentOrg: 'StartupTech Solutions',
      experience: '4.8 years',
      expectedCTC: '17 LPA',
      city: 'Mumbai',
      location: 'Mumbai',
      screeningComments: 'Excellent problem-solving skills',
      submissionDate: '2025-01-18',
      interviewDateTime: '',
      positionStatus: 'Active',
      profileSharedDate: '2025-01-19',
      clientSPOC: 'Mike Wilson',
      lakshSPOC: 'Priya Sharma',
      candidateHistory: [
        { date: '2025-01-18', action: 'Candidate submitted' },
        { date: '2025-01-19', action: 'Profile shared with client' }
      ],
      documents: [
        { id: 1, name: 'Resume_Emily_Davis.pdf', type: 'Resume', uploadDate: '2025-01-18', size: '1.9 MB' },
        { id: 2, name: 'Portfolio.pdf', type: 'Portfolio', uploadDate: '2025-01-18', size: '5.2 MB' }
      ]
    },
    {
      id: 3,
      candidateName: 'Alex Rodriguez',
      email: 'alex.rodriguez@email.com',
      mobile: '+91-9876543212',
      positionName: 'UI/UX Designer',
      clientName: 'DesignHub Inc',
      candidateStatus: 'R2 Completed',
      recruiter: 'Sarah Johnson',
      resumeLink: 'resume_alex_rodriguez.pdf',
      noticePeriod: '60 days',
      currentCTC: '10 LPA',
      ctcBudget: '12-15 LPA',
      currentOrg: 'Creative Solutions Ltd',
      experience: '3.5 years',
      expectedCTC: '13 LPA',
      city: 'Pune',
      location: 'Pune',
      screeningComments: 'Strong design portfolio, creative mindset',
      submissionDate: '2025-01-10',
      interviewDateTime: '2025-01-20 2:00 PM',
      positionStatus: 'Active',
      profileSharedDate: '2025-01-11',
      clientSPOC: 'Lisa Anderson',
      lakshSPOC: 'Rahul Kumar',
      candidateHistory: [
        { date: '2025-01-10', action: 'Candidate submitted' },
        { date: '2025-01-11', action: 'Profile shared with client' },
        { date: '2025-01-15', action: 'R1 scheduled and completed' },
        { date: '2025-01-20', action: 'R2 completed' }
      ],
      documents: [
        { id: 1, name: 'Resume_Alex_Rodriguez.pdf', type: 'Resume', uploadDate: '2025-01-10', size: '2.1 MB' },
        { id: 2, name: 'Design_Portfolio.pdf', type: 'Portfolio', uploadDate: '2025-01-10', size: '8.5 MB' },
        { id: 3, name: 'Certifications.pdf', type: 'Certificate', uploadDate: '2025-01-11', size: '1.3 MB' },
        { id: 4, name: 'Interview_Notes_R1.pdf', type: 'Interview Notes', uploadDate: '2025-01-15', size: '0.5 MB' }
      ]
    },
    {
      id: 4,
      candidateName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      mobile: '+91-9876543213',
      positionName: 'Data Scientist',
      clientName: 'Analytics Pro',
      candidateStatus: 'New Submission',
      recruiter: 'David Chen',
      resumeLink: 'resume_maria_garcia.pdf',
      noticePeriod: '30 days',
      currentCTC: '18 LPA',
      ctcBudget: '20-25 LPA',
      currentOrg: 'DataTech Innovations',
      experience: '6.2 years',
      expectedCTC: '22 LPA',
      city: 'Hyderabad',
      location: 'Hyderabad',
      screeningComments: 'PhD in ML, strong analytical skills',
      submissionDate: '2025-01-22',
      interviewDateTime: '',
      positionStatus: 'Active',
      profileSharedDate: '',
      clientSPOC: 'Robert Kim',
      lakshSPOC: 'Anjali Patel',
      candidateHistory: [
        { date: '2025-01-22', action: 'Candidate submitted' }
      ],
      documents: [
        { id: 1, name: 'Resume_Maria_Garcia.pdf', type: 'Resume', uploadDate: '2025-01-22', size: '2.7 MB' },
        { id: 2, name: 'PhD_Certificate.pdf', type: 'Certificate', uploadDate: '2025-01-22', size: '1.5 MB' }
      ]
    }
  ];

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const matchesSearch = searchTerm === '' || 
        submission.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.positionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.candidateStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.recruiter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.currentOrg.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = (
        submission.positionName.toLowerCase().includes(filters.positionName.toLowerCase()) &&
        submission.clientName.toLowerCase().includes(filters.clientName.toLowerCase()) &&
        submission.candidateName.toLowerCase().includes(filters.candidateName.toLowerCase()) &&
        submission.location.toLowerCase().includes(filters.location.toLowerCase())
      );
      
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters]);

  // Group submissions
  const groupedSubmissions = useMemo(() => {
    const groups = {};
    filteredSubmissions.forEach(submission => {
      let key;
      switch (groupBy) {
        case 'position':
          key = submission.positionName;
          break;
        case 'client':
          key = submission.clientName;
          break;
        case 'candidate':
          key = submission.candidateName;
          break;
        case 'status':
          key = submission.candidateStatus;
          break;
        default:
          key = submission.positionName;
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(submission);
    });
    return groups;
  }, [filteredSubmissions, groupBy]);

  const getStatusColor = (status) => {
    const colors = {
      'New Submission': 'bg-blue-100 text-blue-800',
      'Profile Shared': 'bg-yellow-100 text-yellow-800',
      'R1 Scheduled': 'bg-purple-100 text-purple-800',
      'R1 Completed': 'bg-indigo-100 text-indigo-800',
      'R2 Scheduled': 'bg-orange-100 text-orange-800',
      'R2 Completed': 'bg-green-100 text-green-800',
      'R3 Scheduled': 'bg-pink-100 text-pink-800',
      'Selected': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const openDocumentModal = (candidateId) => {
    setCurrentCandidateId(candidateId);
    setShowDocumentModal(true);
  };

  const handleAddDocument = () => {
    if (!documentForm.name.trim() || !documentForm.file) return;
    
    const mockUrl = URL.createObjectURL(documentForm.file);
    
    const newDocument = {
      id: Date.now(),
      name: documentForm.name,
      type: documentForm.type,
      url: mockUrl,
      fileName: documentForm.file.name,
      size: (documentForm.file.size / (1024 * 1024)).toFixed(2) + ' MB',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setSelectedCandidate(prev => ({
      ...prev,
      documents: [...(prev?.documents || []), newDocument]
    }));

    setDocumentForm({ name: '', type: 'Resume', file: null });
    setShowDocumentModal(false);
  };

  const handleDeleteDocument = (docId) => {
    const updatedCandidate = { ...selectedCandidate };
    updatedCandidate.documents = updatedCandidate.documents.filter(doc => doc.id !== docId);
    setSelectedCandidate(updatedCandidate);
  };

  const getDocumentIcon = (type) => {
    const icons = {
      'Resume': FileText,
      'Cover Letter': FileText,
      'Portfolio': FileText,
      'Certificate': FileText,
      'ID Proof': FileText,
      'Interview Notes': FileText,
      'Other': FileText
    };
    return icons[type] || FileText;
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Submission Management</h2>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search candidates, positions, clients, status..."
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Group By Selector and Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Group by:</label>
                <select 
                  value={groupBy} 
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="position">Position</option>
                  <option value="client">Client Name</option>
                  <option value="candidate">Candidate Name</option>
                  <option value="status">Status</option>
                </select>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
              >
                <Filter size={16} />
                Filters
                <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position Name</label>
                  <input
                    type="text"
                    value={filters.positionName}
                    onChange={(e) => setFilters({...filters, positionName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Filter by position..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={filters.clientName}
                    onChange={(e) => setFilters({...filters, clientName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Filter by client..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                  <input
                    type="text"
                    value={filters.candidateName}
                    onChange={(e) => setFilters({...filters, candidateName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Filter by candidate..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Filter by location..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grouped Submissions */}
        <div className="space-y-6">
          {Object.entries(groupedSubmissions).map(([groupName, groupSubmissions]) => (
            <div key={groupName} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {groupName} ({groupSubmissions.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruiter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notice Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current CTC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTC Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groupSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedCandidate(submission)}
                      >
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{submission.candidateName}</div>
                          <div className="text-sm text-gray-500">{submission.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.positionName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.clientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.candidateStatus)}`}>
                            {submission.candidateStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.recruiter}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            <FileText size={14} />
                            View Resume
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.noticePeriod}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.currentCTC}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.ctcBudget}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Submitted: {submission.submissionDate}
                          {submission.interviewDateTime && (
                            <div>Interview: {submission.interviewDateTime}</div>
                          )}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-lg max-w-6xl w-full my-8 shadow-2xl">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Candidate Details - {selectedCandidate.candidateName}
        </h2>
        <button
          onClick={() => setSelectedCandidate(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      <div className="p-6 max-h-[80vh] overflow-y-auto">
        {/* --- Edit Toggle --- */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>

              {[
                { label: 'Candidate Name', value: 'candidateName', icon: <User size={16} /> },
                { label: 'Email Address', value: 'email', icon: <Mail size={16} /> },
                { label: 'Mobile Number', value: 'mobile', icon: <Phone size={16} /> },
                { label: 'Current/Last Organization', value: 'currentOrg', icon: <Building size={16} /> },
                { label: 'Experience', value: 'experience', icon: <Clock size={16} /> },
                { label: 'Current City', value: 'city', icon: <MapPin size={16} /> },
                { label: 'Current CTC', value: 'currentCTC', icon: <DollarSign size={16} /> },
                { label: 'Expected CTC', value: 'expectedCTC', icon: <DollarSign size={16} /> },
                { label: 'Notice Period', value: 'noticePeriod', icon: <Clock size={16} /> },
              ].map(({ label, value, icon }) => (
                <div className="flex items-start gap-3" key={value}>
                  {icon}
                  <div>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={selectedCandidate[value]}
                          onChange={(e) =>
                            setSelectedCandidate((prev) => ({
                              ...prev,
                              [value]: e.target.value,
                            }))
                          }
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                        <div className="text-sm text-gray-500">{label}</div>
                      </>
                    ) : (
                      <>
                        <div className="font-medium text-gray-900">{selectedCandidate[value]}</div>
                        <div className="text-sm text-gray-500">{label}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

<div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Documents</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openDocumentModal(selectedCandidate.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          <Plus size={14} />
                          Upload
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-2">
                      {selectedCandidate.documents && selectedCandidate.documents.length > 0 ? (
                        selectedCandidate.documents.map((doc) => {
                          const IconComponent = getDocumentIcon(doc.type);
                          return (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                              <div className="flex items-center gap-3">
                                <IconComponent size={16} className="text-blue-600" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{doc.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {doc.type} • {doc.size} • {doc.uploadDate}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                  <Download size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteDocument(doc.id)}
                                  className="text-red-600 hover:text-red-800 p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText size={48} className="mx-auto mb-2 text-gray-300" />
                          <p>No documents uploaded yet</p>
                          <button
                            onClick={() => openDocumentModal(selectedCandidate.id)}
                            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Upload your first document
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                    </div>
                  </div>
          {/* Position & Status Info */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Position & Status Information</h3>

            {[
              { label: 'Position Name', value: 'positionName' },
              { label: 'Client Name', value: 'clientName' },
              { label: 'Recruiter', value: 'recruiter' },
              { label: 'CTC Budget', value: 'ctcBudget' },
              { label: 'Position Status', value: 'positionStatus' },
              { label: 'Date of Submission', value: 'submissionDate' },
              { label: 'Date Profile Shared', value: 'profileSharedDate' },
              { label: 'Interview Date/Time', value: 'interviewDateTime' },
              { label: 'Client SPOC', value: 'clientSPOC' },
              { label: 'Laksh SPOC', value: 'lakshSPOC' },
            ].map(({ label, value }) => (
              <div key={value}>
                <div className="text-sm text-gray-500">{label}</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedCandidate[value] || ''}
                    onChange={(e) =>
                      setSelectedCandidate((prev) => ({
                        ...prev,
                        [value]: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <div className="font-medium text-gray-900">{selectedCandidate[value]}</div>
                )}
              </div>
            ))}

            {/* Candidate Status (Styled Badge) */}
            <div>
              <div className="text-sm text-gray-500">Candidate Status</div>
              {isEditing ? (
                <select
                  value={selectedCandidate.candidateStatus}
                  onChange={(e) =>
                    setSelectedCandidate((prev) => ({
                      ...prev,
                      candidateStatus: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                >
                  <option value="internal_screening">Internal Screening</option>
                  <option value="internal_reject">Internal Reject</option>
                  <option value="submitted">Submitted</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="selected">Selected</option>
                </select>
              ) : (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCandidate.candidateStatus)}`}>
                  {selectedCandidate.candidateStatus}
                </span>
              )}
            </div>

            {/* Screening Comments */}
            {selectedCandidate.screeningComments && (
              <div>
                <div className="text-sm text-gray-500">Screening Comments</div>
                {isEditing ? (
                  <textarea
                    value={selectedCandidate.screeningComments}
                    onChange={(e) =>
                      setSelectedCandidate((prev) => ({
                        ...prev,
                        screeningComments: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <div className="text-gray-900 p-2 bg-gray-50 rounded">
                    {selectedCandidate.screeningComments}
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>

        {/* --- You can keep documents and history section as-is --- */}
      </div>
    </div>
  </div>
)}

        
      </div>
    </div>

    {/* Document Upload Modal */}
    {showDocumentModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 99999}}>
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative" style={{zIndex: 100000}}>
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
            <button
              onClick={() => {
                setShowDocumentModal(false);
                setDocumentForm({ name: '', type: 'Resume', file: null });
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Name *</label>
              <input
                type="text"
                required
                placeholder="e.g., Resume_JohnDoe_2025"
                value={documentForm.name}
                onChange={(e) => setDocumentForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
              <select
                value={documentForm.type}
                onChange={(e) => setDocumentForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Resume">Resume</option>
                <option value="Cover Letter">Pan Card</option>
                <option value="Portfolio">Adhaar Card</option>
                <option value="Certificate">Offer Letter</option>
                <option value="Certificate">Resignation Letter</option>
                <option value="Academic">Academic Document</option>
                <option value="Reference">Reference Letter</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document *</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setDocumentForm(prev => ({ 
                            ...prev, 
                            file: file,
                            name: prev.name || (file ? file.name.split('.')[0] : '')
                          }));
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                </div>
              </div>
              {documentForm.file && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{documentForm.file.name}</span>
                  <button
                    onClick={() => setDocumentForm(prev => ({ ...prev, file: null }))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowDocumentModal(false);
                  setDocumentForm({ name: '', type: 'Resume', file: null });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddDocument}
                disabled={!documentForm.name.trim() || !documentForm.file}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    
    </>
  );
};

export default SubmissionManagementSystem;