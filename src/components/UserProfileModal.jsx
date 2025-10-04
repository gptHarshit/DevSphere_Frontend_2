import React from "react";
import ProjectCard from "./ProjectCard";
import CertificateCard from "./CertificateCard";
import CodingProfileCard from "./CodingProfileCard";
import SkillCard from "./SkillCard";
import ContributionCard from "./ContributionCard";

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    photoUrl,
    about,
    professionalStatus,
    institution,
    role,
    portfolioLink,
    projects = [],
    certificates = [],
    codingProfiles = [],
    codingPlatforms = [],
    contributions = []
  } = user;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 items-center justify-center text-white text-2xl font-bold hidden">
                    {firstName?.charAt(0)}
                    {lastName?.charAt(0)}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {firstName} {lastName}
                  </h2>
                  {professionalStatus && (
                    <p className="text-blue-100 font-medium mt-1">
                      {professionalStatus === "student" ? "Student 🎓" : "Working Professional 💼"}
                    </p>
                  )}
                  {institution && (
                    <p className="text-blue-100 mt-1">
                      {institution}
                    </p>
                  )}
                  {role && (
                    <p className="text-blue-100 mt-1">
                      {role}
                    </p>
                  )}
                  
                  {portfolioLink && (
                    <a 
                      href={portfolioLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white mt-1 flex items-center transition-colors"
                    >
                      <span className="mr-1">🌐</span> Portfolio
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors text-2xl p-2"
              >
                ×
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {about && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{about}</p>
              </div>
            )}
            {codingPlatforms.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {codingPlatforms.map(skill => (
                    <SkillCard 
                      key={skill._id} 
                      skill={skill} 
                      onRemove={() => {}} 
                      showRemoveButton={false}
                    />
                  ))}
                </div>
              </div>
            )}
            {projects.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {projects.length} project{projects.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-4">
                  {projects.map(project => (
                    <ProjectCard 
                      key={project._id} 
                      project={project} 
                      onRemove={() => {}} 
                      showRemoveButton={false}
                    />
                  ))}
                </div>
              </div>
            )}
            {contributions.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contributions</h3>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                    {contributions.length} contribution{contributions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-4">
                  {contributions.map(contribution => (
                    <ContributionCard 
                      key={contribution._id} 
                      contribution={contribution} 
                      onRemove={() => {}} 
                      showRemoveButton={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {certificates.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Certificates</h3>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-3">
                  {certificates.map(cert => (
                    <CertificateCard 
                      key={cert._id} 
                      certificate={cert} 
                      onRemove={() => {}} 
                      showRemoveButton={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Coding Profiles */}
            {codingProfiles.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Coding Profiles</h3>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                    {codingProfiles.length} profile{codingProfiles.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-3">
                  {codingProfiles.map(profile => (
                    <CodingProfileCard 
                      key={profile._id} 
                      profile={profile} 
                      onRemove={() => {}} 
                      showRemoveButton={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!about && projects.length === 0 && certificates.length === 0 && 
             codingProfiles.length === 0 && codingPlatforms.length === 0 && contributions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>This user hasn't added any profile information yet.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileModal;