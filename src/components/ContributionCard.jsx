import React from "react";
const ContributionCard = ({ contribution, onRemove, showRemoveButton = true }) => {
  const handleRemove = () => {
    const contributionIdToRemove = contribution._id || contribution.id;   
    onRemove(contributionIdToRemove);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-800 text-lg">{contribution.title}</h4>
        {showRemoveButton && (
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      {contribution.type && (
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
          contribution.type === 'Hackathon' ? 'bg-purple-100 text-purple-800' :
          contribution.type === 'Open Source' ? 'bg-green-100 text-green-800' :
          contribution.type === 'Community' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {contribution.type}
        </span>
      )}
      
      {contribution.organization && (
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Organization:</span> {contribution.organization}
        </p>
      )}
      
      {contribution.description && (
        <p className="text-gray-600 text-sm mb-3">{contribution.description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
        {contribution.startDate && (
          <p>
            <span className="font-medium">Date:</span> {new Date(contribution.startDate).toLocaleDateString()}
            {contribution.endDate && ` - ${new Date(contribution.endDate).toLocaleDateString()}`}
          </p>
        )}
        {contribution.role && (
          <p>
            <span className="font-medium">Role:</span> {contribution.role}
          </p>
        )}
      </div>
      <div className="flex gap-4 text-sm">
        {contribution.projectLink && (
          <a href={contribution.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <span>🔗</span> Project Link
          </a>
        )}
        {contribution.certificateLink && (
          <a href={contribution.certificateLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 flex items-center gap-1">
            <span>📜</span> Certificate
          </a>
        )}
      </div>
    </div>
  );
};

export default ContributionCard;