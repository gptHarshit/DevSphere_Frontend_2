import React from "react";

const SkillCard = ({ skill, onRemove, showRemoveButton = true }) => {
  const handleRemove = () => {
    const skillIdToRemove = skill._id || skill.id;
    onRemove(skillIdToRemove);
  };

  return (
    <div className="relative group">
      <span className={`bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
        skill.level ? 'pr-8' : ''
      }`}>
        {skill.name}
        {skill.level && (
          <span className="text-xs bg-red-200 text-red-700 px-1 rounded">
            {skill.level}
          </span>
        )}
      </span>
      {showRemoveButton && (
        <button 
          onClick={handleRemove}
          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SkillCard;