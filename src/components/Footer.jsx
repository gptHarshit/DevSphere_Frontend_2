import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-gray-300 text-sm border-t border-gray-700 
                       fixed bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Left side: Links */}
        <div className="flex flex-wrap gap-4">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link to="/shipping" className="hover:text-white">Shipping Policy</Link>
          <Link to="/cancellationrefunds" className="hover:text-white">Refunds & Cancellations</Link>
          <Link to="/contact" className="hover:text-white">Contact Us</Link>
        </div>

        {/* Right side: Brand name */}
        <p className="font-semibold">DevSphere</p>
      </div>
    </footer>
  );
};

export default Footer;
