import React from "react";

const CancellationRefunds = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cancellation & Refund Policy</h1>
      <p className="mb-3">
        At DevSphere, we strive to provide the best learning experience. 
        If you are not satisfied with your purchase, you may request a refund 
        within <strong>7 days</strong> of the transaction date.
      </p>
      <p className="mb-3">
        Refunds will be processed to your original payment method within 5–7 
        business days after approval. 
      </p>
      <p>
        For cancellations or refund requests, please contact us at{" "}
        <a href="mailto:support@devsphere.club" className="text-blue-600">
          support@devsphere.club
        </a>.
      </p>
    </div>
  );
};

export default CancellationRefunds;
