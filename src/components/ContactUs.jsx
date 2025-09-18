import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-3">
        We'd love to hear from you! For any queries or support, please reach 
        out to us:
      </p>
      <ul className="list-disc pl-6">
        <li>Email: <a href="mailto:support@devsphere.club" className="text-blue-600">support@devsphere.club</a></li>
        <li>Phone: +91-9876543210</li>
        <li>Address: DevSphere HQ, New Delhi, India</li>
      </ul>
    </div>
  );
};

export default ContactUs;
