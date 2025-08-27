import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return <h1>No Connection Found</h1>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white mb-8 text-4xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, age, about, gender, photoUrl } =
          connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4" >
              <h2 className="font-bold text-xl" >{firstName + " " + lastName}</h2>
             { age && gender && <p>{age+ ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
