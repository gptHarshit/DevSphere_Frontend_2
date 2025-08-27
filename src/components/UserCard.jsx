import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  console.log(user);
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="card bg-base-300 w-80 h-[550px] shadow-xl mt-10">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center mt-5">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
