import React, { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import Header from "../components/Header";

const AiResumeMatcher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedAiCandidates, setSelectedAiCandidates] = useState([]);
  const [taggedCandidates, setTaggedCandidates] = useState([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [showAiResults, setShowAiResults] = useState(false);
  const [aiMatcherFilters, setAiMatcherFilters] = useState({
    positionName: "",
    preferredIndustry: "",
    preferredFunction: "",
    preferredRole: "",
    ctcRange: { min: "", max: "" },
    experienceRange: { min: "", max: "" },
    keywords: "",
    industryEnabled: true,
    functionEnabled: true,
    roleEnabled: true,
  });

  // Sample candidate data
  const allCandidates = [
    {
      id: 1,
      name: "Arjun Kumar",
      email: "arjun.kumar@email.com",
      phone: "+91-9876543210",
      currentCtc: "12 LPA",
      currentOrg: "Infosys",
      designation: "Software Engineer",
      experience: 4,
      skills: "React, Node.js, JavaScript",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91-9876543211",
      currentCtc: "15 LPA",
      currentOrg: "TCS",
      designation: "Senior Developer",
      experience: 6,
      skills: "Python, Django, AWS",
    },
    {
      id: 3,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91-9876543212",
      currentCtc: "18 LPA",
      currentOrg: "Wipro",
      designation: "Tech Lead",
      experience: 7,
      skills: "Java, Spring, Microservices",
    },
    {
      id: 4,
      name: "Anita Reddy",
      email: "anita.reddy@email.com",
      phone: "+91-9876543213",
      currentCtc: "20 LPA",
      currentOrg: "Accenture",
      designation: "Solution Architect",
      experience: 8,
      skills: "Cloud, DevOps, Kubernetes",
    },
    {
      id: 5,
      name: "Rajesh Gupta",
      email: "rajesh.gupta@email.com",
      phone: "+91-9876543214",
      currentCtc: "16 LPA",
      currentOrg: "Cognizant",
      designation: "Full Stack Developer",
      experience: 5,
      skills: "React, Node.js, MongoDB",
    },
    {
      id: 6,
      name: "Kavya Patel",
      email: "kavya.patel@email.com",
      phone: "+91-9876543215",
      currentCtc: "14 LPA",
      currentOrg: "HCL",
      designation: "Frontend Developer",
      experience: 4,
      skills: "React, Vue.js, TypeScript",
    },
    {
      id: 7,
      name: "Suresh Kumar",
      email: "suresh.kumar@email.com",
      phone: "+91-9876543216",
      currentCtc: "22 LPA",
      currentOrg: "IBM",
      designation: "Senior Architect",
      experience: 10,
      skills: "System Design, Leadership, Agile",
    },
    {
      id: 8,
      name: "Deepika Joshi",
      email: "deepika.joshi@email.com",
      phone: "+91-9876543217",
      currentCtc: "13 LPA",
      currentOrg: "Tech Mahindra",
      designation: "Backend Developer",
      experience: 3,
      skills: "Python, FastAPI, PostgreSQL",
    },
    {
      id: 9,
      name: "Amit Verma",
      email: "amit.verma@email.com",
      phone: "+91-9876543218",
      currentCtc: "17 LPA",
      currentOrg: "Mindtree",
      designation: "DevOps Engineer",
      experience: 6,
      skills: "Docker, Jenkins, AWS, Terraform",
    },
    {
      id: 10,
      name: "Pooja Mehta",
      email: "pooja.mehta@email.com",
      phone: "+91-9876543219",
      currentCtc: "19 LPA",
      currentOrg: "Capgemini",
      designation: "Product Manager",
      experience: 7,
      skills: "Product Strategy, Analytics, Agile",
    },
    {
      id: 11,
      name: "Rohit Sharma",
      email: "rohit.sharma@email.com",
      phone: "+91-9876543220",
      currentCtc: "21 LPA",
      currentOrg: "Microsoft",
      designation: "Senior SDE",
      experience: 8,
      skills: "C#, .NET, Azure, React",
    },
    {
      id: 12,
      name: "Neha Singh",
      email: "neha.singh@email.com",
      phone: "+91-9876543221",
      currentCtc: "18 LPA",
      currentOrg: "Amazon",
      designation: "Software Engineer",
      experience: 5,
      skills: "Java, Spring Boot, AWS, React",
    },
    {
      id: 13,
      name: "Kiran Kumar",
      email: "kiran.kumar@email.com",
      phone: "+91-9876543222",
      currentCtc: "16 LPA",
      currentOrg: "Flipkart",
      designation: "Full Stack Developer",
      experience: 4,
      skills: "Python, React, PostgreSQL, Docker",
    },
    {
      id: 14,
      name: "Sonal Agarwal",
      email: "sonal.agarwal@email.com",
      phone: "+91-9876543223",
      currentCtc: "19 LPA",
      currentOrg: "Google",
      designation: "Frontend Developer",
      experience: 6,
      skills: "React, TypeScript, GraphQL, Node.js",
    },
    {
      id: 15,
      name: "Manoj Tiwari",
      email: "manoj.tiwari@email.com",
      phone: "+91-9876543224",
      currentCtc: "23 LPA",
      currentOrg: "Netflix",
      designation: "Staff Engineer",
      experience: 9,
      skills: "Scala, Kafka, Microservices, AWS",
    },
  ];

  const candidatesPerPage = 10;
  const totalPages = Math.ceil(allCandidates.length / candidatesPerPage);
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const currentCandidates = allCandidates.slice(
    startIndex,
    startIndex + candidatesPerPage
  );

  const handleFilterChange = (field, value) => {
    setAiMatcherFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (field, type, value) => {
    setAiMatcherFilters((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value,
      },
    }));
  };

  const handleRunAiMatcher = () => {
    if (!aiMatcherFilters.keywords.trim()) {
      alert("Please enter keywords for matching");
      return;
    }

    const keywords = aiMatcherFilters.keywords
      .split(",")
      .map((k) => k.trim().toLowerCase());

    const mockResults = allCandidates
      .map((candidate) => {
        const skillsMatch = keywords.filter((keyword) =>
          candidate.skills.toLowerCase().includes(keyword)
        ).length;

        const experienceMatch =
          candidate.experience >=
            parseInt(aiMatcherFilters.experienceRange.min || 0) &&
          candidate.experience <=
            parseInt(aiMatcherFilters.experienceRange.max || 20);

        const ctcMatch =
          parseInt(candidate.currentCtc.replace(" LPA", "")) <=
          parseInt(aiMatcherFilters.ctcRange.max || 50);

        let score = Math.random() * 50;
        if (skillsMatch > 0) score += skillsMatch * 15;
        if (experienceMatch) score += 20;
        if (ctcMatch) score += 15;

        return {
          ...candidate,
          aiScore: Math.min(Math.round(score), 100),
          keywordMatches: skillsMatch,
        };
      })
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 15);

    setAiResults(mockResults);
    setShowAiResults(true);
  };

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAiCandidate = (candidateId) => {
    setSelectedAiCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAllAi = () => {
    if (selectedAiCandidates.length === aiResults.length) {
      setSelectedAiCandidates([]);
    } else {
      setSelectedAiCandidates(aiResults.map((c) => c.id));
    }
  };

  const handleTagCandidate = (candidate, positionName) => {
    const newTaggedCandidate = {
      id: Date.now() + Math.random(),
      candidateName: candidate.name,
      candidateStatus: "Tagged",
      positionName: positionName || aiMatcherFilters.positionName,
      clientName: "TechCorp Solutions",
      noticePeriod: "TBD",
      currentCtc: candidate.currentCtc,
      ctcBudget:
        aiMatcherFilters.ctcRange.min && aiMatcherFilters.ctcRange.max
          ? `${aiMatcherFilters.ctcRange.min}-${aiMatcherFilters.ctcRange.max} LPA`
          : "TBD",
      offerLetter: null,
      taggedDate: new Date().toLocaleDateString(),
    };

    setTaggedCandidates((prev) => [...prev, newTaggedCandidate]);
    alert(
      `${candidate.name} has been tagged to position: ${
        positionName || aiMatcherFilters.positionName
      }`
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === currentCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(currentCandidates.map((c) => c.id));
    }
  };

  const handleWhatsAppShare = (type) => {
    const selectedNames =
      type === "all"
        ? currentCandidates.map((c) => c.name)
        : currentCandidates
            .filter((c) => selectedCandidates.includes(c.id))
            .map((c) => c.name);

    if (selectedNames.length === 0) {
      alert("Please select candidates to send WhatsApp message");
      return;
    }

    alert(
      `WhatsApp message would be sent to: ${selectedNames.join(
        ", "
      )} for position: ${aiMatcherFilters.positionName}`
    );
  };

  const handleWhatsAppShareAi = (type) => {
    const selectedNames =
      type === "all"
        ? aiResults.map((c) => c.name)
        : aiResults
            .filter((c) => selectedAiCandidates.includes(c.id))
            .map((c) => c.name);

    if (selectedNames.length === 0) {
      alert("Please select candidates to send WhatsApp message");
      return;
    }

    alert(
      `WhatsApp message would be sent to: ${selectedNames.join(
        ", "
      )} for position: ${aiMatcherFilters.positionName}`
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        <Header />
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI Resume Matcher
          </h2>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Position & Filters
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Name
                </label>
                <input
                  type="text"
                  value={aiMatcherFilters.positionName}
                  onChange={(e) =>
                    handleFilterChange("positionName", e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter position name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    checked={aiMatcherFilters.industryEnabled}
                    onChange={(e) =>
                      handleFilterChange("industryEnabled", e.target.checked)
                    }
                    className="mr-2"
                  />
                  Preferred Industry
                </label>
                <input
                  type="text"
                  value={aiMatcherFilters.preferredIndustry}
                  onChange={(e) =>
                    handleFilterChange("preferredIndustry", e.target.value)
                  }
                  disabled={!aiMatcherFilters.industryEnabled}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="e.g., Technology"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    checked={aiMatcherFilters.functionEnabled}
                    onChange={(e) =>
                      handleFilterChange("functionEnabled", e.target.checked)
                    }
                    className="mr-2"
                  />
                  Preferred Function
                </label>
                <input
                  type="text"
                  value={aiMatcherFilters.preferredFunction}
                  onChange={(e) =>
                    handleFilterChange("preferredFunction", e.target.value)
                  }
                  disabled={!aiMatcherFilters.functionEnabled}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="e.g., Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTC Range (LPA)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={aiMatcherFilters.ctcRange.min}
                    onChange={(e) =>
                      handleRangeChange("ctcRange", "min", e.target.value)
                    }
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={aiMatcherFilters.ctcRange.max}
                    onChange={(e) =>
                      handleRangeChange("ctcRange", "max", e.target.value)
                    }
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Range (Years)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={aiMatcherFilters.experienceRange.min}
                    onChange={(e) =>
                      handleRangeChange(
                        "experienceRange",
                        "min",
                        e.target.value
                      )
                    }
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={aiMatcherFilters.experienceRange.max}
                    onChange={(e) =>
                      handleRangeChange(
                        "experienceRange",
                        "max",
                        e.target.value
                      )
                    }
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={aiMatcherFilters.keywords}
                  onChange={(e) =>
                    handleFilterChange("keywords", e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="React, JavaScript, Node.js"
                />
              </div>
            </div>
          </div>

          {/* Candidate Database Section */}
          <div className="bg-white rounded-lg shadow border mb-6">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Candidate Database ({allCandidates.length} total)
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleWhatsAppShare("selected")}
                    disabled={selectedCandidates.length === 0}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 text-sm"
                  >
                    WhatsApp Selected ({selectedCandidates.length})
                  </button>
                  <button
                    onClick={() => handleWhatsAppShare("all")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    WhatsApp All
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedCandidates.length ===
                            currentCandidates.length &&
                          currentCandidates.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Current CTC
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Current Org
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Skills
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Resume
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={() => handleSelectCandidate(candidate.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.designation}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {candidate.email}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {candidate.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {candidate.currentCtc}
                        </div>
                        <div className="text-sm text-gray-500">
                          Exp: {candidate.experience}y
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {candidate.currentOrg}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {candidate.skills}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleTagCandidate(candidate)}
                          className="px-3 py-1 rounded text-xs "
                        >
                          Tag to Position
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + candidatesPerPage, allCandidates.length)}{" "}
                of {allCandidates.length} candidates
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-50 border rounded">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* AI Matching Section */}
          <div className="bg-white rounded-lg shadow border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              AI Matching
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Prompt for Advanced Matching
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows="3"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter specific requirements or criteria for AI matching..."
              />
            </div>
            <button
              onClick={handleRunAiMatcher}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Run AI Matcher
            </button>
          </div>

          {/* AI Results Section */}
          {showAiResults && (
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      AI Matching Results - Top 15 Candidates
                    </h2>
                    <p className="text-sm text-gray-600">
                      Candidates ranked by AI score in descending order
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleWhatsAppShareAi("selected")}
                      disabled={selectedAiCandidates.length === 0}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 text-sm"
                    >
                      WhatsApp Selected ({selectedAiCandidates.length})
                    </button>
                    <button
                      onClick={() => handleWhatsAppShareAi("all")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                    >
                      WhatsApp All
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedAiCandidates.length === aiResults.length &&
                            aiResults.length > 0
                          }
                          onChange={handleSelectAllAi}
                          className="rounded"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Candidate Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        AI Score
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Keyword Matches
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Current CTC
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Resume
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {aiResults.map((candidate, index) => (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedAiCandidates.includes(
                              candidate.id
                            )}
                            onChange={() =>
                              handleSelectAiCandidate(candidate.id)
                            }
                            className="rounded"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {candidate.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {candidate.designation}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {candidate.email}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              candidate.aiScore >= 80
                                ? "bg-green-100 text-green-800"
                                : candidate.aiScore >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {candidate.aiScore}%
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {candidate.keywordMatches} matches
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {candidate.currentCtc}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 hover:text-blue-900 flex items-center">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleTagCandidate(candidate)}
                            className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700"
                          >
                            Tag to Position
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tagged Candidates Summary */}
          {taggedCandidates.length > 0 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Recently Tagged Candidates
              </h3>
              <div className="space-y-2">
                {taggedCandidates.map((tagged, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-3 rounded border"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        {tagged.candidateName}
                      </span>
                      <span className="mx-2 text-gray-500">→</span>
                      <span className="text-blue-600">
                        {tagged.positionName}
                      </span>
                      <span className="mx-2 text-gray-500">at</span>
                      <span className="text-gray-700">{tagged.clientName}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Tagged on {tagged.taggedDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AiResumeMatcher;
