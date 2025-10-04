// import axios from "axios";
// import { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections } from "../utils/connectionSlice";
// import { Link } from "react-router-dom";

// const Connection = () => {
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);
//   const fetchConnection = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connection", {
//         withCredentials: true,
//       });
//       console.log(res.data.data);
//       dispatch(addConnections(res.data.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchConnection();
//   }, []);

//   if (!connections) {
//     return;
//   }

//   if (connections.length === 0) {
//     return <h1>No Connection Found</h1>;
//   }
//   return (
//     <div className="text-center my-10">
//       <h1 className="text-bold text-white mb-8 text-4xl">Connections</h1>

//       {connections.map((connection) => {
//         const { _id, firstName, lastName, age, about, gender, photoUrl } =
//           connection;
//         return (
//           <div
//             key={_id}
//             className="flex  m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto"
//           >
//             <div>
//               <img
//                 alt="photo"
//                 className="w-20 h-20 rounded-full object-cover"
//                 src={photoUrl}
//               />
//             </div>
//             <div className="text-left mx-4">
//               <h2 className="font-bold text-xl">
//                 {firstName + " " + lastName}
//               </h2>
//               {age && gender && <p>{age + ", " + gender}</p>}
//               <p>{about}</p>
//             </div>
//             <Link to={"/chat/" + _id}>
//               {" "}
//               <button className="btn btn-primary">Chat</button>{" "}
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connection;
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            No Connections Yet
          </h1>
          <p className="text-gray-600 mb-6">
            Start connecting with other developers to build your network
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 text-sm"
          >
            Discover Developers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Your Connections
          </h1>
          <p className="text-gray-600">
            {connections.length} developer{connections.length !== 1 ? "s" : ""}{" "}
            in your network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, age, gender,  photoUrl } =
              connection;
            return (
              <div
                key={_id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
          
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-100 overflow-hidden bg-gray-200">
                      <img
                        alt="profile"
                        className="w-full h-full object-cover"
                        src={photoUrl}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center text-gray-500 text-sm font-semibold hidden">
                        {firstName?.charAt(0)}
                        {lastName?.charAt(0)}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {firstName + " " + lastName}
                    </h2>

                    {(age || gender) && (
                      <p className="text-gray-600 text-sm mt-1">
                        {age && `${age} years`}
                        {age && gender && " • "}
                        {gender && `${gender}`}
                      </p>
                    )}

                    <div className="mt-4">
                      <Link
                        to={"/chat/" + _id}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded-md transition-all duration-200 text-sm"
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>Message</span>
                      </Link>
                    </div>
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

export default Connection;
