import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import ProjectCard from "./ProjectCard";
import CertificateCard from "./CertificateCard";
import CodingProfileCard from "./CodingProfileCard";
import SkillCard from "./SkillCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import ContributionCard from "./ContributionCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const [projects, setProjects] = useState(user.projects || []);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectErrors, setProjectErrors] = useState({});

  const [professionalStatus, setProfessionalStatus] = useState(
    user?.professionalStatus || "student"
  );
  const [institution, setInstitution] = useState(user?.institution || "");
  const [role, setRole] = useState(user?.role || "");
  const [portfolioLink, setPortfolioLink] = useState(user?.portfolioLink || "");

  const [certificates, setCertificates] = useState(user.certificates || []);
  const [certificateName, setCertificateName] = useState("");
  const [issuingOrg, setIssuingOrg] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateLink, setCertificateLink] = useState("");
  const [certificateErrors, setCertificateErrors] = useState({});

  const [codingProfiles, setCodingProfiles] = useState(
    user.codingProfiles || []
  );
  const [platformName, setPlatformName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState("");
  const [codingProfileErrors, setCodingProfileErrors] = useState({});

  const [codingPlatforms, setCodingPlatforms] = useState(
    user.codingPlatforms || []
  );
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const [contributions, setContributions] = useState(user.contributions || []);
  const [contributionTitle, setContributionTitle] = useState("");
  const [contributionType, setContributionType] = useState("");
  const [contributionOrg, setContributionOrg] = useState("");
  const [contributionDescription, setContributionDescription] = useState("");
  const [contributionStartDate, setContributionStartDate] = useState("");
  const [contributionEndDate, setContributionEndDate] = useState("");
  const [contributionRole, setContributionRole] = useState("");
  const [contributionProjectLink, setContributionProjectLink] = useState("");
  const [contributionCertLink, setContributionCertLink] = useState("");
  const [contributionErrors, setContributionErrors] = useState({});


  const isValidUrl = (string) => {
    if (!string || string.trim() === "") return true;
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const isValidGitHubUrl = (url) => {
    if (!url || url.trim() === "") return true;
    return url.includes('github.com') && isValidUrl(url);
  };

 
  const validateProjectFields = () => {
    const errors = {};
    
    if (githubLink && githubLink.trim() !== "" && !isValidGitHubUrl(githubLink)) {
      errors.githubLink = "Must be a valid GitHub URL (https://github.com/...)";
    }
    
    if (liveLink && liveLink.trim() !== "" && !isValidUrl(liveLink)) {
      errors.liveLink = "Must be a valid URL starting with http:// or https://";
    }
    
    if (projectImage && projectImage.trim() !== "" && !isValidUrl(projectImage)) {
      errors.projectImage = "Must be a valid image URL starting with http:// or https://";
    }
    
    return errors;
  };

  const validateCertificateFields = () => {
    const errors = {};
    
    if (certificateLink && certificateLink.trim() !== "" && !isValidUrl(certificateLink)) {
      errors.certificateLink = "Must be a valid URL starting with http:// or https://";
    }
    
    return errors;
  };

  const validateCodingProfileFields = () => {
    const errors = {};
    
    if (profileUrl && profileUrl.trim() !== "" && !isValidUrl(profileUrl)) {
      errors.profileUrl = "Must be a valid URL starting with http:// or https://";
    }
    
    return errors;
  };

  const validateContributionFields = () => {
    const errors = {};
    
    if (contributionProjectLink && contributionProjectLink.trim() !== "" && !isValidUrl(contributionProjectLink)) {
      errors.contributionProjectLink = "Must be a valid URL starting with http:// or https://";
    }
    
    if (contributionCertLink && contributionCertLink.trim() !== "" && !isValidUrl(contributionCertLink)) {
      errors.contributionCertLink = "Must be a valid URL starting with http:// or https://";
    }
    
    return errors;
  };

  useEffect(() => {
    const errors = validateProjectFields();
    setProjectErrors(errors);
  }, [githubLink, liveLink, projectImage]);

  useEffect(() => {
    const errors = validateCertificateFields();
    setCertificateErrors(errors);
  }, [certificateLink]);

  useEffect(() => {
    const errors = validateCodingProfileFields();
    setCodingProfileErrors(errors);
  }, [profileUrl]);

  useEffect(() => {
    const errors = validateContributionFields();
    setContributionErrors(errors);
  }, [contributionProjectLink, contributionCertLink]);

 
  const addProject = () => {
    const errors = validateProjectFields();
    
    if (Object.keys(errors).length > 0) {
      setProjectErrors(errors);
      return;
    }

    if (!projectTitle.trim()) return;

    const newProject = {
      id: Date.now(),
      title: projectTitle,
      description: projectDescription,
      techStack: techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech),
      githubLink,
      liveLink,
      image: projectImage,
    };

    setProjects([...projects, newProject]);
    setProjectTitle("");
    setProjectDescription("");
    setTechStack("");
    setGithubLink("");
    setLiveLink("");
    setProjectImage("");
    setProjectErrors({});
  };

  const addCertificate = () => {
    const errors = validateCertificateFields();
    
    if (Object.keys(errors).length > 0) {
      setCertificateErrors(errors);
      return;
    }

    if (!certificateName.trim()) return;

    const newCertificate = {
      id: Date.now(),
      name: certificateName,
      issuingOrg,
      issueDate,
      link: certificateLink,
    };

    setCertificates([...certificates, newCertificate]);
    setCertificateName("");
    setIssuingOrg("");
    setIssueDate("");
    setCertificateLink("");
    setCertificateErrors({});
  };

  const addCodingProfile = () => {
    const errors = validateCodingProfileFields();
    
    if (Object.keys(errors).length > 0) {
      setCodingProfileErrors(errors);
      return;
    }

    if (!platformName.trim() || !profileUrl.trim()) return;

    const newProfile = {
      id: Date.now(),
      platform: platformName,
      profileUrl,
      username,
      rating,
    };

    setCodingProfiles([...codingProfiles, newProfile]);
    setPlatformName("");
    setProfileUrl("");
    setUsername("");
    setRating("");
    setCodingProfileErrors({});
  };

  const addCodingPlatform = () => {
    if (!skillName.trim()) return;

    const newSkill = {
      id: Date.now(),
      name: skillName,
      level: skillLevel,
    };

    setCodingPlatforms([...codingPlatforms, newSkill]);
    setSkillName("");
    setSkillLevel("");
  };

  const addContribution = () => {
    const errors = validateContributionFields();
    
    if (Object.keys(errors).length > 0) {
      setContributionErrors(errors);
      return;
    }

    if (!contributionTitle.trim() || !contributionType.trim()) return;

    const newContribution = {
      id: Date.now(),
      title: contributionTitle,
      type: contributionType,
      organization: contributionOrg,
      description: contributionDescription,
      startDate: contributionStartDate,
      endDate: contributionEndDate,
      role: contributionRole,
      projectLink: contributionProjectLink,
      certificateLink: contributionCertLink,
    };

    setContributions([...contributions, newContribution]);
    setContributionTitle("");
    setContributionType("");
    setContributionOrg("");
    setContributionDescription("");
    setContributionStartDate("");
    setContributionEndDate("");
    setContributionRole("");
    setContributionProjectLink("");
    setContributionCertLink("");
    setContributionErrors({});
  };


  const removeProject = async (projectId) => {
    try {
      const updatedProjects = projects.filter(
        (proj) => proj._id !== projectId && proj.id !== projectId
      );
      setProjects(updatedProjects);
      const response = await axios.put(
        `${BASE_URL}/profile/remove-project`,
        { projectId },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.error("Remove project error:", error);
      setProjects(projects);
      alert("Failed to remove project. Please try again.");
    }
  };

  const removeCertificate = async (certId) => {
    try {
      const updatedCerts = certificates.filter(
        (cert) => cert._id !== certId && cert.id !== certId
      );
      setCertificates(updatedCerts);

      await axios.put(
        `${BASE_URL}/profile/remove-certificate`,
        { certificateId: certId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Remove certificate error:", error);
      setCertificates(certificates);
    }
  };

  const removeCodingProfile = async (profileId) => {
    try {
      const updatedProfiles = codingProfiles.filter(
        (profile) => profile._id !== profileId && profile.id !== profileId
      );
      setCodingProfiles(updatedProfiles);

      await axios.put(
        `${BASE_URL}/profile/remove-coding-profile`,
        { profileId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Remove coding profile error:", error);
      setCodingProfiles(codingProfiles);
    }
  };

  const removeCodingPlatform = async (skillId) => {
    try {
      const updatedSkills = codingPlatforms.filter(
        (skill) => skill._id !== skillId && skill.id !== skillId
      );
      setCodingPlatforms(updatedSkills);

      await axios.put(
        `${BASE_URL}/profile/remove-skill`,
        { skillId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Remove skill error:", error);
      setCodingPlatforms(codingPlatforms);
    }
  };

  const removeContribution = async (contributionId) => {
    try {
      const updatedContributions = contributions.filter(
        (contribution) =>
          contribution._id !== contributionId &&
          contribution.id !== contributionId
      );
      setContributions(updatedContributions);

      await axios.put(
        `${BASE_URL}/profile/remove-contribution`,
        { contributionId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Remove contribution error:", error);
      setContributions(contributions);
    }
  };

  
  const saveProfile = async () => {
    setError("");
    try {
      const profileErrors = [];
      
      if (photoUrl && photoUrl.trim() !== "" && !isValidUrl(photoUrl)) {
        profileErrors.push("Profile photo URL must be valid (start with http:// or https://)");
      }
      
      if (portfolioLink && portfolioLink.trim() !== "" && !isValidUrl(portfolioLink)) {
        profileErrors.push("Portfolio link must be valid (start with http:// or https://)");
      }

      if (profileErrors.length > 0) {
        setError(`Please fix these errors:\n• ${profileErrors.join('\n• ')}`);
        return;
      }

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          projects,
          certificates,
          codingProfiles,
          codingPlatforms,
          contributions,
          professionalStatus,
          institution,
          role,
          portfolioLink,
        },
        { withCredentials: true }
      );
      const updatedUser = res?.data?.data;
      dispatch(addUser(updatedUser));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log(" Save profile error:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Failed to save profile";
      setError(errorMessage);
    }
  };
  const isProjectAddDisabled = !projectTitle.trim() || Object.keys(projectErrors).length > 0;
  const isCertificateAddDisabled = !certificateName.trim() || Object.keys(certificateErrors).length > 0;
  const isCodingProfileAddDisabled = !platformName.trim() || !profileUrl.trim() || Object.keys(codingProfileErrors).length > 0;
  const isContributionAddDisabled = !contributionTitle.trim() || !contributionType.trim() || Object.keys(contributionErrors).length > 0;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Your Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Update your information and see how it looks
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className="w-full lg:w-1/2 space-y-6">

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Edit Profile
                  </h2>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">👤</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a *
                    </label>
                    <select
                      value={professionalStatus}
                      onChange={(e) => setProfessionalStatus(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="student">Student </option>
                      <option value="working">Working Professional </option>
                    </select>
                  </div>
                  {professionalStatus === "student" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          College/University Name
                        </label>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="e.g., Galgotias College of Engineering"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree/Stream
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="e.g., B.Tech Computer Science"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="e.g., Microsoft, Google"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Role
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="e.g., Frontend Developer, Software Engineer"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Link
                    </label>
                    <input
                      type="text"
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo URL
                    </label>
                    <input
                      type="text"
                      value={photoUrl}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About
                    </label>
                    <textarea
                      value={about}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add Projects
                  </h2>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">💼</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows="2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                      placeholder="Describe your project..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub Link
                      </label>
                      <input
                        type="text"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        onBlur={() => {
                          const errors = validateProjectFields();
                          setProjectErrors(errors);
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
                          projectErrors.githubLink ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://github.com/..."
                      />
                      {projectErrors.githubLink && (
                        <p className="text-red-500 text-xs mt-1">{projectErrors.githubLink}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Live Demo
                      </label>
                      <input
                        type="text"
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                        onBlur={() => {
                          const errors = validateProjectFields();
                          setProjectErrors(errors);
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
                          projectErrors.liveLink ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://demo.com"
                      />
                      {projectErrors.liveLink && (
                        <p className="text-red-500 text-xs mt-1">{projectErrors.liveLink}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Image URL
                    </label>
                    <input
                      type="text"
                      value={projectImage}
                      onChange={(e) => setProjectImage(e.target.value)}
                      onBlur={() => {
                        const errors = validateProjectFields();
                        setProjectErrors(errors);
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
                        projectErrors.projectImage ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {projectErrors.projectImage && (
                      <p className="text-red-500 text-xs mt-1">{projectErrors.projectImage}</p>
                    )}
                  </div>
                  {Object.keys(projectErrors).length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium mb-1">Please fix these errors before adding:</p>
                      <ul className="text-red-500 text-xs list-disc list-inside">
                        {Object.values(projectErrors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={addProject}
                    disabled={isProjectAddDisabled}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Add Project
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add Certificates
                  </h2>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-lg">📜</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Name *
                    </label>
                    <input
                      type="text"
                      value={certificateName}
                      onChange={(e) => setCertificateName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter certificate name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={issuingOrg}
                      onChange={(e) => setIssuingOrg(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="e.g., Coursera, Udemy"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Link
                      </label>
                      <input
                        type="text"
                        value={certificateLink}
                        onChange={(e) => setCertificateLink(e.target.value)}
                        onBlur={() => {
                          const errors = validateCertificateFields();
                          setCertificateErrors(errors);
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                          certificateErrors.certificateLink ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://example.com/certificate"
                      />
                      {certificateErrors.certificateLink && (
                        <p className="text-red-500 text-xs mt-1">{certificateErrors.certificateLink}</p>
                      )}
                    </div>
                  </div>
                  {Object.keys(certificateErrors).length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium mb-1">Please fix these errors before adding:</p>
                      <ul className="text-red-500 text-xs list-disc list-inside">
                        {Object.values(certificateErrors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={addCertificate}
                    disabled={isCertificateAddDisabled}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Add Certificate
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Coding Profiles
                  </h2>
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-lg">🔗</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform *
                      </label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="e.g., LeetCode, GitHub"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="Your username"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile URL *
                      </label>
                      <input
                        type="text"
                        value={profileUrl}
                        onChange={(e) => setProfileUrl(e.target.value)}
                        onBlur={() => {
                          const errors = validateCodingProfileFields();
                          setCodingProfileErrors(errors);
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 ${
                          codingProfileErrors.profileUrl ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://leetcode.com/username"
                      />
                      {codingProfileErrors.profileUrl && (
                        <p className="text-red-500 text-xs mt-1">{codingProfileErrors.profileUrl}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating/Score
                      </label>
                      <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="e.g., 1800, 5 stars"
                      />
                    </div>
                  </div>

                  {Object.keys(codingProfileErrors).length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium mb-1">Please fix these errors before adding:</p>
                      <ul className="text-red-500 text-xs list-disc list-inside">
                        {Object.values(codingProfileErrors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={addCodingProfile}
                    disabled={isCodingProfileAddDisabled}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Add Coding Profile
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Technical Skills
                  </h2>
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 text-lg">⚡</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skill Name *
                      </label>
                      <input
                        type="text"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        placeholder="e.g., JavaScript, React"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proficiency Level
                      </label>
                      <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      >
                        <option value="">Select level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={addCodingPlatform}
                    disabled={!skillName.trim()}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Contributions
                  </h2>
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 text-lg">🌟</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={contributionTitle}
                        onChange={(e) => setContributionTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Hackathon, Open Source project"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        value={contributionType}
                        onChange={(e) => setContributionType(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      >
                        <option value="">Select type</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Open Source">Open Source</option>
                        <option value="Community">Community</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={contributionOrg}
                      onChange={(e) => setContributionOrg(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Organization name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={contributionDescription}
                      onChange={(e) =>
                        setContributionDescription(e.target.value)
                      }
                      rows="2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                      placeholder="Describe your contribution..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={contributionStartDate}
                        onChange={(e) =>
                          setContributionStartDate(e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={contributionEndDate}
                        onChange={(e) => setContributionEndDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Role
                    </label>
                    <input
                      type="text"
                      value={contributionRole}
                      onChange={(e) => setContributionRole(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="e.g., Participant, Contributor, Maintainer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Link
                      </label>
                      <input
                        type="text"
                        value={contributionProjectLink}
                        onChange={(e) =>
                          setContributionProjectLink(e.target.value)
                        }
                        onBlur={() => {
                          const errors = validateContributionFields();
                          setContributionErrors(errors);
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                          contributionErrors.contributionProjectLink ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://github.com/..."
                      />
                      {contributionErrors.contributionProjectLink && (
                        <p className="text-red-500 text-xs mt-1">{contributionErrors.contributionProjectLink}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Link
                      </label>
                      <input
                        type="text"
                        value={contributionCertLink}
                        onChange={(e) =>
                          setContributionCertLink(e.target.value)
                        }
                        onBlur={() => {
                          const errors = validateContributionFields();
                          setContributionErrors(errors);
                        }}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                          contributionErrors.contributionCertLink ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://example.com/certificate"
                      />
                      {contributionErrors.contributionCertLink && (
                        <p className="text-red-500 text-xs mt-1">{contributionErrors.contributionCertLink}</p>
                      )}
                    </div>
                  </div>


                  {Object.keys(contributionErrors).length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium mb-1">Please fix these errors before adding:</p>
                      <ul className="text-red-500 text-xs list-disc list-inside">
                        {Object.values(contributionErrors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={addContribution}
                    disabled={isContributionAddDisabled}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Add Contribution
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <p className="text-red-600 text-sm font-medium mb-1">Profile Save Error:</p>
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={saveProfile}
                >
                  Save Complete Profile
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <UserCard
                user={{
                  firstName,
                  lastName,
                  photoUrl,
                  about,
                  professionalStatus,
                  institution,
                  role,
                  portfolioLink,
                }}
                showActions={false}
              />
              {projects.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Projects
                    </h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {projects.length} project
                      {projects.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <ProjectCard
                        key={project._id || index}
                        project={project}
                        onRemove={() => {
                          const projectIdToRemove = project._id || project.id;
                          console.log(
                            "🎯 EditProfile: Removing project with ID:",
                            projectIdToRemove
                          );
                          removeProject(projectIdToRemove);
                        }}
                        showRemoveButton={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {certificates.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Certificates
                    </h3>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                      {certificates.length} certificate
                      {certificates.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {certificates.map((cert, index) => (
                      <CertificateCard
                        key={cert._id || index}
                        certificate={cert}
                        onRemove={removeCertificate}
                        showRemoveButton={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {codingProfiles.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Coding Profiles
                    </h3>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                      {codingProfiles.length} profile
                      {codingProfiles.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {codingProfiles.map((profile, index) => (
                      <CodingProfileCard
                        key={profile._id || index}
                        profile={profile}
                        onRemove={removeCodingProfile}
                        showRemoveButton={true}
                      />
                    ))}
                  </div>
                </div>
              )}
              {codingPlatforms.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Technical Skills
                    </h3>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                      {codingPlatforms.length} skill
                      {codingPlatforms.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {codingPlatforms.map((skill, index) => (
                      <SkillCard
                        key={skill._id || index}
                        skill={skill}
                        onRemove={removeCodingPlatform}
                        showRemoveButton={true}
                      />
                    ))}
                  </div>
                </div>
              )}
              {contributions.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Contributions
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                      {contributions.length} contribution
                      {contributions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {contributions.map((contribution, index) => (
                      <ContributionCard
                        key={contribution._id || index}
                        contribution={contribution}
                        onRemove={removeContribution}
                        showRemoveButton={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showtoast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            {/* <span>✅</span> */}
            <span>Profile Saved Successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
