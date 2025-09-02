import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-80 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                {" "}
                <div className="mt-4">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">firstName</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">lastName</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>{" "}
              </>
            )}
            <div className="mt-4">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>
            <div className="my-5">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text-alt">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center mb-1 mt-6">
            <button className="btn btn-primary" onClick={ isLoginForm ?  handleLogin : handleSignup}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="m-auto cursor-pointer my-2" onClick={()=>setIsLoginForm((value) => !value)}>
            {isLoginForm
              ? "New User? Signup Here"
              : "Already Registered Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
