import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          about,
          age,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    } catch (err) {
      //   console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center mt-10 mr-8">
          <div className="card bg-base-300 w-80 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <div className="mt-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text-alt">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text-alt">photo</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text-alt">age</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text-alt">about</span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text-alt">gender</span>
                    </div>
                    <input
                      type="text"
                      value={gender}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <p className="text-red-600">{error}</p>
              <div className="card-actions justify-center mb-0 mt-1">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, gender, about, age }}
        />
      </div>
      {showtoast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
