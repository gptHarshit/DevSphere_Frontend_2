import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-3">
        Welcome to DevSphere! By accessing or using our platform, you agree to 
        abide by the following terms and conditions.
      </p>
      <ul className="list-disc pl-6 mb-3">
        <li>All content is for educational purposes only.</li>
        <li>Users must not share their login credentials.</li>
        <li>Violation of terms may lead to suspension of your account.</li>
      </ul>
      <p>
        For queries, please contact us at{" "}
        <a href="mailto:support@devsphere.club" className="text-blue-600">
          support@devsphere.club
        </a>.
      </p>
    </div>
  );
};

export default TermsConditions;
