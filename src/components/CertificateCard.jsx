
import React from "react";
const CertificateCard = ({ certificate, onRemove, showRemoveButton = true }) => {
  const handleRemove = () => {
    const certificateIdToRemove = certificate._id || certificate.id;  
    onRemove(certificateIdToRemove);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{certificate.name}</h4>
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
        {certificate.issuingOrg && <p>By: {certificate.issuingOrg}</p>}
        {certificate.issueDate && <p>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</p>}
        {certificate.link && (
          <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
            <span>📜</span> View Certificate
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;