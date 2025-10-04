import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">No Requests Found</h1>
          <p className="text-gray-500 text-sm md:text-base">When you receive connection requests, they'll appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Connection Requests</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage your incoming connection requests</p>
        </div>

        {/* Requests List */}
        <div className="space-y-3 sm:space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, age, about, gender, photoUrl } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* User Info */}
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1">
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white shadow-sm overflow-hidden bg-gray-200">
                        <img
                          alt={`${firstName} ${lastName}`}
                          className="w-full h-full object-cover"
                          src={photoUrl}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center text-gray-400 text-sm sm:text-base font-semibold hidden">
                          {firstName?.charAt(0)}{lastName?.charAt(0)}
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                        {firstName} {lastName}
                      </h2>
                      {(age || gender) && (
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">
                          {age && `${age} years`}{age && gender && ' • '}{gender && `${gender}`}
                        </p>
                      )}
                      {about && (
                        <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">
                          {about}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 sm:space-x-3 flex-shrink-0 sm:ml-4">
                    <button
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      <span>✕</span>
                      <span className="hidden xs:inline">Reject</span>
                    </button>
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      <span>✓</span>
                      <span className="hidden xs:inline">Accept</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Request;