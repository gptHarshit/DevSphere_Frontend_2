import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-3">
        Your privacy is important to us. DevSphere collects only the necessary 
        information such as your name, email, and payment details.
      </p>
      <p className="mb-3">
        We do not sell or share your personal information with third parties, 
        except as required by law.
      </p>
      <p>
        For any privacy-related queries, contact us at{" "}
        <a href="mailto:support@devsphere.club" className="text-blue-600">
          support@devsphere.club
        </a>.
      </p>
    </div>
  );
};

export default Privacy;
