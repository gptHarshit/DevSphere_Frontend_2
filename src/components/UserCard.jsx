import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, onViewProfile, showActions = true }) => {
  const {
    _id,
    firstName,
    lastName,
    about,
    photoUrl,
    professionalStatus,
    institution,
    role,
    portfolioLink,
  } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        null,
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-auto">
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-200">
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 items-center justify-center text-gray-400 text-lg font-semibold hidden">
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {firstName} {lastName}
            </h2>
            {professionalStatus && (
              <p className="text-blue-600 font-medium text-sm mt-1">
                {professionalStatus === "student"
                  ? "Student 🎓"
                  : "Working Professional 💼"}
              </p>
            )}
            {institution && (
              <p className="text-gray-600 text-sm mt-1">{institution}</p>
            )}
            {role && <p className="text-gray-600 text-sm">{role}</p>}
            {portfolioLink && (
              <a
                href={portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm mt-1 flex items-center"
              >
                <span className="mr-1">🌐</span> Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-3 flex flex-col" style={{ height: "160px" }}>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex-shrink-0">
            About
          </h3>
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
            <p className="text-gray-600 leading-relaxed text-sm">
              {about || (
                <span className="text-gray-400 italic">
                  This user hasn't added an about section yet.
                </span>
              )}
            </p>
          </div>
        </div>

        {showActions ? (
          <div className="flex flex-col space-y-3 mt-3">
            <button
              onClick={() => onViewProfile && onViewProfile()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View Profile</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={() => handleSendRequest("ignored", _id)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 border border-gray-300 text-sm flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Ignore</span>
              </button>

              <button
                onClick={() => handleSendRequest("interested", _id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center space-x-2 shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <span>Connect</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3" style={{ height: "60px" }}></div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
