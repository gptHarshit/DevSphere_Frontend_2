import React from "react";
const ProjectCard = ({ project, onRemove, showRemoveButton = true }) => {
  const handleRemove = () => {
    const projectIdToRemove = project._id || project.id;   
    onRemove(projectIdToRemove);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-800 text-lg">{project.title}</h4>
        {showRemoveButton && (
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      {project.image && (
        <div className="mb-3">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {project.description && (
        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
      )}
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.map((tech, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex gap-4 text-sm">
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <span>🔗</span> GitHub
          </a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 flex items-center gap-1">
            <span>🌐</span> Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;