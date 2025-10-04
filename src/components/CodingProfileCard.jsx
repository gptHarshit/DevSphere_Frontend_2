import React from "react";
const CodingProfileCard = ({ profile, onRemove, showRemoveButton = true }) => {
  const handleRemove = () => {
    const profileIdToRemove = profile._id || profile.id;
    onRemove(profileIdToRemove);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{profile.platform}</h4>
        {showRemoveButton && (
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        {profile.username && <p>Username: {profile.username}</p>}
        {profile.rating && <p>Rating: {profile.rating}</p>}
        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800 flex items-center gap-1">
          <span>🔗</span> Visit Profile
        </a>
      </div>
    </div>
  );
};
export default CodingProfileCard;